package main

import (
	"log"
	"net/http"
	"time"

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
	_ = godotenv.Load()

	cfg := config.Load()

	db, err := database.Initialize(cfg.SupabaseURL)
	if err != nil {
		log.Fatal("Database connection failed: ", err)
	}

	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Dùng gin.New() để tránh logger mặc định; chỉ Recovery
	r := gin.New()
	r.Use(gin.Recovery())

	// Set trusted proxies for security (fix the warning)
	r.SetTrustedProxies([]string{"127.0.0.1", "::1", "localhost"})

	// Log lỗi ngắn gọn cho responses >= 400
	r.Use(func(c *gin.Context) {
		start := time.Now()
		c.Next()
		if status := c.Writer.Status(); status >= 400 {
			if len(c.Errors) > 0 {
				log.Printf("HTTP %d %s %s (%s) - %v",
					status, c.Request.Method, c.Request.URL.Path, time.Since(start), c.Errors)
			} else {
				log.Printf("HTTP %d %s %s (%s)",
					status, c.Request.Method, c.Request.URL.Path, time.Since(start))
			}
		}
	})

	// CORS: KHÔNG tự set header, KHÔNG tạo OPTIONS route thủ công
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{
		cfg.AdminURL,
		cfg.FrontendURL,
		"http://localhost:3000",
		"http://127.0.0.1:3000",
	}
	corsConfig.AllowCredentials = true
	corsConfig.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}
	r.Use(cors.New(corsConfig))

	// Handlers
	authHandler := handlers.NewAuthHandler(db)
	userHandler := handlers.NewUserHandler(db)
	courseHandler := handlers.NewCourseHandler(db)
	postHandler := handlers.NewPostHandler(db)
	mentorHandler := handlers.NewMentorHandler(db)
	uploadHandler := handlers.NewUploadHandler(cfg)
	dashboardHandler := handlers.NewDashboardHandler(db)
	programHandler := handlers.NewProgramHandler(db)
	projectHandler := handlers.NewProjectHandler(db)
	allBlogPostHandler := handlers.NewAllBlogPostHandler(db)

	// -------- API v1 (cần auth) --------
	v1 := r.Group("/api/v1")
	{
		dashboard := v1.Group("/dashboard")
		dashboard.Use(middleware.RequireAuth())
		{
			dashboard.GET("/stats", middleware.RequireRole("admin", "editor"), dashboardHandler.GetStats)
		}

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

		mentors := v1.Group("/mentors")
		mentors.Use(middleware.RequireAuth())
		{
			mentors.GET("", mentorHandler.GetMentors)
			mentors.POST("", middleware.RequireRole("admin", "editor"), mentorHandler.CreateMentor)
			mentors.GET("/:id", mentorHandler.GetMentor)
			mentors.PUT("/:id", middleware.RequireRole("admin", "editor"), mentorHandler.UpdateMentor)
			mentors.DELETE("/:id", middleware.RequireRole("admin", "editor"), mentorHandler.DeleteMentor)
		}

		users := v1.Group("/users")
		users.Use(middleware.RequireAuth())
		{
			users.GET("", userHandler.GetUsers)
			users.GET("/:id", userHandler.GetUser)
			users.PUT("/:id", middleware.RequireRole("admin"), userHandler.UpdateUser)
			users.DELETE("/:id", middleware.RequireRole("admin"), userHandler.DeleteUser)
		}

		upload := v1.Group("/upload")
		upload.Use(middleware.RequireAuth())
		{
			upload.POST("", uploadHandler.UploadFile)
		}

		projects := v1.Group("/projects")
		projects.Use(middleware.RequireAuth())
		{
			projects.GET("", projectHandler.GetProjects)
			projects.POST("", middleware.RequireRole("admin", "editor"), projectHandler.CreateProject)
			projects.GET("/:id", projectHandler.GetProjectByID)
			projects.PUT("/:id", middleware.RequireRole("admin", "editor"), projectHandler.UpdateProject)
			projects.DELETE("/:id", middleware.RequireRole("admin", "editor"), projectHandler.DeleteProject)
		}
	}

	// -------- API (public + auth) --------
	api := r.Group("/api")
	{
		allblogposts := api.Group("/allblogposts")
		{
			allblogposts.GET("", allBlogPostHandler.GetAllBlogPosts)
			allblogposts.GET("/:id", allBlogPostHandler.GetBlogPostByID)
			allblogposts.GET("/slug/:slug", allBlogPostHandler.GetBlogPostBySlug)
		}

		projects := api.Group("/projects")
		{
			projects.GET("", projectHandler.GetProjects)
			projects.GET("/:id", projectHandler.GetProjectByID)
			projects.GET("/slug/:slug", projectHandler.GetProjectBySlug)
		}

		programs := api.Group("/programs")
		{
			programs.GET("", programHandler.GetPrograms)
			programs.GET("/:id", programHandler.GetProgramByID)
		}

		auth := api.Group("/auth")
		{
			auth.POST("/register", userHandler.RegisterUser)
			auth.POST("/login", authHandler.Login)
			auth.POST("/logout", middleware.RequireAuth(), authHandler.Logout)
			auth.GET("/profile", middleware.RequireAuth(), authHandler.GetProfile)

			auth.GET("/test", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{
					"success": true,
					"message": "Auth routes OK",
					"path":    c.Request.URL.Path,
					"method":  c.Request.Method,
				})
			})
		}
	}

	// Ping / Health / Docs
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
			"status":  "ok",
			"time":    time.Now(),
		})
	})
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "MSC Backend API",
		})
	})
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Start
	port := cfg.Port
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running at http://localhost:%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}
