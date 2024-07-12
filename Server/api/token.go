package api

import (
	"errors"
	"log"
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
func (s *Server) VerifyToken(ctx *gin.Context) {
	var req verifyTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Printf("[ERROR] Failed to parse request body: %v", err)
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Verify access token
	_, err := s.tokenMaker.VerifyToken(req.AccessToken)
	if err != nil {
		log.Printf("[ERROR] Invalid token: %v", err)
		ctx.JSON(http.StatusUnauthorized, verifyTokenResponse{Code: "jwt_auth_invalid_token"})
		return
	}
	ctx.JSON(http.StatusOK, verifyTokenResponse{Code: "jwt_auth_valid_token"})
}

// refreshAccessToken handles the renewal of JWT access tokens using a refresh token
func (s *Server) refreshAccessToken(ctx *gin.Context) {
	var req refreshAccessTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Printf("[ERROR] Failed to parse request body: %v", err)
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Verify refresh token
	refreshPayload, err := s.tokenMaker.VerifyToken(req.RefreshToken)
	if err != nil {
		log.Printf("[ERROR] Invalid refresh token: %v", err)
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("invalid refresh token")))
		return
	}

	// Check if session exists
	session, err := s.store.GetSession(ctx, refreshPayload.ID)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			log.Printf("[ERROR] Session not found: %v", err)
			ctx.JSON(errorResponse(http.StatusNotFound, errors.New("session not found")))
			return
		}
		log.Printf("[ERROR] Failed to get session: %v", err)
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	// Check if session is blocked or not
	if session.IsBlocked {
		log.Printf("[ERROR] Blocked session: %v", session.ID)
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("blocked session")))
		return
	}

	// Check if session is expired or not
	if session.UserID != refreshPayload.UserID {
		log.Printf("[ERROR] Incorrect session user: %v", session.UserID)
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("incorrect session user")))
		return
	}

	// Check if session is not expired or not
	if session.RefreshToken != req.RefreshToken {
		log.Printf("[ERROR] Mismatched session token: %v", session.RefreshToken)
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("mismatched session token")))
		return
	}

	// Check if session is not expired or not
	if time.Now().After(session.ExpiresAt) {
		log.Printf("[ERROR] Expired session: %v", session.ExpiresAt)
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("expired session")))
		return
	}

	// Create new access token
	accessToken, accessPayload, err := s.tokenMaker.CreateToken(
		refreshPayload.UserID,
		s.config.AccessTokenDuration,
	)
	if err != nil {
		log.Printf("[ERROR] Failed to create access token: %v", err)
		ctx.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to create access token")))
		return
	}

	rsp := refreshAccessTokenResponse{
		AccessToken:          accessToken,
		AccessTokenExpiresAt: accessPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, rsp)
}
