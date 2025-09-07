package database

import (
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"msc-backend-api/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Initialize(supabaseURL string) (*gorm.DB, error) {
	if supabaseURL == "" {
		log.Fatal("SUPABASE_URL environment variable is required")
	}

	// Connect to database with prepared statements disabled
	db, err := gorm.Open(
		postgres.New(postgres.Config{
			DSN:                  supabaseURL,
			PreferSimpleProtocol: true, // Disable prepared statements at driver level
		}),
		&gorm.Config{
			Logger:                                   logger.Default.LogMode(logger.Silent), // Reduce noise
			PrepareStmt:                              false,                                 // Disable prepared statements
			DisableForeignKeyConstraintWhenMigrating: true,
		},
	)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Configure connection pool for stability
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}

	// Conservative connection settings
	sqlDB.SetMaxIdleConns(0)                  // No idle connections to avoid statement caching
	sqlDB.SetMaxOpenConns(10)                 // Limited connections
	sqlDB.SetConnMaxLifetime(5 * time.Minute) // 5 minutes

	// Test connection
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Auto-migrate tables with error handling
	models := []interface{}{
		&models.Role{},
		&models.User{},
		&models.Course{},
		&models.Post{},
		&models.Mentor{},
		&models.Program{}, // Add Program model
		&models.Project{}, // Add Project model
	}

	for _, model := range models {
		if err := db.AutoMigrate(model); err != nil {
			// Check if error is about existing table/constraint or non-existent constraint
			errorMsg := err.Error()
			if strings.Contains(errorMsg, "already exists") ||
				strings.Contains(errorMsg, "does not exist") {
				log.Printf("Migration note for %T: %s (continuing...)", model, errorMsg)
				continue
			}
			return nil, fmt.Errorf("failed to migrate %T: %w", model, err)
		}
	}

	// Initialize default roles if they don't exist
	if err := initializeDefaultRoles(db); err != nil {
		return nil, fmt.Errorf("failed to initialize default roles: %w", err)
	}

	log.Println("✅ Database connection established and migrated successfully")
	return db, nil
}

// GetFreshSession returns a database session optimized for simple queries
func GetFreshSession(db *gorm.DB) *gorm.DB {
	// Clear any existing prepared statements
	if sqlDB, err := db.DB(); err == nil {
		sqlDB.Exec("DEALLOCATE ALL")
	}

	return db.Session(&gorm.Session{
		PrepareStmt:            false, // Explicitly disable prepared statements
		SkipDefaultTransaction: true,  // Skip transactions for read operations
		SkipHooks:              false,
		QueryFields:            true, // Be explicit about fields
	})
}

func initializeDefaultRoles(db *gorm.DB) error {
	roles := []models.Role{
		{Name: "admin"},
		{Name: "editor"},
		{Name: "partner"},
		{Name: "user"},
	}

	for _, role := range roles {
		var existingRole models.Role
		if err := db.Where("name = ?", role.Name).First(&existingRole).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				// Role doesn't exist, create it
				if err := db.Create(&role).Error; err != nil {
					log.Printf("Failed to create role %s: %v", role.Name, err)
					continue
				}
				log.Printf("Created role: %s", role.Name)
			} else {
				log.Printf("Error checking role %s: %v", role.Name, err)
				continue
			}
		}
	}

	return nil
}
