package handlers

import (
	"net/http"
	"strconv"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/database"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ProjectHandler struct {
	db *gorm.DB
}

func NewProjectHandler(db *gorm.DB) *ProjectHandler {
	return &ProjectHandler{db: db}
}

// @Summary Get all projects
// @Description Retrieve all projects with pagination and filtering
// @Tags projects
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Param category query string false "Filter by category"
// @Param status query string false "Filter by status"
// @Success 200 {object} models.APIResponse{data=models.PaginatedResponse}
// @Router /api/projects [get]
func (h *ProjectHandler) GetProjects(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "100"))
	category := c.Query("category")
	status := c.Query("status")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 100
	}

	offset := (page - 1) * limit

	db := database.GetFreshSession(h.db)
	query := db.Model(&models.Project{})

	// Apply filters
	if category != "" {
		query = query.Where("category = ?", category)
	}
	if status != "" {
		query = query.Where("status = ?", status)
	}
	// Remove default status filter - get all projects

	// Get total count
	var total int64
	if err := query.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to count projects",
		})
		return
	}

	// Get projects
	var projects []models.Project
	if err := query.Offset(offset).Limit(limit).Order("created_at DESC").Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch projects",
		})
		return
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	response := models.PaginatedResponse{
		Data:       projects,
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

// @Summary Get project by ID
// @Description Retrieve a specific project by ID
// @Tags projects
// @Accept json
// @Produce json
// @Param id path string true "Project ID"
// @Success 200 {object} models.APIResponse{data=models.Project}
// @Failure 404 {object} models.APIResponse
// @Router /api/projects/{id} [get]
func (h *ProjectHandler) GetProjectByID(c *gin.Context) {
	id := c.Param("id")

	db := database.GetFreshSession(h.db)
	var project models.Project
	if err := db.Where("id = ?", id).First(&project).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, models.APIResponse{
				Success: false,
				Message: "Project not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch project",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    project,
	})
}

// @Summary Get project by slug
// @Description Retrieve a specific project by slug
// @Tags projects
// @Accept json
// @Produce json
// @Param slug path string true "Project slug"
// @Success 200 {object} models.APIResponse{data=models.Project}
// @Failure 404 {object} models.APIResponse
// @Router /api/projects/slug/{slug} [get]
func (h *ProjectHandler) GetProjectBySlug(c *gin.Context) {
	slug := c.Param("slug")

	db := database.GetFreshSession(h.db)
	var project models.Project

	if err := db.Where("slug = ?", slug).First(&project).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, models.APIResponse{
				Success: false,
				Message: "Project not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch project",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    project,
	})
}

// @Summary Create a new project
// @Description Create a new project (admin/editor only)
// @Tags projects
// @Accept json
// @Produce json
// @Param project body models.CreateProjectRequest true "Project data"
// @Success 201 {object} models.APIResponse{data=models.Project}
// @Failure 400 {object} models.APIResponse
// @Security BearerAuth
// @Router /api/v1/projects [post]
func (h *ProjectHandler) CreateProject(c *gin.Context) {
	var req models.CreateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	project := models.Project{
		Slug:        req.Slug,
		Title:       req.Title,
		Description: req.Description,
		Image:       req.Image,
		Category:    req.Category,
		Status:      req.Status,
		MentorsJSON: req.Mentors,
	}

	if project.Status == "" {
		project.Status = "active"
	}

	db := database.GetFreshSession(h.db)
	if err := db.Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to create project",
		})
		return
	}

	c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Message: "Project created successfully",
		Data:    project,
	})
}

// @Summary Update a project
// @Description Update an existing project (admin/editor only)
// @Tags projects
// @Accept json
// @Produce json
// @Param id path string true "Project ID"
// @Param project body models.CreateProjectRequest true "Updated project data"
// @Success 200 {object} models.APIResponse{data=models.Project}
// @Failure 400 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Security BearerAuth
// @Router /api/v1/projects/{id} [put]
func (h *ProjectHandler) UpdateProject(c *gin.Context) {
	id := c.Param("id")

	var req models.CreateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	db := database.GetFreshSession(h.db)
	var project models.Project
	if err := db.Where("id = ?", id).First(&project).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, models.APIResponse{
				Success: false,
				Message: "Project not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch project",
		})
		return
	}

	// Update fields
	project.Slug = req.Slug
	project.Title = req.Title
	project.Description = req.Description
	project.Image = req.Image
	project.Category = req.Category
	project.Status = req.Status
	project.MentorsJSON = req.Mentors

	if err := db.Save(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to update project",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Project updated successfully",
		Data:    project,
	})
}

// @Summary Delete a project
// @Description Delete a project (admin/editor only)
// @Tags projects
// @Accept json
// @Produce json
// @Param id path string true "Project ID"
// @Success 200 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Security BearerAuth
// @Router /api/v1/projects/{id} [delete]
func (h *ProjectHandler) DeleteProject(c *gin.Context) {
	id := c.Param("id")

	db := database.GetFreshSession(h.db)
	result := db.Where("id = ?", id).Delete(&models.Project{})

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to delete project",
		})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "Project not found",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Project deleted successfully",
	})
}
