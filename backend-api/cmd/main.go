package main

import (
	"log"
	"os"

	"msc-backend-api/internal/handlers"
	"msc-backend-api/internal/middleware"
	"msc-backend-api/pkg/config"
	"msc-backend-api/pkg/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title MSC.EDU.VN Admin API
// @version 1.0
// @description Backend API cho hệ thống quản trị MSC.EDU.VN
// @termsOfService http://swagger.io/terms/

// @contact.name MSC.EDU.VN API Support
// @contact.url http://www.msc.edu.vn/support
// @contact.email support@msc.edu.vn

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize configuration
	cfg := config.Load()

	// Initialize database
	db, err := database.Initialize(cfg.DatabaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Set Gin mode
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize Gin router
	r := gin.Default()

	// CORS middleware
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{
		"http://localhost:3001", // Admin Panel
		"http://localhost:3000", // Frontend
		cfg.AdminURL,
		cfg.FrontendURL,
	}
	corsConfig.AllowCredentials = true
	corsConfig.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(corsConfig))

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(db)
	courseHandler := handlers.NewCourseHandler(db)
	postHandler := handlers.NewPostHandler(db)
	mentorHandler := handlers.NewMentorHandler(db)
	userHandler := handlers.NewUserHandler(db)
	uploadHandler := handlers.NewUploadHandler(cfg)
	dashboardHandler := handlers.NewDashboardHandler(db)

	// API v1 routes
	v1 := r.Group("/api/v1")
	{
		// Authentication routes
		auth := v1.Group("/auth")
		{
			auth.POST("/login", authHandler.Login)
			auth.GET("/profile", middleware.RequireAuth(), authHandler.GetProfile)
		}

		// Dashboard routes
		dashboard := v1.Group("/dashboard")
		dashboard.Use(middleware.RequireAuth())
		{
			dashboard.GET("/stats", middleware.RequireRole("admin", "editor"), dashboardHandler.GetStats)
		}

		// Course routes
		courses := v1.Group("/courses")
		courses.Use(middleware.RequireAuth())
		{
			courses.GET("", courseHandler.GetCourses)
			courses.POST("", middleware.RequireRole("admin", "editor", "partner"), courseHandler.CreateCourse)
			courses.GET("/:id", courseHandler.GetCourse)
			courses.PUT("/:id", middleware.RequireRole("admin", "editor", "partner"), courseHandler.UpdateCourse)
			courses.DELETE("/:id", middleware.RequireRole("admin", "editor"), courseHandler.DeleteCourse)
			courses.PATCH("/:id/approve", middleware.RequireRole("admin", "editor"), courseHandler.ApproveCourse)
			courses.PATCH("/:id/reject", middleware.RequireRole("admin", "editor"), courseHandler.RejectCourse)
		}

		// Post routes
		posts := v1.Group("/posts")
		posts.Use(middleware.RequireAuth())
		{
			posts.GET("", postHandler.GetPosts)
			posts.POST("", middleware.RequireRole("admin", "editor", "partner"), postHandler.CreatePost)
			posts.GET("/:id", postHandler.GetPost)
			posts.PUT("/:id", middleware.RequireRole("admin", "editor", "partner"), postHandler.UpdatePost)
			posts.DELETE("/:id", middleware.RequireRole("admin", "editor"), postHandler.DeletePost)
			posts.PATCH("/:id/approve", middleware.RequireRole("admin", "editor"), postHandler.ApprovePost)
			posts.PATCH("/:id/reject", middleware.RequireRole("admin", "editor"), postHandler.RejectPost)
		}

		// Mentor routes
		mentors := v1.Group("/mentors")
		mentors.Use(middleware.RequireAuth())
		{
			mentors.GET("", mentorHandler.GetMentors)
			mentors.POST("", middleware.RequireRole("admin", "editor"), mentorHandler.CreateMentor)
			mentors.GET("/:id", mentorHandler.GetMentor)
			mentors.PUT("/:id", middleware.RequireRole("admin", "editor"), mentorHandler.UpdateMentor)
			mentors.DELETE("/:id", middleware.RequireRole("admin", "editor"), mentorHandler.DeleteMentor)
		}

		// User routes
		users := v1.Group("/users")
		users.Use(middleware.RequireAuth())
		{
			users.GET("", userHandler.GetUsers)
			users.GET("/:id", userHandler.GetUser)
			users.PUT("/:id", middleware.RequireRole("admin"), userHandler.UpdateUser)
			users.DELETE("/:id", middleware.RequireRole("admin"), userHandler.DeleteUser)
		}

		// Upload routes
		upload := v1.Group("/upload")
		upload.Use(middleware.RequireAuth())
		{
			upload.POST("", uploadHandler.UploadFile)
		}
	}

	// Swagger documentation
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "healthy",
			"service": "MSC Backend API",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(r.Run(":" + port))
}
