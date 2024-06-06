package api

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/utils"
	"github.com/gin-gonic/gin"
)

type createUserRequest struct {
	Username string `json:"username" binding:"required,min=6"`
	Password string `json:"password" binding:"required,min=6"`
}

type createUserResponse struct {
	UserID            int64     `json:"user_id"`
	Username          string    `json:"username"`
	Password          string    `json:"password"`
	IsFrozen          bool      `json:"is_frozen"`
	PasswordChangedAt time.Time `json:"password_changed_at"`
	CreatedAt         time.Time `json:"created_at"`
}

func createUserRes(user db.User, password string) createUserResponse {
	return createUserResponse{
		UserID:            user.ID,
		Username:          user.Username,
		Password:          password,
		IsFrozen:          user.IsFrozen,
		PasswordChangedAt: user.PasswordChangedAt,
		CreatedAt:         user.CreatedAt,
	}
}

func (server *Server) createUser(ctx *gin.Context) {
	var req createUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	arg := db.CreateUserParams{
		Username:       req.Username,
		HashedPassword: hashedPassword,
	}

	user, err := server.store.CreateUser(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(http.StatusForbidden, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := createUserRes(user, req.Password)
	ctx.JSON(http.StatusOK, rsp)
}

type getAccountRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

func (server *Server) getUser(ctx *gin.Context) {
	var req getAccountRequest
	if err := ctx.ShouldBindUri(&req); err != nil {
		fmt.Print("ERROR:", err)
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Check is user id is valid or not
	user, valid := server.validUser(ctx, req.ID)
	if !valid {
		return
	}

	//authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	//if user.ID != authPayload.UserId {
	//	err := errors.New("user doesn't belong to the authenticated user")
	//	ctx.JSON(http.StatusUnauthorized, errorResponse(err))
	//	return
	//}

	ctx.JSON(http.StatusOK, user)
}
func (server *Server) validUser(ctx *gin.Context, userId int64) (db.User, bool) {
	user, err := server.store.GetUserById(ctx, userId)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return user, false
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return user, false
	}

	if user.IsFrozen {
		err := errors.New("user is frozen")
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return user, false
	}

	return user, true
}
