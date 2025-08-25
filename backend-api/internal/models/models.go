package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Base model with UUID
type BaseModel struct {
	ID        uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `gorm:"index" json:"-"`
}

// Role model
type Role struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"unique;not null" json:"name"`
}

// User model
type User struct {
	BaseModel
	Name         string `gorm:"not null" json:"name"`
	Email        string `gorm:"unique;not null" json:"email"`
	PasswordHash string `gorm:"not null" json:"-"`
	AvatarURL    string `json:"avatar_url,omitempty"`
	Bio          string `json:"bio,omitempty"`
	Roles        []Role `gorm:"many2many:user_roles;" json:"roles"`
	
	// Relationships
	Courses     []Course     `gorm:"foreignKey:AuthorID" json:"courses,omitempty"`
	Posts       []Post       `gorm:"foreignKey:AuthorID" json:"posts,omitempty"`
	Enrollments []Enrollment `gorm:"foreignKey:UserID" json:"enrollments,omitempty"`
}

// Course model
type Course struct {
	BaseModel
	Title        string `gorm:"not null" json:"title"`
	Slug         string `gorm:"unique;not null" json:"slug"`
	Description  string `json:"description,omitempty"`
	ThumbnailURL string `json:"thumbnail_url,omitempty"`
	Category     string `json:"category,omitempty"`
	Status       string `gorm:"default:'pending_review'" json:"status"` // draft, pending_review, published, archived
	AuthorID     uuid.UUID `gorm:"not null" json:"author_id"`
	
	// Relationships
	Author      User         `gorm:"foreignKey:AuthorID" json:"author,omitempty"`
	Lessons     []Lesson     `gorm:"foreignKey:CourseID;constraint:OnDelete:CASCADE" json:"lessons,omitempty"`
	Enrollments []Enrollment `gorm:"foreignKey:CourseID" json:"enrollments,omitempty"`
}

// Lesson model
type Lesson struct {
	BaseModel
	CourseID uuid.UUID `gorm:"not null" json:"course_id"`
	Title    string    `gorm:"not null" json:"title"`
	Content  string    `gorm:"type:jsonb" json:"content,omitempty"` // JSONB content from Tiptap
	VideoURL string    `json:"video_url,omitempty"`
	Order    int       `gorm:"not null" json:"order"`
	
	// Relationships
	Course Course `gorm:"foreignKey:CourseID" json:"course,omitempty"`
}

// Post model
type Post struct {
	BaseModel
	Title        string `gorm:"not null" json:"title"`
	Slug         string `gorm:"unique;not null" json:"slug"`
	Content      string `gorm:"type:jsonb" json:"content,omitempty"`
	Excerpt      string `json:"excerpt,omitempty"`
	ThumbnailURL string `json:"thumbnail_url,omitempty"`
	Category     string `json:"category,omitempty"`
	Status       string `gorm:"default:'pending_review'" json:"status"` // draft, pending_review, published, archived
	AuthorID     uuid.UUID `gorm:"not null" json:"author_id"`
	
	// Relationships
	Author User `gorm:"foreignKey:AuthorID" json:"author,omitempty"`
}

// Mentor model
type Mentor struct {
	BaseModel
	Name        string   `gorm:"not null" json:"name"`
	Title       string   `json:"title,omitempty"`
	Bio         string   `json:"bio,omitempty"`
	AvatarURL   string   `json:"avatar_url,omitempty"`
	Email       string   `json:"email,omitempty"`
	Phone       string   `json:"phone,omitempty"`
	LinkedinURL string   `json:"linkedin_url,omitempty"`
	Specialties []string `gorm:"type:text[]" json:"specialties,omitempty"`
	Status      string   `gorm:"default:'active'" json:"status"` // active, inactive
}

// Enrollment model
type Enrollment struct {
	BaseModel
	UserID     uuid.UUID `gorm:"not null" json:"user_id"`
	CourseID   uuid.UUID `gorm:"not null" json:"course_id"`
	EnrolledAt time.Time `gorm:"default:now()" json:"enrolled_at"`
	Progress   float32   `gorm:"default:0" json:"progress"` // 0.0 to 1.0
	
	// Relationships
	User   User   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Course Course `gorm:"foreignKey:CourseID" json:"course,omitempty"`
}

// BeforeCreate hooks for UUID generation
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

func (c *Course) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

func (l *Lesson) BeforeCreate(tx *gorm.DB) error {
	if l.ID == uuid.Nil {
		l.ID = uuid.New()
	}
	return nil
}

func (p *Post) BeforeCreate(tx *gorm.DB) error {
	if p.ID == uuid.Nil {
		p.ID = uuid.New()
	}
	return nil
}

func (m *Mentor) BeforeCreate(tx *gorm.DB) error {
	if m.ID == uuid.Nil {
		m.ID = uuid.New()
	}
	return nil
}

func (e *Enrollment) BeforeCreate(tx *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

// DTO structures for requests/responses
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type CreateUserRequest struct {
	Name     string   `json:"name" binding:"required"`
	Email    string   `json:"email" binding:"required,email"`
	Password string   `json:"password" binding:"required,min=6"`
	Bio      string   `json:"bio,omitempty"`
	RoleIDs  []uint   `json:"role_ids"`
}

type CreateCourseRequest struct {
	Title        string `json:"title" binding:"required"`
	Slug         string `json:"slug" binding:"required"`
	Description  string `json:"description,omitempty"`
	ThumbnailURL string `json:"thumbnail_url,omitempty"`
	Category     string `json:"category,omitempty"`
	Status       string `json:"status,omitempty"`
}

type CreatePostRequest struct {
	Title        string `json:"title" binding:"required"`
	Slug         string `json:"slug" binding:"required"`
	Content      string `json:"content,omitempty"`
	Excerpt      string `json:"excerpt,omitempty"`
	ThumbnailURL string `json:"thumbnail_url,omitempty"`
	Category     string `json:"category,omitempty"`
	Status       string `json:"status,omitempty"`
}

type CreateMentorRequest struct {
	Name        string   `json:"name" binding:"required"`
	Title       string   `json:"title,omitempty"`
	Bio         string   `json:"bio,omitempty"`
	AvatarURL   string   `json:"avatar_url,omitempty"`
	Email       string   `json:"email,omitempty"`
	Phone       string   `json:"phone,omitempty"`
	LinkedinURL string   `json:"linkedin_url,omitempty"`
	Specialties []string `json:"specialties,omitempty"`
	Status      string   `json:"status,omitempty"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	Total      int64       `json:"total"`
	Page       int         `json:"page"`
	Limit      int         `json:"limit"`
	TotalPages int         `json:"total_pages"`
}

type DashboardStats struct {
	TotalCourses     int64 `json:"total_courses"`
	TotalPosts       int64 `json:"total_posts"`
	TotalUsers       int64 `json:"total_users"`
	TotalEnrollments int64 `json:"total_enrollments"`
	PendingReviews   int64 `json:"pending_reviews"`
	Revenue          float64 `json:"revenue"`
}
