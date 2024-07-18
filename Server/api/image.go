package api

import (
	"encoding/base64"
	"errors"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/aws/smithy-go"
	"github.com/briandnk/Threads/token"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type uploadImageRequest struct {
	Files []string  `form:"file" binding:"required"`
	Names []string  `form:"name" binding:"required"`
	Types []string  `form:"type" binding:"required"`
	Index []int64   `form:"index" binding:"required"`
	Size  []float64 `form:"size" binding:"required"`
}

type uploadImageResponse struct {
	Index     int64     `json:"index"`
	Uri       string    `json:"uri"`
	ImageName string    `json:"name"`
	ImageType string    `json:"type"`
	Size      float64   `json:"size"`
	CreatedAt time.Time `json:"created_at"`
}

func (s *Server) uploadImage(c *gin.Context) {
	var req uploadImageRequest
	if err := c.ShouldBind(&req); err != nil {
		log.Printf("[ERROR] Failed to bind request: %v", err)
		c.JSON(errorResponse(http.StatusBadRequest, err))
		return
	}

	authPayload := c.MustGet(authorizationPayloadKey).(*token.Payload)
	userID := authPayload.UserID

	awsConfig, err := config.LoadDefaultConfig(c,
		config.WithRegion(s.config.AwsRegion),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider(
				s.config.AwsAccessKeyId,
				s.config.AwsSecretAccessKey,
				"",
			),
		),
	)
	if err != nil {
		log.Printf("[ERROR] Failed to load AWS configuration: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to load AWS configuration")))
		return
	}

	s3Client := s3.NewFromConfig(awsConfig)
	uploader := manager.NewUploader(s3Client)

	var responses []uploadImageResponse
	for i, base64Data := range req.Files {
		if base64Data == "" {
			log.Printf("[ERROR] Base64 data is required for image %d", i)
			c.JSON(errorResponse(http.StatusBadRequest, errors.New("base64 data is required")))
			return
		}

		imageName := strconv.FormatInt(userID, 10) + "_" + req.Names[i]

		if req.Types[i] == "" {
			log.Printf("[ERROR] Image type is required for image %d", i)
			c.JSON(errorResponse(http.StatusBadRequest, errors.New("image type is required")))
			return
		}

		base64Decoded, err := base64.StdEncoding.DecodeString(base64Data)
		if err != nil {
			log.Printf("[ERROR] Failed to decode base64 data for image %d: %v", i, err)
			c.JSON(errorResponse(http.StatusBadRequest, errors.New("failed to decode base64 data")))
			return
		}

		uploadInput := &s3.PutObjectInput{
			Bucket: aws.String(s.config.AwsBucketName),
			Key:    aws.String(imageName),
			Body:   strings.NewReader(string(base64Decoded)),
		}

		result, err := uploader.Upload(c, uploadInput)
		if err != nil {
			log.Printf("[ERROR] Failed to upload image %d: %v", i, err)
			c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to upload image")))
			return
		}

		response := uploadImageResponse{
			Uri:       result.Location,
			ImageName: imageName,
			ImageType: req.Types[i],
			Size:      req.Size[i] / 1024.0,
			CreatedAt: time.Now(),
			Index:     req.Index[i],
		}

		responses = append(responses, response)
	}

	c.JSON(http.StatusOK, responses)
}

type deleteObjectsRequest struct {
	ImageNames []string `form:"image_names" binding:"required"`
}

func (s *Server) deleteImage(c *gin.Context) {
	var req deleteObjectsRequest
	if err := c.ShouldBindQuery(&req); err != nil {
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		c.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		return
	}

	awsConfig, err := config.LoadDefaultConfig(c,
		config.WithRegion(s.config.AwsRegion),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider(
				s.config.AwsAccessKeyId,
				s.config.AwsSecretAccessKey,
				"",
			),
		),
	)
	if err != nil {
		log.Printf("[ERROR] Failed to load AWS configuration: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to load AWS configuration")))
		return
	}

	s3Client := s3.NewFromConfig(awsConfig)

	var deleteErrors []string
	for _, imageName := range req.ImageNames {
		input := &s3.DeleteObjectInput{
			Bucket: aws.String(s.config.AwsBucketName),
			Key:    aws.String(imageName),
		}

		_, err = s3Client.DeleteObject(c, input)
		if err != nil {
			var noKey *types.NoSuchKey
			var apiErr *smithy.GenericAPIError
			if errors.As(err, &noKey) {
				log.Printf("Object %s does not exist in %s.\n", imageName, s.config.AwsBucketName)
				err = noKey
			} else if errors.As(err, &apiErr) {
				switch apiErr.ErrorCode() {
				case "AccessDenied":
					log.Printf("Access denied: cannot delete object %s from %s.\n", imageName, s.config.AwsBucketName)
					err = nil
				}
			}
			deleteErrors = append(deleteErrors, imageName)
			log.Printf("ERR %s.\n", err)
		}
	}

	if len(deleteErrors) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Some objects failed to delete", "errors": deleteErrors})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Objects deleted successfully"})
}
