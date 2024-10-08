// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: user_profile.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUserProfile = `-- name: CreateUserProfile :one
INSERT INTO User_Profiles (user_id, name, email, bio)
VALUES ($1, $2, $3, $4) RETURNING id, user_id, name, email, bio, created_at, updated_at
`

type CreateUserProfileParams struct {
	UserID int64  `json:"user_id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Bio    string `json:"bio"`
}

// Create a new user profile
func (q *Queries) CreateUserProfile(ctx context.Context, arg CreateUserProfileParams) (UserProfile, error) {
	row := q.db.QueryRow(ctx, createUserProfile,
		arg.UserID,
		arg.Name,
		arg.Email,
		arg.Bio,
	)
	var i UserProfile
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Name,
		&i.Email,
		&i.Bio,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteUserProfile = `-- name: DeleteUserProfile :exec
DELETE
FROM User_Profiles
WHERE user_id = $1
`

// Delete a user profile by ID
func (q *Queries) DeleteUserProfile(ctx context.Context, userID int64) error {
	_, err := q.db.Exec(ctx, deleteUserProfile, userID)
	return err
}

const getAllUserProfiles = `-- name: GetAllUserProfiles :many
SELECT id, user_id, name, email, bio, created_at, updated_at
FROM User_Profiles
WHERE user_id != $3
ORDER BY name LIMIT $1
OFFSET $2
`

type GetAllUserProfilesParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
	UserID int64 `json:"user_id"`
}

// Get all user profiles
func (q *Queries) GetAllUserProfiles(ctx context.Context, arg GetAllUserProfilesParams) ([]UserProfile, error) {
	rows, err := q.db.Query(ctx, getAllUserProfiles, arg.Limit, arg.Offset, arg.UserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []UserProfile{}
	for rows.Next() {
		var i UserProfile
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Name,
			&i.Email,
			&i.Bio,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserProfileById = `-- name: GetUserProfileById :one
SELECT id, user_id, name, email, bio, created_at, updated_at
FROM User_Profiles
WHERE user_id = $1
`

// Get a user profile by ID
func (q *Queries) GetUserProfileById(ctx context.Context, userID int64) (UserProfile, error) {
	row := q.db.QueryRow(ctx, getUserProfileById, userID)
	var i UserProfile
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Name,
		&i.Email,
		&i.Bio,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const updateUserProfile = `-- name: UpdateUserProfile :one
UPDATE User_Profiles
SET name = COALESCE($2, name),
    bio  = COALESCE($3, bio)
WHERE id = $1 RETURNING id, user_id, name, email, bio, created_at, updated_at
`

type UpdateUserProfileParams struct {
	ID   int64       `json:"id"`
	Name pgtype.Text `json:"name"`
	Bio  pgtype.Text `json:"bio"`
}

// Update a user's profile
func (q *Queries) UpdateUserProfile(ctx context.Context, arg UpdateUserProfileParams) (UserProfile, error) {
	row := q.db.QueryRow(ctx, updateUserProfile, arg.ID, arg.Name, arg.Bio)
	var i UserProfile
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Name,
		&i.Email,
		&i.Bio,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
