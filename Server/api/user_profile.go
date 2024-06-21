package api

import (
	"errors"
	"net/http"
	"time"

	"github.com/briandnk/Threads/token"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

// createUserProfileRequest defines the structure for user profile creation requests
type createUserProfileRequest struct {
	UserId int64  `json:"user_id"`
	Name   string `json:"name" binding:"required,alpha,min=6"`
	Email  string `json:"email" binding:"required,email"`
	Bio    string `json:"bio"`
}

// createUserProfileResponse defines the structure for user profile responses
type createUserProfileResponse struct {
	UserId    int64     `json:"user_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Bio       string    `json:"bio"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// createUserProfileRes maps a db.UserProfile to createUserProfileResponse
func createUserProfileRes(userProfile db.UserProfile) createUserProfileResponse {
	return createUserProfileResponse{
		UserId:    userProfile.UserID,
		Name:      userProfile.Name,
		Email:     userProfile.Email,
		Bio:       userProfile.Bio,
		CreatedAt: userProfile.CreatedAt,
		UpdatedAt: userProfile.UpdatedAt,
	}
}

// createUserProfile handles the user profile creation process
func (server *Server) createUserProfile(ctx *gin.Context) {
	var req createUserProfileRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	//Check is user id is valid or not
	user, valid := server.validUser(ctx, req.UserId)
	if !valid {
		return
	}

	// Check is user is authenticated or not
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if user.ID != authPayload.UserID {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("need authenticated user")))
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
	userProfile, err := server.store.CreateUserProfile(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(errorResponse(http.StatusConflict, errors.New("email already in use")))
			return
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	rsp := createUserProfileRes(userProfile)

	ctx.JSON(http.StatusOK, rsp)
}
