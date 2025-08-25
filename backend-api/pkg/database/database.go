package database

import (
	"log"

	"msc-backend-api/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Initialize(databaseURL string) (*gorm.DB, error) {
	// Configure GORM logger
	logLevel := logger.Info
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	// Connect to database
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})
	if err != nil {
		return nil, err
	}

	// Auto migrate models
	err = db.AutoMigrate(
		&models.Role{},
		&models.User{},
		&models.Course{},
		&models.Lesson{},
		&models.Post{},
		&models.Mentor{},
		&models.Enrollment{},
	)
	if err != nil {
		return nil, err
	}

	// Seed default roles if they don't exist
	seedRoles(db)

	log.Println("Database connection established and migrated successfully")
	return db, nil
}

func seedRoles(db *gorm.DB) {
	roles := []models.Role{
		{Name: "admin"},
		{Name: "editor"},
		{Name: "partner"},
		{Name: "user"},
	}

	for _, role := range roles {
		var existingRole models.Role
		if err := db.Where("name = ?", role.Name).First(&existingRole).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				db.Create(&role)
				log.Printf("Created role: %s", role.Name)
			}
		}
	}
}
