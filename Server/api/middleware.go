package api

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/briandnk/Threads/token"

	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey  = "authorization"
	authorizationTypeBearer = "bearer"
	authorizationPayloadKey = "authorization_payload"
)

// AuthMiddleware creates a gin middleware for authorization
func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader(authorizationHeaderKey)

		// Check if authorization header is provided
		if len(authorizationHeader) == 0 {
			ctx.AbortWithStatusJSON(errorResponse(http.StatusUnauthorized, errors.New("authorization header is not provided")))
			return
		}

		// Check if authorization header is valid
		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			ctx.AbortWithStatusJSON(errorResponse(http.StatusUnauthorized, errors.New("invalid authorization header format")))
			return
		}

		// Check if authorization type is valid
		authorizationType := strings.ToLower(fields[0])
		if authorizationType != authorizationTypeBearer {
			ctx.AbortWithStatusJSON(errorResponse(http.StatusUnauthorized, fmt.Errorf("unsupported authorization type %s", authorizationType)))
			return
		}

		// Check if access token is valid
		accessToken := fields[1]
		if len(accessToken) < 1 {
			ctx.AbortWithStatusJSON(errorResponse(http.StatusUnauthorized, errors.New("invalid or expired access token")))
			return
		}

		// Verify access token
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(errorResponse(http.StatusUnauthorized, errors.New("invalid or expired access token")))
			return
		}

		// Set the payload in the context
		ctx.Set(authorizationPayloadKey, payload)
		ctx.Next()
	}
}
