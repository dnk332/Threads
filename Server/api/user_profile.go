package api

// import (
// 	"net/http"
// 	"time"

// 	db "github.com/briandnk/Threads/db/sqlc"
// 	"github.com/briandnk/Threads/utils"
// 	"github.com/gin-gonic/gin"
// )

// type createUserProfileRequest struct {
// 	UserId int64  `json:"user_id"`
// 	Name   string `json:"name" binding:"required,alphanum"`
// 	Email  string `json:"email" binding:"required,email"`
// 	Bio    string `json:"bio" binding:"required"`
// }

// type createUserProfileResponse struct {
// 	UserId    int64     `json:"user_id"`
// 	Name      string    `json:"name"`
// 	Email     string    `json:"email"`
// 	Bio       string    `json:"bio"`
// 	CreatedAt time.Time `json:"created_at"`
// }

// func createUserProfileRes(userProfile db.UserProfile) createUserProfileResponse {
// 	return createUserProfileResponse{
// 		UserId:    userProfile.UserID,
// 		Name:      userProfile.Name,
// 		Email:     userProfile.Email,
// 		Bio:       userProfile.Bio,
// 		CreatedAt: userProfile.CreatedAt,
// 	}
// }

// func (server *Server) createUserProfile(ctx *gin.Context) {
// 	var req createUserProfileRequest
// 	if err := ctx.ShouldBindJSON(&req); err != nil {
// 		ctx.JSON(http.StatusBadRequest, errorResponse(err))
// 		return
// 	}

// 	hashedPassword, err := utils.HashPassword(req.Password)
// 	if err != nil {
// 		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
// 		return
// 	}

// 	arg := db.CreateUserParams{
// 		Username:       req.Username,
// 		HashedPassword: hashedPassword,
// 	}

// 	user, err := server.store.CreateUser(ctx, arg)
// 	if err != nil {
// 		if db.ErrorCode(err) == db.UniqueViolation {
// 			ctx.JSON(http.StatusForbidden, errorResponse(err))
// 			return
// 		}
// 		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
// 		return
// 	}

// 	rsp := createUserProfileRes(user)
// 	ctx.JSON(http.StatusOK, rsp)
// }
