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

	router.POST("/auth/register", server.createUser)
	router.POST("/auth/login", server.loginUser)
	router.GET("/users/:id", server.getUser)
	router.POST("/tokens/renew_access", server.renewAccessToken)
	router.POST("/tokens/verify", server.VerifyToken)

	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
	authRoutes.POST("/user-profiles", server.createUserProfile)

	server.router = router
}

// Start runs the HTTP server on a specific address.
func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
