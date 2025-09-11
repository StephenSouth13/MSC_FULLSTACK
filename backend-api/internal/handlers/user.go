package handlers

import (
	"bytes"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/database"
	"msc-backend-api/pkg/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{db: db}
}

/************** DTOs **************/

type RegisterRequest struct {
	Name     string `json:"full_name" binding:"required" example:"Nguyễn Văn A"`
	Email    string `json:"email" binding:"required,email" example:"user@example.com"`
	Phone    string `json:"phone" example:"0901234567"`
	Password string `json:"password" binding:"required,min=6" example:"password123"`
}

type UserData struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"fullName"` // Map name từ DB sang fullName cho frontend
}

type RegisterResponse struct {
	Success bool      `json:"success"`
	Message string    `json:"message"`
	Data    *UserData `json:"data,omitempty"`
}

/************** Handlers **************/

// RegisterUser đăng ký tài khoản mới
func (h *UserHandler) RegisterUser(c *gin.Context) {
	log.Println("=== RegisterUser called ===")

	// Debug body
	body, err := c.GetRawData()
	if err == nil {
		log.Printf("Body: %s", string(body))
		c.Request.Body = io.NopCloser(bytes.NewBuffer(body))
	}

	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Dữ liệu không hợp lệ",
			"error":   err.Error(),
		})
		return
	}

	// Check email duy nhất
	var existing models.User
	session := database.GetFreshSession(h.db)
	if err := session.Where("LOWER(email) = ?", strings.ToLower(req.Email)).
		First(&existing).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{
			"success": false,
			"message": "Email đã được sử dụng",
		})
		return
	}

	// Hash mật khẩu
	hashed, err := utils.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Không thể xử lý mật khẩu",
			"error":   err.Error(),
		})
		return
	}

	// Tạo user với trường name trong database
	user := models.User{
		Name:         req.Name, // Lưu vào trường name trong Supabase
		Email:        req.Email,
		PasswordHash: hashed,
	}

	if err := session.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Không thể tạo tài khoản",
			"error":   err.Error(),
		})
		return
	}

	log.Printf("User created successfully with name: %s", user.Name)

	c.JSON(http.StatusCreated, RegisterResponse{
		Success: true,
		Message: "Đăng ký thành công",
		Data: &UserData{
			ID:    user.ID.String(),
			Email: user.Email,
			Name:  user.Name, // Trường name từ DB sẽ được map thành fullName ở JSON tag
		},
	})
}

// GetUsers lấy danh sách user có phân trang + search
func (h *UserHandler) GetUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	if page < 1 {
		page = 1
	}
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	if limit <= 0 {
		limit = 10
	}
	offset := (page - 1) * limit
	search := c.Query("search")

	query := h.db.Model(&models.User{})
	if search != "" {
		like := "%" + search + "%"
		query = query.Where("name ILIKE ? OR email ILIKE ?", like, like)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}

	var users []models.User
	if err := query.
		Select("id, name, email, created_at, updated_at").
		Order("created_at DESC").
		Offset(offset).
		Limit(limit).
		Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}

	list := make([]gin.H, 0, len(users))
	for _, u := range users {
		list = append(list, gin.H{
			"id":        u.ID.String(),
			"fullName":  u.Name,
			"email":     u.Email,
			"createdAt": u.CreatedAt,
			"updatedAt": u.UpdatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"users": list,
			"pagination": gin.H{
				"page":  page,
				"limit": limit,
				"total": total,
			},
		},
	})
}

// GetUser chi tiết user theo id
func (h *UserHandler) GetUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := h.db.Select("id, name, email, created_at, updated_at").
		First(&user, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "Không tìm thấy người dùng"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"id":        user.ID.String(),
			"fullName":  user.Name,
			"email":     user.Email,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdatedAt,
		},
	})
}

// UpdateUser cập nhật name/email
func (h *UserHandler) UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "Không tìm thấy người dùng"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}

	var req map[string]string
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "error": "Dữ liệu không hợp lệ"})
		return
	}

	updates := map[string]interface{}{}
	if name, ok := req["full_name"]; ok && strings.TrimSpace(name) != "" {
		updates["name"] = name
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Không có trường nào để cập nhật"})
		return
	}

	if err := h.db.Model(&user).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Cập nhật thành công"})
}

// DeleteUser xóa user (chặn tự xóa bản thân)
func (h *UserHandler) DeleteUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"success": false, "message": "Không tìm thấy người dùng"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}

	currentUserID := c.GetString("user_id")
	if currentUserID != "" && currentUserID == user.ID.String() {
		c.JSON(http.StatusForbidden, gin.H{"success": false, "message": "Không thể tự xóa tài khoản của bạn"})
		return
	}

	if err := h.db.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Xóa người dùng thành công"})
}

// TestHandler test route
func (h *UserHandler) TestHandler(c *gin.Context) {
	log.Println("TestHandler called")
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "UserHandler is working correctly",
	})
}
