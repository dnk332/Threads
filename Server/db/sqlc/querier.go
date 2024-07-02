// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package db

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	// Create a post
	CreatePost(ctx context.Context, arg CreatePostParams) (Post, error)
	// Create a new session
	CreateSession(ctx context.Context, arg CreateSessionParams) (Session, error)
	// Create a new user
	CreateUser(ctx context.Context, arg CreateUserParams) (User, error)
	// Create a new user profile
	CreateUserProfile(ctx context.Context, arg CreateUserProfileParams) (UserProfile, error)
	// Delete a post by ID
	DeletePost(ctx context.Context, id int64) error
	// Get a session by user ID
	DeleteSession(ctx context.Context, id uuid.UUID) error
	// Delete a user by ID
	DeleteUser(ctx context.Context, id int64) error
	// Delete a user profile by ID
	DeleteUserProfile(ctx context.Context, userID int64) error
	// Get a list of all posts
	GetListAllPost(ctx context.Context, arg GetListAllPostParams) ([]Post, error)
	// Get a list of all posts of one user
	GetListPostByAuthor(ctx context.Context, arg GetListPostByAuthorParams) ([]Post, error)
	// Get a list of all users
	GetListUser(ctx context.Context, arg GetListUserParams) ([]User, error)
	// Get a post by ID
	GetPostById(ctx context.Context, id int64) (Post, error)
	// Get a session
	GetSession(ctx context.Context, id uuid.UUID) (Session, error)
	// Get a session by user ID
	GetSessionByUserID(ctx context.Context, userID int64) (Session, error)
	// Get a user by ID
	GetUserById(ctx context.Context, id int64) (User, error)
	// Get a user by name
	GetUserByName(ctx context.Context, username string) (User, error)
	// Get a user by ID for update
	GetUserForUpdate(ctx context.Context, id int64) (User, error)
	// Get a user profile by ID
	GetUserProfileById(ctx context.Context, userID int64) (UserProfile, error)
	// Update a post
	UpdatePost(ctx context.Context, arg UpdatePostParams) (Post, error)
	// Update a user's information
	UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error)
	// Update a user's profile
	UpdateUserProfile(ctx context.Context, arg UpdateUserProfileParams) (UserProfile, error)
}

var _ Querier = (*Queries)(nil)
