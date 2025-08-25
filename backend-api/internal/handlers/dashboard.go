package handlers

import (
	"net/http"

	"msc-backend-api/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DashboardHandler struct {
	db *gorm.DB
}

func NewDashboardHandler(db *gorm.DB) *DashboardHandler {
	return &DashboardHandler{db: db}
}

// @Summary Get dashboard statistics
// @Description Get overview statistics for the admin dashboard
// @Tags dashboard
// @Produce json
// @Security BearerAuth
// @Success 200 {object} models.APIResponse{data=models.DashboardStats}
// @Failure 401 {object} models.APIResponse
// @Failure 403 {object} models.APIResponse
// @Router /dashboard/stats [get]
func (h *DashboardHandler) GetStats(c *gin.Context) {
	var stats models.DashboardStats

	// Count total courses
	h.db.Model(&models.Course{}).Count(&stats.TotalCourses)

	// Count total posts
	h.db.Model(&models.Post{}).Count(&stats.TotalPosts)

	// Count total users
	h.db.Model(&models.User{}).Count(&stats.TotalUsers)

	// Count total enrollments
	h.db.Model(&models.Enrollment{}).Count(&stats.TotalEnrollments)

	// Count pending reviews (courses and posts)
	var pendingCourses, pendingPosts int64
	h.db.Model(&models.Course{}).Where("status = ?", "pending_review").Count(&pendingCourses)
	h.db.Model(&models.Post{}).Where("status = ?", "pending_review").Count(&pendingPosts)
	stats.PendingReviews = pendingCourses + pendingPosts

	// TODO: Calculate revenue from payment system
	stats.Revenue = 0.0

	c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    stats,
	})
}
