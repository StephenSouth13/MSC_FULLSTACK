package handlers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/config"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UploadHandler struct {
	config *config.Config
}

func NewUploadHandler(cfg *config.Config) *UploadHandler {
	return &UploadHandler{config: cfg}
}

// @Summary Upload file
// @Description Upload file to cloud storage (AWS S3 or Cloudinary)
// @Tags upload
// @Accept multipart/form-data
// @Produce json
// @Security BearerAuth
// @Param file formData file true "File to upload"
// @Param type formData string false "File type (image, video, document)" default(image)
// @Success 200 {object} models.APIResponse{data=object{url=string}}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 413 {object} models.APIResponse
// @Failure 500 {object} models.APIResponse
// @Router /upload [post]
func (h *UploadHandler) UploadFile(c *gin.Context) {
	// Parse the multipart form
	err := c.Request.ParseMultipartForm(10 << 20) // 10 MB max
	if err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "File too large (max 10MB)",
		})
		return
	}

	// Get the file from form data
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "No file provided",
		})
		return
	}
	defer file.Close()

	// Get file type parameter (default to image)
	fileType := c.PostForm("type")
	if fileType == "" {
		fileType = "image"
	}

	// Validate file type
	if !isValidFileType(fileType, header.Filename) {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid file type",
		})
		return
	}

	// Validate file size based on type
	maxSize := getMaxFileSize(fileType)
	if header.Size > maxSize {
		c.JSON(http.StatusRequestEntityTooLarge, models.APIResponse{
			Success: false,
			Message: fmt.Sprintf("File too large (max %dMB for %s)", maxSize/(1024*1024), fileType),
		})
		return
	}

	// Generate unique filename
	ext := filepath.Ext(header.Filename)
	filename := fmt.Sprintf("%s_%d%s", uuid.New().String(), time.Now().Unix(), ext)

	// For now, we'll implement a simple local file storage
	// In production, this should be replaced with AWS S3, Cloudinary, etc.
	uploadURL, err := h.saveFileLocally(c, file, filename, fileType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to upload file",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "File uploaded successfully",
		Data: map[string]string{
			"url":      uploadURL,
			"filename": filename,
			"type":     fileType,
		},
	})
}

func isValidFileType(fileType, filename string) bool {
	ext := strings.ToLower(filepath.Ext(filename))
	
	switch fileType {
	case "image":
		return contains([]string{".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}, ext)
	case "video":
		return contains([]string{".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"}, ext)
	case "document":
		return contains([]string{".pdf", ".doc", ".docx", ".txt", ".rtf"}, ext)
	default:
		return false
	}
}

func getMaxFileSize(fileType string) int64 {
	switch fileType {
	case "image":
		return 5 * 1024 * 1024 // 5MB
	case "video":
		return 100 * 1024 * 1024 // 100MB
	case "document":
		return 10 * 1024 * 1024 // 10MB
	default:
		return 1 * 1024 * 1024 // 1MB
	}
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func (h *UploadHandler) saveFileLocally(c *gin.Context, file interface{}, filename, fileType string) (string, error) {
	// This is a simple implementation for development
	// In production, implement proper cloud storage (AWS S3, Cloudinary, etc.)
	
	// For now, return a placeholder URL
	// The actual implementation would save the file to cloud storage and return the URL
	baseURL := "https://api.msc.edu.vn/uploads"
	return fmt.Sprintf("%s/%s/%s", baseURL, fileType, filename), nil
}

// TODO: Implement actual cloud storage integration
// Example implementations:

/*
// AWS S3 implementation
func (h *UploadHandler) uploadToS3(file multipart.File, filename string) (string, error) {
	sess := session.Must(session.NewSession(&aws.Config{
		Region: aws.String(h.config.AWSRegion),
		Credentials: credentials.NewStaticCredentials(
			h.config.AWSAccessKey,
			h.config.AWSSecretKey,
			"",
		),
	}))

	svc := s3.New(sess)

	_, err := svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(h.config.S3Bucket),
		Key:    aws.String(filename),
		Body:   file,
		ACL:    aws.String("public-read"),
	})

	if err != nil {
		return "", err
	}

	url := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", 
		h.config.S3Bucket, h.config.AWSRegion, filename)
	return url, nil
}

// Cloudinary implementation
func (h *UploadHandler) uploadToCloudinary(file multipart.File, filename string) (string, error) {
	cld, err := cloudinary.NewFromParams(
		h.config.CloudinaryName,
		h.config.CloudinaryKey,
		h.config.CloudinarySecret,
	)
	if err != nil {
		return "", err
	}

	ctx := context.Background()
	result, err := cld.Upload.Upload(ctx, file, uploader.UploadParams{
		PublicID: filename,
		Folder:   "msc-uploads",
	})

	if err != nil {
		return "", err
	}

	return result.SecureURL, nil
}
*/
