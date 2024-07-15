package api

import (
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
	"time"
)

type uploadImageResponse struct {
	Url       string    `json:"url"`
	ImageName string    `json:"image_name"`
	ImageType string    `json:"image_type"`
	Size      float64   `json:"size"`
	CreatedAt time.Time `json:"created_at"`
}

func (s *Server) uploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		log.Printf("[ERROR] Failed to get image: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to get image")))
		return
	}

	imageName := c.PostForm("image_name")
	if imageName == "" {
		log.Printf("[ERROR] Image name is required")
		c.JSON(errorResponse(http.StatusBadRequest, errors.New("image name is required")))
		return
	}

	authPayload := c.MustGet(authorizationPayloadKey).(*token.Payload)
	userID := authPayload.UserID
	imageName = strconv.FormatInt(userID, 10) + "_" + imageName

	imageType := c.PostForm("image_type")
	if imageType == "" {
		log.Printf("[ERROR] Image type is required")
		c.JSON(errorResponse(http.StatusBadRequest, errors.New("image type is required")))
		return
	}

	fileContent, err := file.Open()
	if err != nil {
		log.Printf("[ERROR] Failed to open image: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to open image")))
		return
	}
	defer fileContent.Close()

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

	uploadInput := &s3.PutObjectInput{
		Bucket: aws.String(s.config.AwsBucketName),
		Key:    aws.String(imageName),
		Body:   fileContent,
	}

	result, err := uploader.Upload(c, uploadInput)
	if err != nil {
		log.Printf("[ERROR] Failed to upload image: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to upload image")))
		return
	}

	output, err := s3Client.GetObject(c, &s3.GetObjectInput{
		Bucket: aws.String(s.config.AwsBucketName),
		Key:    aws.String(imageName),
	})
	if err != nil {
		log.Printf("[ERROR] Failed to read image: %v", err)
		c.JSON(errorResponse(http.StatusInternalServerError, errors.New("failed to read image")))
		return
	}

	imageSize := int64(*output.ContentLength)

	//Create image response
	response := uploadImageResponse{
		Url:       result.Location,
		ImageName: imageName,
		ImageType: imageType,
		Size:      float64(imageSize) / 1024.0,
		CreatedAt: time.Now(),
	}

	c.JSON(http.StatusOK, gin.H{"response": response})
}

type deleteObjectRequest struct {
	ImageName string `json:"image_name" binding:"required"`
}

func (s *Server) deleteImage(c *gin.Context) {
	var req deleteObjectRequest
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(errorBindJSONResponse(http.StatusBadRequest, err))
		log.Printf("[ERROR] Failed to parse request URI: %v", err)
		return
	}

	// Load the shared AWS configuration
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

	// Create an S3 client
	s3Client := s3.NewFromConfig(awsConfig)

	// Create the input for the DeleteObject call
	input := &s3.DeleteObjectInput{
		Bucket: aws.String(s.config.AwsBucketName),
		Key:    aws.String(req.ImageName),
	}

	// Call the DeleteObject function
	_, err = s3Client.DeleteObject(c, input)
	if err != nil {
		var noKey *types.NoSuchKey
		var apiErr *smithy.GenericAPIError
		if errors.As(err, &noKey) {
			log.Printf("Object %s does not exist in %s.\n", req.ImageName, s.config.AwsBucketName)
			err = noKey
		} else if errors.As(err, &apiErr) {
			switch apiErr.ErrorCode() {
			case "AccessDenied":
				log.Printf("Access denied: cannot delete object %s from %s.\n", req.ImageName, s.config.AwsBucketName)
				err = nil
			}
		}
		log.Printf("ERR %s.\n", err)
	}
	c.JSON(http.StatusOK, gin.H{"message": "Object deleted successfully"})

}
