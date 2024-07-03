package api

import (
	"errors"
	"log"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/token"
	"github.com/gin-gonic/gin"
)

// createUserRequest defines the structure for user creation requests
type createPostRequest struct {
	AuthorID    int64  `json:"author_id" binding:"required,min=1"`
	TextContent string `json:"text_content" binding:"required"`
}

// userResponse defines the structure for user responses
type postResponse struct {
	AuthorID    int64     `json:"author_id"`
	TextContent string    `json:"text_content"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// createUserResponse maps a db.User to userResponse
func createPostResponse(post db.Post) postResponse {
	return postResponse{
		AuthorID:    post.AuthorID,
		TextContent: post.TextContent,
		CreatedAt:   post.CreatedAt,
		UpdatedAt:   post.UpdatedAt,
	}
}

// createUser handles the user creation process
func (server *Server) createPost(ctx *gin.Context) {
	var req createPostRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Printf("[ERROR] Failed to parse request body: %v", err)
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Check is user id is valid or not
	user, valid := server.validUser(ctx, req.AuthorID)
	if !valid {
		return
	}

	// Check is user is authenticated or not
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if user.ID != authPayload.UserID {
		ctx.JSON(errorResponse(http.StatusUnauthorized, errors.New("need authenticated user")))
		log.Printf("[ERROR] User is not authenticated")
		return
	}

	arg := db.CreatePostParams{
		AuthorID:    req.AuthorID,
		TextContent: req.TextContent,
	}

	// Create post
	post, err := server.store.CreatePost(ctx, arg)
	if err != nil {
		log.Printf("[ERROR] Failed to create post: %v", err)
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	rsp := createPostResponse(post)
	ctx.JSON(http.StatusOK, rsp)
}

type getListAllPostRequest struct {
	PageID   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=10"`
}

func (server *Server) getListAllPost(ctx *gin.Context) {
	var req getListAllPostRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		return
	}

	arg := db.GetListAllPostParams{
		Limit:  req.PageSize,
		Offset: (req.PageID - 1) * req.PageSize,
	}

	posts, err := server.store.GetListAllPost(ctx, arg)
	if err != nil {
		log.Printf("[ERROR] Failed to get list of all posts: %v", err)
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	ctx.JSON(http.StatusOK, posts)
}
