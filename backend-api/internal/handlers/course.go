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

type CourseHandler struct {
	db *gorm.DB
}

func NewCourseHandler(db *gorm.DB) *CourseHandler {
	return &CourseHandler{db: db}
}

// @Summary Get courses
// @Description Get list of courses with pagination and filtering
// @Tags courses
// @Produce json
// @Security BearerAuth
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Param status query string false "Filter by status"
// @Param category query string false "Filter by category"
// @Param search query string false "Search in title and description"
// @Success 200 {object} models.PaginatedResponse
// @Failure 401 {object} models.APIResponse
// @Router /courses [get]
func (h *CourseHandler) GetCourses(c *gin.Context) {
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

	query := h.db.Model(&models.Course{}).Preload("Author")

	// Apply filters
	if status != "" {
		query = query.Where("status = ?", status)
	}
	if category != "" {
		query = query.Where("category = ?", category)
	}
	if search != "" {
		query = query.Where("title ILIKE ? OR description ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Check user role for filtering
	userRoles, _ := c.Get("user_roles")
	userID, _ := c.Get("user_id")

	if userRolesList, ok := userRoles.([]string); ok {
		// Partners can only see their own courses
		if auth.HasRole(userRolesList, "partner") && !auth.HasAnyRole(userRolesList, []string{"admin", "editor"}) {
			query = query.Where("author_id = ?", userID)
		}
	}

	var total int64
	query.Count(&total)

	var courses []models.Course
	if err := query.Offset(offset).Limit(limit).Order("created_at DESC").Find(&courses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch courses",
		})
		return
	}

	totalPages := (int(total) + limit - 1) / limit

	c.JSON(http.StatusOK, models.PaginatedResponse{
		Data:       courses,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	})
}

// @Summary Get single course
// @Description Get course details by ID
// @Tags courses
// @Produce json
// @Security BearerAuth
// @Param id path string true "Course ID"
// @Success 200 {object} models.APIResponse{data=models.Course}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /courses/{id} [get]
func (h *CourseHandler) GetCourse(c *gin.Context) {
	id := c.Param("id")

	var course models.Course
	if err := h.db.Preload("Author").Preload("Lessons").Where("id = ?", id).First(&course).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Course not found",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    course,
	})
}

// @Summary Create course
// @Description Create a new course
// @Tags courses
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param course body models.CreateCourseRequest true "Course data"
// @Success 201 {object} models.APIResponse{data=models.Course}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Router /courses [post]
func (h *CourseHandler) CreateCourse(c *gin.Context) {
	var req models.CreateCourseRequest
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
	var existingCourse models.Course
	if err := h.db.Where("slug = ?", req.Slug).First(&existingCourse).Error; err == nil {
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

	course := models.Course{
		Title:        req.Title,
		Slug:         req.Slug,
		Description:  req.Description,
		ThumbnailURL: req.ThumbnailURL,
		Status:       req.Status,
		AuthorID:     authorID,
	}

	if err := h.db.Create(&course).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to create course",
		})
		return
	}

	// Load author relation
	h.db.Preload("Author").First(&course, course.ID)

	c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Message: "Course created successfully",
		Data:    course,
	})
}

// @Summary Update course
// @Description Update course by ID
// @Tags courses
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Course ID"
// @Param course body models.CreateCourseRequest true "Course data"
// @Success 200 {object} models.APIResponse{data=models.Course}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /courses/{id} [put]
func (h *CourseHandler) UpdateCourse(c *gin.Context) {
	id := c.Param("id")

	var course models.Course
	if err := h.db.Where("id = ?", id).First(&course).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Course not found",
		})
		return
	}

	// Check permission
	userID, _ := c.Get("user_id")
	userRoles, _ := c.Get("user_roles")

	if userRolesList, ok := userRoles.([]string); ok {
		if auth.HasRole(userRolesList, "partner") && course.AuthorID.String() != userID.(string) {
			c.JSON(http.StatusForbidden, models.APIResponse{
				Success: false,
				Message: "You can only edit your own courses",
			})
			return
		}
	}

	var req models.CreateCourseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Check if new slug is unique (if changed)
	if req.Slug != course.Slug {
		var existingCourse models.Course
		if err := h.db.Where("slug = ? AND id != ?", req.Slug, id).First(&existingCourse).Error; err == nil {
			c.JSON(http.StatusBadRequest, models.APIResponse{
				Success: false,
				Message: "Slug already exists",
			})
			return
		}
	}

	// Update course
	course.Title = req.Title
	course.Slug = req.Slug
	course.Description = req.Description
	course.ThumbnailURL = req.ThumbnailURL
	if req.Status != "" {
		course.Status = req.Status
	}

	if err := h.db.Save(&course).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to update course",
		})
		return
	}

	// Load author relation
	h.db.Preload("Author").First(&course, course.ID)

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Course updated successfully",
		Data:    course,
	})
}

// @Summary Delete course
// @Description Delete course by ID
// @Tags courses
// @Produce json
// @Security BearerAuth
// @Param id path string true "Course ID"
// @Success 200 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /courses/{id} [delete]
func (h *CourseHandler) DeleteCourse(c *gin.Context) {
	id := c.Param("id")

	if err := h.db.Delete(&models.Course{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to delete course",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Course deleted successfully",
	})
}

// @Summary Approve course
// @Description Approve a pending course
// @Tags courses
// @Produce json
// @Security BearerAuth
// @Param id path string true "Course ID"
// @Success 200 {object} models.APIResponse{data=models.Course}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /courses/{id}/approve [patch]
func (h *CourseHandler) ApproveCourse(c *gin.Context) {
	id := c.Param("id")

	var course models.Course
	if err := h.db.Where("id = ?", id).First(&course).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Course not found",
		})
		return
	}

	course.Status = "published"
	if err := h.db.Save(&course).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to approve course",
		})
		return
	}

	h.db.Preload("Author").First(&course, course.ID)

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Course approved successfully",
		Data:    course,
	})
}

// @Summary Reject course
// @Description Reject a pending course
// @Tags courses
// @Produce json
// @Security BearerAuth
// @Param id path string true "Course ID"
// @Success 200 {object} models.APIResponse{data=models.Course}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /courses/{id}/reject [patch]
func (h *CourseHandler) RejectCourse(c *gin.Context) {
	id := c.Param("id")

	var course models.Course
	if err := h.db.Where("id = ?", id).First(&course).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Course not found",
		})
		return
	}

	course.Status = "draft"
	if err := h.db.Save(&course).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to reject course",
		})
		return
	}

	h.db.Preload("Author").First(&course, course.ID)

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Course rejected successfully",
		Data:    course,
	})
}
