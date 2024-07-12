package api

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func (s *Server) uploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		log.Printf("[ERROR] Failed to get image: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to get image"})
		return
	}

	imageName := c.PostForm("image_name")
	if imageName == "" {
		log.Printf("[ERROR] Image name is required")
		c.JSON(http.StatusBadRequest, gin.H{"error": "image name is required"})
		return
	}

	fileContent, err := file.Open()
	if err != nil {
		log.Printf("[ERROR] Failed to open image: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to open image"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load AWS configuration"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload image"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"response": result})
}
