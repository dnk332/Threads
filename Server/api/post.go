package api

import (
	"log"
	"net/http"
	"time"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/token"
	"github.com/gin-gonic/gin"
)

// createUserRequest defines the structure for user creation requests
type createPostRequest struct {
	TextContent  string  `json:"text_content" binding:"required"`
	ImageContent []Image `json:"images_content"`
}

// userResponse defines the structure for user responses
type postResponse struct {
	ID           int64      `json:"id"`
	AuthorID     int64      `json:"author_id"`
	TextContent  string     `json:"text_content"`
	ImageContent []db.Media `json:"image_content"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

// createUserResponse maps a db.User to userResponse
func createPostResponse(post db.Post, images []db.Media) postResponse {
	return postResponse{
		ID:           post.ID,
		AuthorID:     post.AuthorID,
		TextContent:  post.TextContent,
		ImageContent: images,
		CreatedAt:    post.CreatedAt,
		UpdatedAt:    post.UpdatedAt,
	}
}

// createUser handles the user creation process
func (s *Server) createPost(ctx *gin.Context) {
	var req createPostRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Printf("[ERROR] Failed to parse request body: %v", err)
		ctx.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	// Check is user is authenticated or not
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	arg := db.CreatePostParams{
		AuthorID:    authPayload.UserID,
		TextContent: req.TextContent,
	}

	// Create post
	post, err := s.store.CreatePost(ctx, arg)
	if err != nil {
		log.Printf("[ERROR] Failed to create post: %v", err)
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	// Create post images
	var postImages []db.Media
	for _, image := range req.ImageContent {
		postImage, err := s.store.AddPostImage(ctx, db.AddPostImageParams{
			Link:              image.Uri,
			OrderColumn:       int32(image.Index),
			ReferenceObjectID: post.ID,
		})
		if err != nil {
			log.Printf("[ERROR] Failed to create post image: %v", err)
			ctx.JSON(errorResponse(http.StatusInternalServerError, err))
			return
		}
		postImages = append(postImages, postImage)
	}

	rsp := createPostResponse(post, postImages)
	ctx.JSON(http.StatusOK, rsp)
}

type getListAllPostRequest struct {
	PageID   int32 `form:"page_id" binding:"required,min=1"`
	PageSize int32 `form:"page_size" binding:"required,min=5,max=10"`
}

type getListAllPostResponse struct {
	Id          int64        `json:"id"`
	Post        postResponse `json:"post"`
	Author      Author       `json:"author"`
	Interaction Interaction  `json:"interaction"`
}

func (s *Server) getListAllPost(ctx *gin.Context) {
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

	posts, err := s.store.GetListAllPost(ctx, arg)
	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		return
	}

	response := make([]getListAllPostResponse, 0, len(posts))

	for _, post := range posts {
		author := s.getAuthorInfo(ctx, post.AuthorID)
		interaction := s.getInteractionOfPost(ctx, post.ID)

		images, err := s.store.GetImagesForPost(ctx, post.ID)
		if err != nil {
			response = append(response, getListAllPostResponse{
				Id:          post.ID,
				Post:        createPostResponse(post, []db.Media{}),
				Author:      author,
				Interaction: interaction,
			})
			return
		}

		response = append(response, getListAllPostResponse{
			Id:          post.ID,
			Post:        createPostResponse(post, images),
			Author:      author,
			Interaction: interaction,
		})
	}

	ctx.JSON(http.StatusOK, response)
}
