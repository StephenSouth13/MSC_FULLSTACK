package config

import (
	"os"
)

type Config struct {
	DatabaseURL  string
	JWTSecret    string
	Environment  string
	AdminURL     string
	FrontendURL  string
	CloudinaryName string
	CloudinaryKey  string
	CloudinarySecret string
	AWSRegion    string
	AWSAccessKey string
	AWSSecretKey string
	S3Bucket     string
}

func Load() *Config {
	return &Config{
		DatabaseURL:      getEnv("DATABASE_URL", "postgres://neondb_owner:npg_XWJSp9UqfYH1@ep-billowing-bar-a1vp34jh-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"),
		JWTSecret:        getEnv("JWT_SECRET", "your-super-secret-jwt-key-change-this-in-production"),
		Environment:      getEnv("ENVIRONMENT", "development"),
		AdminURL:         getEnv("ADMIN_URL", "http://localhost:3001"),
		FrontendURL:      getEnv("FRONTEND_URL", "http://localhost:3000"),
		CloudinaryName:   getEnv("CLOUDINARY_NAME", ""),
		CloudinaryKey:    getEnv("CLOUDINARY_KEY", ""),
		CloudinarySecret: getEnv("CLOUDINARY_SECRET", ""),
		AWSRegion:        getEnv("AWS_REGION", "ap-southeast-1"),
		AWSAccessKey:     getEnv("AWS_ACCESS_KEY", ""),
		AWSSecretKey:     getEnv("AWS_SECRET_KEY", ""),
		S3Bucket:         getEnv("S3_BUCKET", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
