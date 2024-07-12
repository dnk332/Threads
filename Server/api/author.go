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

func (s *Server) getAuthorInfo(ctx *gin.Context, authorId int64) Author {
	user, valid := s.validUser(ctx, authorId)
	if !valid {
		return Author{}
	}
	userProfile, err := s.store.GetUserProfileById(ctx, authorId)
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
