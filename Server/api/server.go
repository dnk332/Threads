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

func (server *Server) setupRouter() {
	router := gin.Default()

	// Routes that do not require authentication
	router.POST("/users", server.createUser)
	router.POST("/users/login", server.loginUser)
	router.GET("/users/:id", server.getUser)
	router.POST("/tokens/verify", server.VerifyToken)
	router.POST("/tokens/refresh", server.refreshAccessToken)

	// Routes that require authentication
	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
	{
		authRoutes.POST("/user-profiles", server.createUserProfile)
		authRoutes.GET("/user-profiles/:user_id", server.getUserProfile)
		authRoutes.GET("/users/logout", server.logoutUser)
	}

	server.router = router
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
