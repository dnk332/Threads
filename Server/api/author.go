package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type Author struct {
	ID           int64  `json:"id"`
	UserName     string `json:"user_name"`
	ProfileName  string `json:"name"`
	AuthorAvatar string `json:"author_avatar"`
	Email        string `json:"email"`
}

func (s *Server) getAuthorInfo(ctx *gin.Context, authorId int64) Author {
	user, valid := s.validUser(ctx, authorId)
	if !valid {
		log.Println("[ERROR] Author not found: ", authorId)
		return Author{}
	}
	userProfile, err := s.store.GetUserProfileById(ctx, authorId)
	if err != nil {
		log.Println("[ERROR] Author not found: ", authorId)
		return Author{}
	}
	avatar, err := s.getImage(ctx, "user_profile", userProfile.ID)

	if err != nil {
		ctx.JSON(errorResponse(http.StatusInternalServerError, err))
		log.Printf("[ERROR] Failed to get user avatar: %v", err)
		return Author{}
	}

	author := Author{
		ID:           user.ID,
		UserName:     user.Username,
		Email:        userProfile.Email,
		ProfileName:  userProfile.Name,
		AuthorAvatar: avatar,
	}

	return author
}
