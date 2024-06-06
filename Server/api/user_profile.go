package api

import (
	"errors"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

type createUserProfileRequest struct {
	UserId int64  `json:"user_id"`
	Name   string `json:"name" binding:"required,alpha,min=6"`
	Email  string `json:"email" binding:"required,email"`
	Bio    string `json:"bio"`
}

type createUserProfileResponse struct {
	UserId    int64     `json:"user_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Bio       string    `json:"bio"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

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

func (server *Server) createUserProfile(ctx *gin.Context) {
	var req createUserProfileRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Check is user id is valid or not
	//user, valid := server.validUser(ctx, req.UserId)
	//if !valid {
	//	return
	//}

	user, err := server.store.GetUserById(ctx, req.UserId)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	arg := db.CreateUserProfileParams{
		UserID: user.ID,
		Name:   req.Name,
		Email:  req.Email,
		Bio:    req.Bio,
	}

	userProfile, err := server.store.CreateUserProfile(ctx, arg)

	if err != nil {
		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(http.StatusForbidden, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := createUserProfileRes(userProfile)
	ctx.JSON(http.StatusOK, rsp)
}
