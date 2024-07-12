package api

import (
	"fmt"

	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/token"
	"github.com/briandnk/Threads/utils"
	"github.com/gin-gonic/gin"
)

// Server serves HTTP requests for our threads service.
type Server struct {
	config     utils.Config
	store      db.Store
	tokenMaker token.Maker
	router     *gin.Engine
}

// NewServer creates a new HTTP server and set up routing.
func NewServer(config utils.Config, store db.Store) (*Server, error) {
	tokenMaker, err := token.NewPasetoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}
	server := &Server{
		config:     config,
		store:      store,
		tokenMaker: tokenMaker,
	}

	server.setupRouter()
	return server, nil
}

func (s *Server) setupRouter() {
	router := gin.Default()

	// Routes that do not require authentication
	router.POST("/users", s.createUser)
	router.POST("/users/login", s.loginUser)
	router.GET("/users/:id", s.getUser)
	router.POST("/tokens/verify", s.VerifyToken)
	router.POST("/tokens/refresh", s.refreshAccessToken)

	// Routes that require authentication
	authRoutes := router.Group("/").Use(authMiddleware(s.tokenMaker))
	{
		authRoutes.POST("/user-profiles", s.createUserProfile)
		authRoutes.GET("/user-profiles/:user_id", s.getUserProfile)
		authRoutes.GET("/users/logout", s.logoutUser)

		authRoutes.POST("/posts", s.createPost)
		authRoutes.GET("/posts", s.getListAllPost)

		authRoutes.POST("/posts/like", s.likePost)
		authRoutes.POST("/posts/unlike", s.unlikePost)

		authRoutes.POST("/uploads", s.uploadImage)
	}

	s.router = router
}

// Start runs the HTTP server on a specific address.
func (s *Server) Start(address string) error {
	return s.router.Run(address)
}
