package api

import (
	"log"
	"net/http"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/gin-gonic/gin"
)

func (s *Server) setUserAvatar(c *gin.Context, url string, userProfile db.UserProfile) (err error) {
	params := db.SetUserAvatarParams{
		Content:  url,
		ObjectID: userProfile.ID,
	}

	_, err = s.store.SetUserAvatar(c, params)
	if err != nil {
		log.Printf("[ERROR] Error setting user avatar: %v", err)
		c.JSON(http.StatusInternalServerError, err)
		return err
	}
	log.Printf("User avatar set successfully")
	return nil
}

func (s *Server) getImage(c *gin.Context, imageType string, objectID int64) (url string, err error) {
	arg := db.GetImageParams{
		ObjectType: imageType,
		ObjectID:   objectID,
	}

	image, err := s.store.GetImage(c, arg)
	if err != nil {
		log.Printf("[ERROR] Error getting image: %v", err)
		c.JSON(http.StatusInternalServerError, err)
		return "", err
	}

	url = image.Content
	return url, nil
}
