package api

import (
	"errors"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

type renewAccessTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

type renewAccessTokenResponse struct {
	AccessToken          string    `json:"access_token"`
	AccessTokenExpiresAt time.Time `json:"access_token_expires_at"`
}
type verifyTokenRequest struct {
	AccessToken string `json:"access_token" binding:"required"`
}

type verifyTokenResponse struct {
	Code string `json:"code"`
}

// VerifyToken handles the verification of JWT access tokens
func (server *Server) VerifyToken(ctx *gin.Context) {
	var req verifyTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	_, err := server.tokenMaker.VerifyToken(req.AccessToken)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, verifyTokenResponse{Code: "jwt_auth_invalid_token"})
		return
	}

	ctx.JSON(http.StatusOK, verifyTokenResponse{Code: "jwt_auth_valid_token"})

}

// renewAccessToken handles the renewal of JWT access tokens using a refresh token
func (server *Server) renewAccessToken(ctx *gin.Context) {
	var req renewAccessTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	refreshPayload, err := server.tokenMaker.VerifyToken(req.RefreshToken)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("invalid refresh token")))
		return
	}

	session, err := server.store.GetSession(ctx, refreshPayload.ID)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(errorResponse(http.StatusNotFound, errors.New("session not found")))
			return
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	if session.IsBlocked {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("blocked session")))
		return
	}

	if session.UserID != refreshPayload.UserID {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("incorrect session user")))
		return
	}

	if session.RefreshToken != req.RefreshToken {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("mismatched session token")))
		return
	}

	if time.Now().After(session.ExpiresAt) {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("expired session")))
		return
	}

	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		refreshPayload.UserID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to create access token")))
		return
	}

	rsp := renewAccessTokenResponse{
		AccessToken:          accessToken,
		AccessTokenExpiresAt: accessPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, rsp)
}
