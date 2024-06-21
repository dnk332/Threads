package api

import (
	"errors"
	"fmt"
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

func (server *Server) VerifyToken(ctx *gin.Context) {
	var req verifyTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	_, err := server.tokenMaker.VerifyToken(req.AccessToken)

	if err != nil {
		rsp := verifyTokenResponse{
			Code: "jwt_auth_invalid_token",
		}
		ctx.JSON(http.StatusUnauthorized, rsp)
		return
	}

	rsp := verifyTokenResponse{
		Code: "jwt_auth_valid_token",
	}
	ctx.JSON(http.StatusOK, rsp)

}

func (server *Server) renewAccessToken(ctx *gin.Context) {
	var req renewAccessTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	refreshPayload, err := server.tokenMaker.VerifyToken(req.RefreshToken)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusUnauthorized, err))
		return
	}

	session, err := server.store.GetSession(ctx, refreshPayload.ID)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(errorResponse(http.StatusNotFound, err))
			return
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	if session.IsBlocked {
		err := fmt.Errorf("blocked session")
		ctx.JSON(errorResponse(http.StatusUnauthorized, err))
		return
	}

	if session.UserID != refreshPayload.UserID {
		err := fmt.Errorf("incorrect session user")
		ctx.JSON(errorResponse(http.StatusUnauthorized, err))
		return
	}

	if session.RefreshToken != req.RefreshToken {
		err := fmt.Errorf("mismatched session token")
		ctx.JSON(errorResponse(http.StatusUnauthorized, err))
		return
	}

	if time.Now().After(session.ExpiresAt) {
		err := fmt.Errorf("expired session")
		ctx.JSON(errorResponse(http.StatusUnauthorized, err))
		return
	}

	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		refreshPayload.UserID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	rsp := renewAccessTokenResponse{
		AccessToken:          accessToken,
		AccessTokenExpiresAt: accessPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, rsp)
}
