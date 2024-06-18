package api

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type createUserRequest struct {
	Username string `json:"username" binding:"required,min=6"`
	Password string `json:"password" binding:"required,min=6"`
}

type userResponse struct {
	UserID            int64     `json:"user_id"`
	Username          string    `json:"username"`
	IsFrozen          bool      `json:"is_frozen"`
	PasswordChangedAt time.Time `json:"password_changed_at"`
	CreatedAt         time.Time `json:"created_at"`
}

func createUserResponse(user db.User, password string) userResponse {
	return userResponse{
		UserID:            user.ID,
		Username:          user.Username,
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

	rsp := createUserResponse(user, req.Password)
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

type loginUserRequest struct {
	Username string `json:"username" binding:"required,alphanum"`
	Password string `json:"password" binding:"required,min=6"`
}

type loginUserResponse struct {
	SessionID             uuid.UUID    `json:"session_id"`
	AccessToken           string       `json:"access_token"`
	AccessTokenExpiresAt  time.Time    `json:"access_token_expires_at"`
	RefreshToken          string       `json:"refresh_token"`
	RefreshTokenExpiresAt time.Time    `json:"refresh_token_expires_at"`
	User                  userResponse `json:"user"`
}

func (server *Server) loginUser(ctx *gin.Context) {
	var req loginUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	user, err := server.store.GetUserByName(ctx, req.Username)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	err = utils.CheckPassword(req.Password, user.HashedPassword)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, errorResponse(err))
		return
	}

	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		user.ID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	refreshToken, refreshPayload, err := server.tokenMaker.CreateToken(
		user.ID,
		server.config.RefreshTokenDuration,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	session, err := server.store.CreateSession(ctx, db.CreateSessionParams{
		ID:           refreshPayload.ID,
		UserID:       user.ID,
		RefreshToken: refreshToken,
		UserAgent:    ctx.Request.UserAgent(),
		ClientIp:     ctx.ClientIP(),
		IsBlocked:    false,
		ExpiresAt:    refreshPayload.ExpiredAt,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	rsp := loginUserResponse{
		SessionID:             session.ID,
		AccessToken:           accessToken,
		AccessTokenExpiresAt:  accessPayload.ExpiredAt,
		RefreshToken:          refreshToken,
		RefreshTokenExpiresAt: refreshPayload.ExpiredAt,
		User:                  createUserResponse(user, req.Password),
	}
	ctx.JSON(http.StatusOK, rsp)
}
