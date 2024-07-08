package api

import (
	"log"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/token"
	"github.com/gin-gonic/gin"
)

// likePostRequest defines the structure for like requests
type likePostRequest struct {
	PostId int64 `json:"post_id" binding:"required,min=1"`
}

// likePostResponse defines the structure for like responses
type likePostResponse struct {
	ID        int64     `json:"id"`
	PostID    int64     `json:"post_id"`
	AuthorID  int64     `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}

// likePost handles the post like process
func (server *Server) likePost(ctx *gin.Context) {
	var req likePostRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Printf("[ERROR] Failed to parse request body: %v", err)
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	arg := db.LikePostParams{
		PostID:   req.PostId,
		AuthorID: authPayload.UserID,
	}

	// Create like
	like, err := server.store.LikePost(ctx, arg)
	if err != nil {
		log.Printf("[ERROR] Failed to like like: %v", err)
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	rsp := likePostResponse{
		ID:        like.ID,
		PostID:    like.PostID,
		AuthorID:  like.AuthorID,
		CreatedAt: like.CreatedAt,
	}
	ctx.JSON(http.StatusOK, rsp)
}

// unlikePostRequest defines the structure for unlike requests
type unlikePostRequest struct {
	PostId int64 `json:"post_id" binding:"required,min=1"`
}

// unlikePostResponse defines the structure for unlike responses
type unlikePostResponse struct {
	Message string `json:"message"`
}

// unlikePost handles the post unlike process
func (server *Server) unlikePost(ctx *gin.Context) {
	var req unlikePostRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	arg := db.UnlikePostParams{
		PostID:   req.PostId,
		AuthorID: authPayload.UserID,
	}

	err := server.store.UnlikePost(ctx, arg)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	response := unlikePostResponse{
		Message: "successfully",
	}

	ctx.JSON(http.StatusOK, response)
}

// getAllLikeOfUserRequest defines the structure for get all like of user requests
type getAllLikeOfUserRequest struct {
	UserID   int64 `json:"user_id" binding:"required,min=1"`
	PageID   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=10"`
}

// getAllLikeOfUserResponse defines the structure for get all like of user responses
type getListAllLikeResponse struct {
	ID       int64 `json:"id"`
	PostID   int64 `json:"post_id"`
	AuthorID int64 `json:"author_id"`
}

// getAllLikeOfUser handles the get all like of user process
func (server *Server) getAllLikeOfUser(ctx *gin.Context) {
	var req getAllLikeOfUserRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		return
	}

	arg := db.GetAllLikesOfUserParams{
		AuthorID: req.UserID,
		Limit:    req.PageSize,
		Offset:   (req.PageID - 1) * req.PageSize,
	}

	likes, err := server.store.GetAllLikesOfUser(ctx, arg)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	response := make([]getListAllLikeResponse, 0, len(likes))

	for _, like := range likes {
		response = append(response, getListAllLikeResponse{
			ID:       like.ID,
			PostID:   like.PostID,
			AuthorID: like.AuthorID,
		})
	}
	ctx.JSON(http.StatusOK, response)
}

// getAllLikeOfPostRequest defines the structure for get all like of post requests
type getAllLikeOfPostRequest struct {
	PostID   int64 `json:"post_id" binding:"required,min=1"`
	PageID   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=10"`
}

// getAllLikeOfPostResponse defines the structure for get all like of post responses
func (server *Server) getAllLikeOfPost(ctx *gin.Context) {
	var req getAllLikeOfPostRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		return
	}

	arg := db.GetAllLikesOfPostParams{
		PostID: req.PostID,
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	likes, err := server.store.GetAllLikesOfPost(ctx, arg)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	response := make([]getListAllLikeResponse, 0, len(likes))

	for _, like := range likes {
		response = append(response, getListAllLikeResponse{
			ID:       like.ID,
			PostID:   like.PostID,
			AuthorID: like.AuthorID,
		})
	}
	ctx.JSON(http.StatusOK, response)
}
