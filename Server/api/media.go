package api

import (
	"log"
	"net/http"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

func (s *Server) setUserAvatar(c *gin.Context, link string, userProfile db.UserProfile) (avatar db.Media, err error) {
	params := db.SetUserAvatarParams{
		Link:              link,
		ReferenceObjectID: userProfile.ID,
	}

	avatar, err = s.store.SetUserAvatar(c, params)
	if err != nil {
		log.Printf("[ERROR] Error setting user avatar: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, err))
		return db.Media{}, err
	}
	return avatar, nil
}

func (s *Server) getImage(c *gin.Context, imageType string, objectID int64) (url string, err error) {
	arg := db.GetImageParams{
		ReferenceObject:   imageType,
		ReferenceObjectID: objectID,
	}

	image, err := s.store.GetImage(c, arg)
	if err != nil {
		log.Printf("[ERROR] Error getting image: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, err))
		return "", err
	}

	url = image.Link
	return url, nil
}
