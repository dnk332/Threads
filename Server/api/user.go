package api

import (
	"errors"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// createUserRequest defines the structure for user creation requests
type createUserRequest struct {
	Username string `json:"username" binding:"required,min=6"`
	Password string `json:"password" binding:"required,min=6"`
}

// userResponse defines the structure for user responses
type userResponse struct {
	UserID            int64     `json:"user_id"`
	Username          string    `json:"username"`
	IsFrozen          bool      `json:"is_frozen"`
	PasswordChangedAt time.Time `json:"password_changed_at"`
	CreatedAt         time.Time `json:"created_at"`
}

// createUserResponse maps a db.User to userResponse
func createUserResponse(user db.User) userResponse {
	return userResponse{
		UserID:            user.ID,
		Username:          user.Username,
		IsFrozen:          user.IsFrozen,
		PasswordChangedAt: user.PasswordChangedAt,
		CreatedAt:         user.CreatedAt,
	}
}

// createUser handles the user creation process
func (server *Server) createUser(ctx *gin.Context) {
	var req createUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to hash password")))
		return
	}

	arg := db.CreateUserParams{
		Username:       req.Username,
		HashedPassword: hashedPassword,
	}

	// Create user
	user, err := server.store.CreateUser(ctx, arg)
	if err != nil {
		if db.ErrorCode(err) == db.UniqueViolation {
			ctx.JSON(errorResponse(http.StatusConflict, errors.New("username already exists")))
			return
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	rsp := createUserResponse(user)
	ctx.JSON(http.StatusOK, rsp)
}

// getAccountRequest defines the structure for account requests
type getAccountRequest struct {
	ID int64 `uri:"id" binding:"required,min=1"`
}

// getUser retrieves a user by ID and checks permissions
func (server *Server) getUser(ctx *gin.Context) {
	var req getAccountRequest

	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Check is user id is valid or not
	user, valid := server.validUser(ctx, req.ID)
	if !valid {
		return
	}

	// // Check is user is authenticated or not
	// authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	// if user.ID != authPayload.UserID {
	// 	ctx.JSON(errorResponse(http.StatusForbidden, errors.New("user doesn't belong to the authenticated user")))
	// 	return
	// }

	ctx.JSON(http.StatusOK, user)
}

// validUser checks if a user ID is valid and returns the user if so
func (server *Server) validUser(ctx *gin.Context, userId int64) (db.User, bool) {
	// Check is user id is valid or not
	if userId < 1 {
		ctx.JSON(errorResponse(http.StatusBadRequest, errors.New("invalid user")))
		return db.User{}, false
	}

	// Check if user exists or not
	user, err := server.store.GetUserById(ctx, userId)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(errorResponse(http.StatusBadRequest, errors.New("invalid user")))
			return user, false
		}
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return user, false
	}

	// Check if user is frozen or not
	if user.IsFrozen {
		ctx.JSON(errorResponse(http.StatusBadRequest, errors.New("user is frozen")))
		return user, false
	}

	return user, true
}

// loginUserRequest defines the structure for login requests
type loginUserRequest struct {
	Username string `json:"username" binding:"required,alphanum"`
	Password string `json:"password" binding:"required,min=6"`
}

// loginUserResponse defines the structure for login responses
type loginUserResponse struct {
	SessionID             uuid.UUID    `json:"session_id"`
	AccessToken           string       `json:"access_token"`
	AccessTokenExpiresAt  time.Time    `json:"access_token_expires_at"`
	RefreshToken          string       `json:"refresh_token"`
	RefreshTokenExpiresAt time.Time    `json:"refresh_token_expires_at"`
	User                  userResponse `json:"user"`
}

// loginUser handles the user login process
func (server *Server) loginUser(ctx *gin.Context) {
	var req loginUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Check if user exists or not
	user, err := server.store.GetUserByName(ctx, req.Username)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("username or password is incorrect")))
			return
		}
		ctx.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	// Check password
	err = utils.CheckPassword(req.Password, user.HashedPassword)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("username or password is incorrect")))
		return
	}

	// Create access and refresh tokens
	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		user.ID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		err := errors.New("failed to create access token")
		ctx.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	// Create refresh token
	refreshToken, refreshPayload, err := server.tokenMaker.CreateToken(
		user.ID,
		server.config.RefreshTokenDuration,
	)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to create refresh token")))
		return
	}

	// Create session
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
		ctx.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to create session")))
		return
	}

	// Create response
	rsp := loginUserResponse{
		SessionID:             session.ID,
		AccessToken:           accessToken,
		AccessTokenExpiresAt:  accessPayload.ExpiredAt,
		RefreshToken:          refreshToken,
		RefreshTokenExpiresAt: refreshPayload.ExpiredAt,
		User:                  createUserResponse(user),
	}
	ctx.JSON(http.StatusOK, rsp)
}
