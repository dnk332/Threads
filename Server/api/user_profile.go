package api

import (
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/briandnk/Threads/token"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

// createUserProfileRequest defines the structure for user profile creation requests
type createUserProfileRequest struct {
	UserId    int64  `json:"user_id"`
	Name      string `json:"name" binding:"required,lowercase,min=6"`
	Email     string `json:"email" binding:"required,email"`
	Bio       string `json:"bio"`
	AvatarUrl string `json:"avatar_url" binding:"required"`
}

// createUserProfileResponse defines the structure for user profile responses
type createUserProfileResponse struct {
	UserId    int64     `json:"user_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Bio       string    `json:"bio"`
	AvatarUrl string    `json:"avatar_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// createUserProfileRes maps a db.UserProfile to createUserProfileResponse
func createUserProfileRes(userProfile db.UserProfile, avatarUrl string) createUserProfileResponse {
	return createUserProfileResponse{
		UserId:    userProfile.UserID,
		Name:      userProfile.Name,
		Email:     userProfile.Email,
		Bio:       userProfile.Bio,
		CreatedAt: userProfile.CreatedAt,
		UpdatedAt: userProfile.UpdatedAt,
		AvatarUrl: avatarUrl,
	}
}

// createUserProfile handles the user profile creation process
func (s *Server) createUserProfile(ctx *gin.Context) {
	var req createUserProfileRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request body: %v", err)
		return
	}

	// Check is user id is valid or not
	user, valid := s.validUser(ctx, req.UserId)
	if !valid {
		return
	}

	// Check is user is authenticated or not
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if user.ID != authPayload.UserID {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("need authenticated user")))
		log.Printf("[ERROR] User is not authenticated")
		return
	}

	// Create user profile
	arg := db.CreateUserProfileParams{
		UserID: user.ID,
		Name:   req.Name,
		Email:  req.Email,
		Bio:    req.Bio,
	}

	// Create user profile
	userProfile, err := s.store.CreateUserProfile(ctx, arg)
	if err != nil {
		log.Println("db.ErrorCode(err)", db.ErrorCode(err), db.ErrorField(err))
		if db.ErrorCode(err) == db.UniqueViolation {
			if db.ErrorField(err) == "user_profiles_email_key" {
				ctx.JSON(errorResponse(http.StatusConflict, errors.New("email already in use")))
				log.Printf("[ERROR] Email already in use")
				return
			}
			if db.ErrorField(err) == "user_profiles_user_id_key" {
				ctx.JSON(errorResponse(http.StatusConflict, errors.New("user already has a profile")))
				log.Printf("[ERROR] User already has a profile")
				return
			}
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		log.Printf("[ERROR] Failed to create user profile: %v", err)
		return
	}

	avatar, err := s.setUserAvatar(ctx, req.AvatarUrl, userProfile)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		log.Printf("[ERROR] Failed to set user avatar: %v", err)
		return
	}

	rsp := createUserProfileRes(userProfile, avatar.Link)

	ctx.JSON(http.StatusOK, rsp)
}

// getUserProfileRequest defines the structure for user profile retrieval requests
type getUserProfileRequest struct {
	UserID int64 `uri:"user_id" binding:"required,min=1"`
}

// getUserProfileResponse defines the structure for user profile responses
type getUserProfileResponse struct {
	UserId    int64     `json:"user_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Bio       string    `json:"bio"`
	AvatarUrl string    `json:"avatar_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// getUserProfileRes maps a db.UserProfile to getUserProfileResponse
func getUserProfileRes(userProfile db.UserProfile, avatarUrl string) getUserProfileResponse {
	return getUserProfileResponse{
		UserId:    userProfile.UserID,
		Name:      userProfile.Name,
		Email:     userProfile.Email,
		Bio:       userProfile.Bio,
		AvatarUrl: avatarUrl,
		CreatedAt: userProfile.CreatedAt,
		UpdatedAt: userProfile.UpdatedAt,
	}
}

// getUserProfile handles the user profile retrieval process
func (s *Server) getUserProfile(ctx *gin.Context) {
	var req getUserProfileRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		return
	}

	// Check is user id is valid or not
	user, valid := s.validUser(ctx, req.UserID)
	if !valid {
		return
	}

	// Check is user is authenticated or not
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if user.ID != authPayload.UserID {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("need authenticated user")))
		log.Printf("[ERROR] User is not authenticated")
		return
	}

	// Get user profile
	userProfile, err := s.store.GetUserProfileById(ctx, req.UserID)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusNotFound, errors.New("user profile not found")))
		log.Printf("[ERROR] Failed to get user profile: %v", err)
		return
	}

	avatar, err := s.getImage(ctx, "user_profile", userProfile.ID)

	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		log.Printf("[ERROR] Failed to get user avatar: %v", err)
		return
	}
	rsp := getUserProfileRes(userProfile, avatar)

	ctx.JSON(http.StatusOK, rsp)
}

// getAllUserProfilesRequest defines the structure for get all user profile retrieval requests
type getAllUserProfilesRequest struct {
	PageID   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=10"`
}

func (s *Server) getAllUserProfiles(ctx *gin.Context) {
	var req getAllUserProfilesRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request query: %v", err)
		return
	}

	// Check is user is authenticated or not
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	// Get all user profiles
	userProfiles, err := s.store.GetAllUserProfiles(ctx, db.GetAllUserProfilesParams{
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
		UserID: authPayload.UserID,
	})
	if err != nil {
		ctx.JSON(errorResponse(http.StatusNotFound, errors.New("user profiles not found")))
		log.Printf("[ERROR] Failed to get user profiles: %v", err)
		return
	}
	ctx.JSON(http.StatusOK, userProfiles)
}
