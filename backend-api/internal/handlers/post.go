package handlers

import (
	"net/http"
	"strconv"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/auth"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PostHandler struct {
	db *gorm.DB
}

func NewPostHandler(db *gorm.DB) *PostHandler {
	return &PostHandler{db: db}
}

// @Summary Get posts
// @Description Get list of posts with pagination and filtering
// @Tags posts
// @Produce json
// @Security BearerAuth
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Param status query string false "Filter by status"
// @Param category query string false "Filter by category"
// @Param search query string false "Search in title and content"
// @Success 200 {object} models.PaginatedResponse
// @Failure 401 {object} models.APIResponse
// @Router /posts [get]
func (h *PostHandler) GetPosts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	status := c.Query("status")
	category := c.Query("category")
	search := c.Query("search")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	query := h.db.Model(&models.Post{}).Preload("Author")

	// Apply filters
	if status != "" {
		query = query.Where("status = ?", status)
	}
	if category != "" {
		query = query.Where("category = ?", category)
	}
	if search != "" {
		query = query.Where("title ILIKE ? OR excerpt ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Check user role for filtering
	userRoles, _ := c.Get("user_roles")
	userID, _ := c.Get("user_id")

	if userRolesList, ok := userRoles.([]string); ok {
		// Partners can only see their own posts
		if auth.HasRole(userRolesList, "partner") && !auth.HasAnyRole(userRolesList, []string{"admin", "editor"}) {
			query = query.Where("author_id = ?", userID)
		}
	}

	var total int64
	query.Count(&total)

	var posts []models.Post
	if err := query.Offset(offset).Limit(limit).Order("created_at DESC").Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch posts",
		})
		return
	}

	totalPages := (int(total) + limit - 1) / limit

	c.JSON(http.StatusOK, models.PaginatedResponse{
		Data:       posts,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	})
}

// @Summary Get single post
// @Description Get post details by ID
// @Tags posts
// @Produce json
// @Security BearerAuth
// @Param id path string true "Post ID"
// @Success 200 {object} models.APIResponse{data=models.Post}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /posts/{id} [get]
func (h *PostHandler) GetPost(c *gin.Context) {
	id := c.Param("id")

	var post models.Post
	if err := h.db.Preload("Author").Where("id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Post not found",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    post,
	})
}

// @Summary Create post
// @Description Create a new post
// @Tags posts
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param post body models.CreatePostRequest true "Post data"
// @Success 201 {object} models.APIResponse{data=models.Post}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Router /posts [post]
func (h *PostHandler) CreatePost(c *gin.Context) {
	var req models.CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	userID, _ := c.Get("user_id")
	userIDStr := userID.(string)
	authorID, _ := uuid.Parse(userIDStr)

	// Check if slug is unique
	var existingPost models.Post
	if err := h.db.Where("slug = ?", req.Slug).First(&existingPost).Error; err == nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Slug already exists",
		})
		return
	}

	// Set default status for partners
	if req.Status == "" {
		userRoles, _ := c.Get("user_roles")
		if userRolesList, ok := userRoles.([]string); ok {
			if auth.HasRole(userRolesList, "partner") {
				req.Status = "pending_review"
			} else {
				req.Status = "draft"
			}
		}
	}

	post := models.Post{
		Title:        req.Title,
		Slug:         req.Slug,
		Content:      req.Content,
		Excerpt:      req.Excerpt,
		ThumbnailURL: req.ThumbnailURL,
		Status:       req.Status,
		AuthorID:     authorID,
	}

	if err := h.db.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to create post",
		})
		return
	}

	// Load author relation
	h.db.Preload("Author").First(&post, post.ID)

	c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Message: "Post created successfully",
		Data:    post,
	})
}

// @Summary Update post
// @Description Update post by ID
// @Tags posts
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Post ID"
// @Param post body models.CreatePostRequest true "Post data"
// @Success 200 {object} models.APIResponse{data=models.Post}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /posts/{id} [put]
func (h *PostHandler) UpdatePost(c *gin.Context) {
	id := c.Param("id")

	var post models.Post
	if err := h.db.Where("id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Post not found",
		})
		return
	}

	// Check permission
	userID, _ := c.Get("user_id")
	userRoles, _ := c.Get("user_roles")

	if userRolesList, ok := userRoles.([]string); ok {
		if auth.HasRole(userRolesList, "partner") && post.AuthorID.String() != userID.(string) {
			c.JSON(http.StatusForbidden, models.APIResponse{
				Success: false,
				Message: "You can only edit your own posts",
			})
			return
		}
	}

	var req models.CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Check if new slug is unique (if changed)
	if req.Slug != post.Slug {
		var existingPost models.Post
		if err := h.db.Where("slug = ? AND id != ?", req.Slug, id).First(&existingPost).Error; err == nil {
			c.JSON(http.StatusBadRequest, models.APIResponse{
				Success: false,
				Message: "Slug already exists",
			})
			return
		}
	}

	// Update post
	post.Title = req.Title
	post.Slug = req.Slug
	post.Content = req.Content
	post.Excerpt = req.Excerpt
	post.ThumbnailURL = req.ThumbnailURL
	if req.Status != "" {
		post.Status = req.Status
	}

	if err := h.db.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to update post",
		})
		return
	}

	// Load author relation
	h.db.Preload("Author").First(&post, post.ID)

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Post updated successfully",
		Data:    post,
	})
}

// @Summary Delete post
// @Description Delete post by ID
// @Tags posts
// @Produce json
// @Security BearerAuth
// @Param id path string true "Post ID"
// @Success 200 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /posts/{id} [delete]
func (h *PostHandler) DeletePost(c *gin.Context) {
	id := c.Param("id")

	if err := h.db.Delete(&models.Post{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to delete post",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Post deleted successfully",
	})
}

// @Summary Approve post
// @Description Approve a pending post
// @Tags posts
// @Produce json
// @Security BearerAuth
// @Param id path string true "Post ID"
// @Success 200 {object} models.APIResponse{data=models.Post}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /posts/{id}/approve [patch]
func (h *PostHandler) ApprovePost(c *gin.Context) {
	id := c.Param("id")

	var post models.Post
	if err := h.db.Where("id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Post not found",
		})
		return
	}

	post.Status = "published"
	if err := h.db.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to approve post",
		})
		return
	}

	h.db.Preload("Author").First(&post, post.ID)

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Post approved successfully",
		Data:    post,
	})
}

// @Summary Reject post
// @Description Reject a pending post
// @Tags posts
// @Produce json
// @Security BearerAuth
// @Param id path string true "Post ID"
// @Success 200 {object} models.APIResponse{data=models.Post}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /posts/{id}/reject [patch]
func (h *PostHandler) RejectPost(c *gin.Context) {
	id := c.Param("id")

	var post models.Post
	if err := h.db.Where("id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Post not found",
		})
		return
	}

	post.Status = "draft"
	if err := h.db.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to reject post",
		})
		return
	}

	h.db.Preload("Author").First(&post, post.ID)

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Post rejected successfully",
		Data:    post,
	})
}
