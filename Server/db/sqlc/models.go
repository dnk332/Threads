// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package db

import (
	"database/sql/driver"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

type MediaTypes string

const (
	MediaTypesImage MediaTypes = "image"
	MediaTypesVideo MediaTypes = "video"
	MediaTypesAudio MediaTypes = "audio"
)

func (e *MediaTypes) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = MediaTypes(s)
	case string:
		*e = MediaTypes(s)
	default:
		return fmt.Errorf("unsupported scan type for MediaTypes: %T", src)
	}
	return nil
}

type NullMediaTypes struct {
	MediaTypes MediaTypes `json:"media_types"`
	Valid      bool       `json:"valid"` // Valid is true if MediaTypes is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullMediaTypes) Scan(value interface{}) error {
	if value == nil {
		ns.MediaTypes, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.MediaTypes.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullMediaTypes) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.MediaTypes), nil
}

type Following struct {
	ID          int64 `json:"id"`
	FollowingID int64 `json:"following_id"`
	FollowerID  int64 `json:"follower_id"`
}

type Like struct {
	ID        int64     `json:"id"`
	PostID    int64     `json:"post_id"`
	AuthorID  int64     `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
}

type Media struct {
	ID             int64       `json:"id"`
	Content        string      `json:"content"`
	Type           MediaTypes  `json:"type"`
	OrderColumn    int32       `json:"order_column"`
	CreatedAt      time.Time   `json:"created_at"`
	PostID         pgtype.Int8 `json:"post_id"`
	UserProfilesID pgtype.Int8 `json:"user_profiles_id"`
}

type Post struct {
	ID          int64     `json:"id"`
	AuthorID    int64     `json:"author_id"`
	TextContent string    `json:"text_content"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Reply struct {
	ID          int64 `json:"id"`
	RootPostID  int64 `json:"root_post_id"`
	ReplyPostID int64 `json:"reply_post_id"`
	AuthorID    int64 `json:"author_id"`
}

type Repost struct {
	ID         int64 `json:"id"`
	RootPostID int64 `json:"root_post_id"`
	RepostsID  int64 `json:"reposts_id"`
}

type User struct {
	ID                int64     `json:"id"`
	Username          string    `json:"username"`
	HashedPassword    string    `json:"hashed_password"`
	CreatedAt         time.Time `json:"created_at"`
	PasswordChangedAt time.Time `json:"password_changed_at"`
	IsFrozen          bool      `json:"is_frozen"`
}

type UserProfile struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Bio       string    `json:"bio"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
