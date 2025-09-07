package config

import (
	"os"
)

type Config struct {
	SupabaseURL      string
	SupabaseAnonKey  string
	JWTSecret        string
	Environment      string
	AdminURL         string
	FrontendURL      string
	CloudinaryName   string
	CloudinaryKey    string
	CloudinarySecret string
	Port             string
}

func Load() *Config {
	return &Config{
		SupabaseURL:      getEnv("SUPABASE_URL", ""),
		SupabaseAnonKey:  getEnv("SUPABASE_ANON_KEY", ""),
		JWTSecret:        getEnv("JWT_SECRET", "your-super-secret-jwt-key-change-this-in-production"),
		Environment:      getEnv("ENVIRONMENT", "development"),
		AdminURL:         getEnv("ADMIN_URL", "http://localhost:3001"),
		FrontendURL:      getEnv("FRONTEND_URL", "http://localhost:3000"),
		CloudinaryName:   getEnv("CLOUDINARY_NAME", ""),
		CloudinaryKey:    getEnv("CLOUDINARY_KEY", ""),
		CloudinarySecret: getEnv("CLOUDINARY_SECRET", ""),
		Port:             getEnv("PORT", "8080"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
