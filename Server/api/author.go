package api

import (
	"github.com/gin-gonic/gin"
)

type Author struct {
	ID          int64  `json:"id"`
	UserName    string `json:"user_name"`
	ProfileName string `json:"name"`
	Email       string `json:"email"`
}

func (server *Server) getAuthorInfo(ctx *gin.Context, authorId int64) Author {
	user, valid := server.validUser(ctx, authorId)
	if !valid {
		return Author{}
	}
	userProfile, err := server.store.GetUserProfileById(ctx, authorId)
	if err != nil {
		return Author{}
	}

	author := Author{
		ID:          user.ID,
		UserName:    user.Username,
		Email:       userProfile.Email,
		ProfileName: userProfile.Name,
	}

	return author
}
