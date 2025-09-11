package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID      `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name         string         `json:"name" gorm:"not null"`                   // Trường name trong Supabase
	Email        string         `json:"email" gorm:"uniqueIndex;not null"`      // Email duy nhất
	PasswordHash string         `json:"-" gorm:"column:password_hash;not null"` // Mật khẩu đã hash
	Roles        []Role         `json:"roles" gorm:"many2many:user_roles;"`     // Quan hệ many-to-many với roles
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

// ...existing code...
