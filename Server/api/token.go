package api

import (
	"errors"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

// refreshAccessTokenRequest defines the structure for renewing JWT access tokens
type refreshAccessTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

// refreshAccessTokenResponse defines the structure for renewing JWT access tokens
type refreshAccessTokenResponse struct {
	AccessToken          string    `json:"access_token"`
	AccessTokenExpiresAt time.Time `json:"access_token_expires_at"`
}

// VerifyTokenRequest defines the structure for verifying JWT access tokens
type verifyTokenRequest struct {
	AccessToken string `json:"access_token" binding:"required"`
}

// VerifyTokenResponse defines the structure for verifying JWT access tokens
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

	// Verify access token
	_, err := server.tokenMaker.VerifyToken(req.AccessToken)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, verifyTokenResponse{Code: "jwt_auth_invalid_token"})
		return
	}

	ctx.JSON(http.StatusOK, verifyTokenResponse{Code: "jwt_auth_valid_token"})

}

// refreshAccessToken handles the renewal of JWT access tokens using a refresh token
func (server *Server) refreshAccessToken(ctx *gin.Context) {
	var req refreshAccessTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Verify refresh token
	refreshPayload, err := server.tokenMaker.VerifyToken(req.RefreshToken)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("invalid refresh token")))
		return
	}

	// Check if session exists
	session, err := server.store.GetSession(ctx, refreshPayload.ID)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(errorResponse(http.StatusNotFound, errors.New("session not found")))
			return
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	// Check if session is blocked or not
	if session.IsBlocked {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("blocked session")))
		return
	}

	// Check if session is expired or not
	if session.UserID != refreshPayload.UserID {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("incorrect session user")))
		return
	}

	// Check if session is not expired or not
	if session.RefreshToken != req.RefreshToken {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("mismatched session token")))
		return
	}

	// Check if session is not expired or not
	if time.Now().After(session.ExpiresAt) {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("expired session")))
		return
	}

	// Create new access token
	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		refreshPayload.UserID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to create access token")))
		return
	}

	rsp := refreshAccessTokenResponse{
		AccessToken:          accessToken,
		AccessTokenExpiresAt: accessPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, rsp)
}
