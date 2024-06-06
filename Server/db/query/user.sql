-- Create a new user
-- name: CreateUser :one
INSERT INTO Users (username, hashed_password)
VALUES ($1, $2) RETURNING *;
-- Get a user by ID for update
-- name: GetUserForUpdate :one
SELECT *
FROM Users
WHERE id = $1 LIMIT 1 FOR NO KEY
UPDATE;
-- Update a user's information
-- name: UpdateUser :one
UPDATE Users
SET username        = COALESCE(sqlc.narg(username), username),
    hashed_password = COALESCE(sqlc.narg(hashed_password), hashed_password),
    is_frozen       = COALESCE(sqlc.narg(is_frozen), is_frozen)
WHERE id = $1 RETURNING *;
-- Get a user by ID
-- name: GetUserById :one
SELECT *
FROM Users
WHERE id = $1;
-- Get a list of all users
-- name: GetListUser :many
SELECT *
FROM Users
ORDER BY created_at LIMIT $1
OFFSET $2;
-- Delete a user by ID
-- name: DeleteUser :exec
DELETE
FROM Users
WHERE id = $1;
-- Get a user by name
-- name: GetUserByName :one
SELECT *
FROM Users
WHERE username = $1;