package handlers

import (
	"net/http"
	"strconv"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/auth"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{db: db}
}

// @Summary Get users
// @Description Get list of users with pagination and filtering
// @Tags users
// @Produce json
// @Security BearerAuth
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(10)
// @Param search query string false "Search in name and email"
// @Success 200 {object} models.PaginatedResponse
// @Failure 401 {object} models.APIResponse
// @Router /users [get]
func (h *UserHandler) GetUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	search := c.Query("search")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	query := h.db.Model(&models.User{}).Preload("Roles")

	// Apply filters
	if search != "" {
		query = query.Where("name ILIKE ? OR email ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	var total int64
	query.Count(&total)

	var users []models.User
	if err := query.Offset(offset).Limit(limit).Order("created_at DESC").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to fetch users",
		})
		return
	}

	// Clear password hashes
	for i := range users {
		users[i].PasswordHash = ""
	}

	totalPages := (int(total) + limit - 1) / limit

	c.JSON(http.StatusOK, models.PaginatedResponse{
		Data:       users,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	})
}

// @Summary Get single user
// @Description Get user details by ID
// @Tags users
// @Produce json
// @Security BearerAuth
// @Param id path string true "User ID"
// @Success 200 {object} models.APIResponse{data=models.User}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /users/{id} [get]
func (h *UserHandler) GetUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := h.db.Preload("Roles").Where("id = ?", id).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "User not found",
		})
		return
	}

	// Clear password hash
	user.PasswordHash = ""

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    user,
	})
}

// @Summary Create user
// @Description Create a new user (admin only)
// @Tags users
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param user body models.CreateUserRequest true "User data"
// @Success 201 {object} models.APIResponse{data=models.User}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Router /users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
	var req models.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Check if email already exists
	var existingUser models.User
	if err := h.db.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Email already exists",
		})
		return
	}

	// Hash password
	passwordHash, err := auth.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to hash password",
		})
		return
	}

	user := models.User{
		Name:         req.Name,
		Email:        req.Email,
		PasswordHash: passwordHash,
		Bio:          req.Bio,
	}

	if err := h.db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to create user",
		})
		return
	}

	// Assign roles if provided
	if len(req.RoleIDs) > 0 {
		var roles []models.Role
		if err := h.db.Where("id IN ?", req.RoleIDs).Find(&roles).Error; err == nil {
			h.db.Model(&user).Association("Roles").Append(roles)
		}
	}

	// Load user with roles
	h.db.Preload("Roles").First(&user, user.ID)

	// Clear password hash
	user.PasswordHash = ""

	c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Message: "User created successfully",
		Data:    user,
	})
}

// @Summary Update user
// @Description Update user by ID (admin only)
// @Tags users
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "User ID"
// @Param user body models.CreateUserRequest true "User data"
// @Success 200 {object} models.APIResponse{data=models.User}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /users/{id} [put]
func (h *UserHandler) UpdateUser(c *gin.Context) {
	id := c.Param("id")
	
	var user models.User
	if err := h.db.Preload("Roles").Where("id = ?", id).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "User not found",
		})
		return
	}

	var req models.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Check if new email is unique (if changed)
	if req.Email != user.Email {
		var existingUser models.User
		if err := h.db.Where("email = ? AND id != ?", req.Email, id).First(&existingUser).Error; err == nil {
			c.JSON(http.StatusBadRequest, models.APIResponse{
				Success: false,
				Message: "Email already exists",
			})
			return
		}
	}

	// Update user
	user.Name = req.Name
	user.Email = req.Email
	user.Bio = req.Bio

	// Update password if provided
	if req.Password != "" {
		passwordHash, err := auth.HashPassword(req.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, models.APIResponse{
				Success: false,
				Message: "Failed to hash password",
			})
			return
		}
		user.PasswordHash = passwordHash
	}

	if err := h.db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to update user",
		})
		return
	}

	// Update roles if provided
	if len(req.RoleIDs) > 0 {
		// Clear existing roles
		h.db.Model(&user).Association("Roles").Clear()
		
		// Assign new roles
		var roles []models.Role
		if err := h.db.Where("id IN ?", req.RoleIDs).Find(&roles).Error; err == nil {
			h.db.Model(&user).Association("Roles").Append(roles)
		}
	}

	// Reload user with roles
	h.db.Preload("Roles").First(&user, user.ID)

	// Clear password hash
	user.PasswordHash = ""

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "User updated successfully",
		Data:    user,
	})
}

// @Summary Delete user
// @Description Delete user by ID (admin only)
// @Tags users
// @Produce json
// @Security BearerAuth
// @Param id path string true "User ID"
// @Success 200 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /users/{id} [delete]
func (h *UserHandler) DeleteUser(c *gin.Context) {
	id := c.Param("id")

	// Prevent self-deletion
	userID, _ := c.Get("user_id")
	if id == userID.(string) {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Cannot delete your own account",
		})
		return
	}

	if err := h.db.Delete(&models.User{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to delete user",
		})
		return
	}

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "User deleted successfully",
	})
}
