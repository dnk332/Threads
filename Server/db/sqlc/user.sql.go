// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: user.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
INSERT INTO Users (username, hashed_password)
VALUES ($1, $2) RETURNING id, username, hashed_password, created_at, password_changed_at, is_frozen
`

type CreateUserParams struct {
	Username       string `json:"username"`
	HashedPassword string `json:"hashed_password"`
}

// Create a new user
func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser, arg.Username, arg.HashedPassword)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.CreatedAt,
		&i.PasswordChangedAt,
		&i.IsFrozen,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE
FROM Users
WHERE id = $1
`

// Delete a user by ID
func (q *Queries) DeleteUser(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteUser, id)
	return err
}

const getListUser = `-- name: GetListUser :many
SELECT id, username, hashed_password, created_at, password_changed_at, is_frozen
FROM Users
ORDER BY created_at LIMIT $1
OFFSET $2
`

type GetListUserParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

// Get a list of all users
func (q *Queries) GetListUser(ctx context.Context, arg GetListUserParams) ([]User, error) {
	rows, err := q.db.Query(ctx, getListUser, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.HashedPassword,
			&i.CreatedAt,
			&i.PasswordChangedAt,
			&i.IsFrozen,
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

const getUserById = `-- name: GetUserById :one
SELECT id, username, hashed_password, created_at, password_changed_at, is_frozen
FROM Users
WHERE id = $1
`

// Get a user by ID
func (q *Queries) GetUserById(ctx context.Context, id int64) (User, error) {
	row := q.db.QueryRow(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.CreatedAt,
		&i.PasswordChangedAt,
		&i.IsFrozen,
	)
	return i, err
}

const getUserByName = `-- name: GetUserByName :one
SELECT id, username, hashed_password, created_at, password_changed_at, is_frozen
FROM Users
WHERE username = $1
`

// Get a user by name
func (q *Queries) GetUserByName(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByName, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.CreatedAt,
		&i.PasswordChangedAt,
		&i.IsFrozen,
	)
	return i, err
}

const getUserForUpdate = `-- name: GetUserForUpdate :one
SELECT id, username, hashed_password, created_at, password_changed_at, is_frozen
FROM Users
WHERE id = $1 LIMIT 1 FOR NO KEY
UPDATE
`

// Get a user by ID for update
func (q *Queries) GetUserForUpdate(ctx context.Context, id int64) (User, error) {
	row := q.db.QueryRow(ctx, getUserForUpdate, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.CreatedAt,
		&i.PasswordChangedAt,
		&i.IsFrozen,
	)
	return i, err
}

const searchUserByUsername = `-- name: SearchUserByUsername :many
SELECT id, username, hashed_password, created_at, password_changed_at, is_frozen
FROM Users
WHERE username ILIKE $1 
ORDER BY created_at DESC
LIMIT $2
OFFSET $3
`

type SearchUserByUsernameParams struct {
	Username string `json:"username"`
	Limit    int32  `json:"limit"`
	Offset   int32  `json:"offset"`
}

// Search user by username
func (q *Queries) SearchUserByUsername(ctx context.Context, arg SearchUserByUsernameParams) ([]User, error) {
	rows, err := q.db.Query(ctx, searchUserByUsername, arg.Username, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.HashedPassword,
			&i.CreatedAt,
			&i.PasswordChangedAt,
			&i.IsFrozen,
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

const updateUser = `-- name: UpdateUser :one
UPDATE Users
SET username        = COALESCE($2, username),
    hashed_password = COALESCE($3, hashed_password),
    is_frozen       = COALESCE($4, is_frozen)
WHERE id = $1 RETURNING id, username, hashed_password, created_at, password_changed_at, is_frozen
`

type UpdateUserParams struct {
	ID             int64       `json:"id"`
	Username       pgtype.Text `json:"username"`
	HashedPassword pgtype.Text `json:"hashed_password"`
	IsFrozen       pgtype.Bool `json:"is_frozen"`
}

// Update a user's information
func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, updateUser,
		arg.ID,
		arg.Username,
		arg.HashedPassword,
		arg.IsFrozen,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.CreatedAt,
		&i.PasswordChangedAt,
		&i.IsFrozen,
	)
	return i, err
}
