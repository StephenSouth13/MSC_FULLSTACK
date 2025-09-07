package handlers

import (
	"msc-backend-api/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AllBlogPostHandler struct {
	db *gorm.DB
}

func NewAllBlogPostHandler(db *gorm.DB) *AllBlogPostHandler {
	return &AllBlogPostHandler{db: db}
}

// GetAllBlogPosts godoc
// @Summary Get all blog posts
// @Description Get all blog posts with pagination
// @Tags allblogposts
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Param category query string false "Filter by category"
// @Success 200 {object} models.APIResponse{data=models.PaginatedResponse}
// @Router /api/allblogposts [get]
func (h *AllBlogPostHandler) GetAllBlogPosts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	category := c.Query("category")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	var posts []models.AllBlogPost
	var total int64

	query := h.db.Model(&models.AllBlogPost{})

	if category != "" {
		query = query.Where("category = ?", category)
	}

	// Count total
	query.Count(&total)

	// Get posts
	if err := query.Order("publish_date DESC").
		Limit(limit).
		Offset(offset).
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch blog posts",
		})
		return
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	response := models.PaginatedResponse{
		Data:       posts,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    response,
	})
}

// GetBlogPostByID godoc
// @Summary Get blog post by ID
// @Description Get a single blog post by ID
// @Tags allblogposts
// @Accept json
// @Produce json
// @Param id path string true "Blog Post ID"
// @Success 200 {object} models.APIResponse{data=models.AllBlogPost}
// @Failure 404 {object} models.APIResponse
// @Router /api/allblogposts/{id} [get]
func (h *AllBlogPostHandler) GetBlogPostByID(c *gin.Context) {
	id := c.Param("id")

	var post models.AllBlogPost
	if err := h.db.First(&post, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, models.APIResponse{
				Success: false,
				Message: "Blog post not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch blog post",
		})
		return
	}

	// Increment views
	h.db.Model(&post).Update("views", post.Views+1)
	post.Views++

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    post,
	})
}

// GetBlogPostBySlug godoc
// @Summary Get blog post by slug
// @Description Get a single blog post by slug
// @Tags allblogposts
// @Accept json
// @Produce json
// @Param slug path string true "Blog Post Slug"
// @Success 200 {object} models.APIResponse{data=models.AllBlogPost}
// @Failure 404 {object} models.APIResponse
// @Router /api/allblogposts/slug/{slug} [get]
func (h *AllBlogPostHandler) GetBlogPostBySlug(c *gin.Context) {
	slug := c.Param("slug")

	var post models.AllBlogPost
	if err := h.db.Where("slug = ?", slug).First(&post).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, models.APIResponse{
				Success: false,
				Message: "Blog post not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch blog post",
		})
		return
	}

	// Increment views
	h.db.Model(&post).Update("views", post.Views+1)
	post.Views++

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    post,
	})
}
