package handlers

import (
	"net/http"
	"strconv"

	"msc-backend-api/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MentorHandler struct {
	db *gorm.DB
}

func NewMentorHandler(db *gorm.DB) *MentorHandler {
	return &MentorHandler{db: db}
}

// @Summary Get mentors
// @Description Get list of mentors with pagination and filtering
// @Tags mentors
// @Produce json
// @Security BearerAuth
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Param status query string false "Filter by status"
// @Param search query string false "Search in name and bio"
// @Success 200 {object} models.PaginatedResponse
// @Failure 401 {object} models.APIResponse
// @Router /mentors [get]
func (h *MentorHandler) GetMentors(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	status := c.Query("status")
	search := c.Query("search")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	query := h.db.Model(&models.Mentor{})

	// Apply filters
	if status != "" {
		query = query.Where("status = ?", status)
	}
	if search != "" {
		query = query.Where("name ILIKE ? OR bio ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	var total int64
	query.Count(&total)

	var mentors []models.Mentor
	if err := query.Offset(offset).Limit(limit).Order("created_at DESC").Find(&mentors).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch mentors",
		})
		return
	}

	totalPages := (int(total) + limit - 1) / limit

	c.JSON(http.StatusOK, models.PaginatedResponse{
		Data:       mentors,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	})
}

// @Summary Get single mentor
// @Description Get mentor details by ID
// @Tags mentors
// @Produce json
// @Security BearerAuth
// @Param id path string true "Mentor ID"
// @Success 200 {object} models.APIResponse{data=models.Mentor}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /mentors/{id} [get]
func (h *MentorHandler) GetMentor(c *gin.Context) {
	id := c.Param("id")

	var mentor models.Mentor
	if err := h.db.Where("id = ?", id).First(&mentor).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Mentor not found",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    mentor,
	})
}

// @Summary Create mentor
// @Description Create a new mentor
// @Tags mentors
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param mentor body models.CreateMentorRequest true "Mentor data"
// @Success 201 {object} models.APIResponse{data=models.Mentor}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Router /mentors [post]
func (h *MentorHandler) CreateMentor(c *gin.Context) {
	var req models.CreateMentorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Set default status
	if req.Status == "" {
		req.Status = "active"
	}

	mentor := models.Mentor{
		Name:        req.Name,
		Title:       req.Title,
		Bio:         req.Bio,
		AvatarURL:   req.AvatarURL,
		Email:       req.Email,
		Phone:       req.Phone,
		LinkedinURL: req.LinkedinURL,
		Specialties: req.Specialties,
		Status:      req.Status,
	}

	if err := h.db.Create(&mentor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to create mentor",
		})
		return
	}

	c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Message: "Mentor created successfully",
		Data:    mentor,
	})
}

// @Summary Update mentor
// @Description Update mentor by ID
// @Tags mentors
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Mentor ID"
// @Param mentor body models.CreateMentorRequest true "Mentor data"
// @Success 200 {object} models.APIResponse{data=models.Mentor}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /mentors/{id} [put]
func (h *MentorHandler) UpdateMentor(c *gin.Context) {
	id := c.Param("id")
	
	var mentor models.Mentor
	if err := h.db.Where("id = ?", id).First(&mentor).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Mentor not found",
		})
		return
	}

	var req models.CreateMentorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Update mentor
	mentor.Name = req.Name
	mentor.Title = req.Title
	mentor.Bio = req.Bio
	mentor.AvatarURL = req.AvatarURL
	mentor.Email = req.Email
	mentor.Phone = req.Phone
	mentor.LinkedinURL = req.LinkedinURL
	mentor.Specialties = req.Specialties
	if req.Status != "" {
		mentor.Status = req.Status
	}

	if err := h.db.Save(&mentor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to update mentor",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Mentor updated successfully",
		Data:    mentor,
	})
}

// @Summary Delete mentor
// @Description Delete mentor by ID
// @Tags mentors
// @Produce json
// @Security BearerAuth
// @Param id path string true "Mentor ID"
// @Success 200 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /mentors/{id} [delete]
func (h *MentorHandler) DeleteMentor(c *gin.Context) {
	id := c.Param("id")

	if err := h.db.Delete(&models.Mentor{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to delete mentor",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Mentor deleted successfully",
	})
}
