package handlers

import (
	"log"
	"net/http"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/auth"
	"msc-backend-api/pkg/config"
	"msc-backend-api/pkg/database"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthHandler struct {
	db     *gorm.DB
	config *config.Config
}

func NewAuthHandler(db *gorm.DB) *AuthHandler {
	return &AuthHandler{
		db:     db,
		config: config.Load(),
	}
}

// @Summary User login
// @Description Authenticate user and return JWT token
// @Tags auth
// @Accept json
// @Produce json
// @Param credentials body models.LoginRequest true "Login credentials"
// @Success 200 {object} models.APIResponse{data=models.AuthResponse}
// @Failure 400 {object} models.APIResponse
// @Failure 401 {object} models.APIResponse
// @Router /auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Message: "Invalid request data",
		})
		return
	}

	// Find user by email
	var user models.User
	session := database.GetFreshSession(h.db)
	if err := session.Preload("Roles").Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Message: "Invalid email or password",
		})
		return
	}

	// Check password
	if !auth.CheckPasswordHash(req.Password, user.PasswordHash) {
		c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Message: "Invalid email or password",
		})
		return
	}

	// Extract role names
	roleNames := make([]string, len(user.Roles))
	for i, role := range user.Roles {
		roleNames[i] = role.Name
	}

	// Generate JWT token
	jwtSecret := h.config.JWTSecret
	token, err := auth.GenerateToken(user.ID.String(), user.Email, roleNames, jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Message: "Failed to generate token",
		})
		return
	}

	// Clear password hash from response
	user.PasswordHash = ""

	log.Printf("Login successful for user: %s (name: %s)", user.Email, user.Name)

	// Tạo response với định dạng phù hợp cho frontend
	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Login successful",
		Data: gin.H{
			"token": token,
			"user": gin.H{
				"id":       user.ID.String(),
				"email":    user.Email,
				"fullName": user.Name, // Map từ Name trong DB sang fullName cho frontend
			},
		},
	})
}

// @Summary Get current user profile
// @Description Get the profile of the currently authenticated user
// @Tags auth
// @Produce json
// @Security BearerAuth
// @Success 200 {object} models.APIResponse{data=models.User}
// @Failure 401 {object} models.APIResponse
// @Failure 404 {object} models.APIResponse
// @Router /auth/profile [get]
func (h *AuthHandler) GetProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Message: "User ID not found in context",
		})
		return
	}

	var user models.User
	session := database.GetFreshSession(h.db)
	if err := session.Preload("Roles").Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Message: "User not found",
		})
		return
	}

	// Clear password hash from response
	user.PasswordHash = ""

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: gin.H{
			"id":       user.ID.String(),
			"email":    user.Email,
			"fullName": user.Name, // Map từ Name trong DB sang fullName cho frontend
		},
	})
}

// @Summary User logout
// @Description Logout user (client-side token removal, server can implement token blacklisting if needed)
// @Tags auth
// @Produce json
// @Security BearerAuth
// @Success 200 {object} models.APIResponse
// @Router /auth/logout [post]
func (h *AuthHandler) Logout(c *gin.Context) {
	// Trong thực tế, có thể thêm logic để blacklist token
	// Ở đây chỉ trả về thông báo thành công
	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Đăng xuất thành công",
	})
}
