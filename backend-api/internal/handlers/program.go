// internal/handlers/program.go
package handlers

import (
	"context"
	"errors"
	"log"
	"net/http"
	"strconv"
	"time"

	"msc-backend-api/internal/models"
	"msc-backend-api/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProgramHandler struct {
	db *gorm.DB
}

func NewProgramHandler(db *gorm.DB) *ProgramHandler {
	return &ProgramHandler{db: db}
}

// GET /api/programs
func (h *ProgramHandler) GetPrograms(c *gin.Context) {
	limit := parseIntWithDefaultClamp(c.Query("limit"), 20, 1, 100)
	offset := parseIntWithDefaultClamp(c.Query("offset"), 0, 0, 1_000_000)

	ctx, cancel := context.WithTimeout(c.Request.Context(), 3*time.Second)
	defer cancel()

	var programs []models.Program
	session := database.GetFreshSession(h.db).WithContext(ctx)

	if err := session.
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&programs).Error; err != nil {

		log.Printf("DB error GetPrograms: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Lỗi truy vấn dữ liệu",
		})
		return
	}

	// Get total count for pagination
	var total int64
	countSession := database.GetFreshSession(h.db).WithContext(ctx).Model(&models.Program{})
	countSession.Count(&total)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    programs,
		"meta": gin.H{
			"limit":  limit,
			"offset": offset,
			"count":  len(programs),
			"total":  total,
		},
	})
}

// GET /api/programs/:id
// :id có thể là UUID (tìm theo id) hoặc slug (tìm theo slug)
func (h *ProgramHandler) GetProgramByID(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 3*time.Second)
	defer cancel()

	var program models.Program
	session := database.GetFreshSession(h.db).WithContext(ctx)

	q := session
	if _, err := uuid.Parse(id); err == nil {
		q = q.Where("id = ?", id)
	} else {
		q = q.Where("slug = ?", id)
	}

	if err := q.First(&program).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"success": false,
				"message": "Không tìm thấy chương trình",
			})
			return
		}
		log.Printf("DB error GetProgramByID(%s): %v", id, err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Lỗi truy vấn dữ liệu",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    program,
	})
}

// --- helpers ---

func parseIntWithDefaultClamp(s string, def, min, max int) int {
	if s == "" {
		return def
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return def
	}
	if n < min {
		return min
	}
	if n > max {
		return max
	}
	return n
}
