-- Create a new user profile
-- name: CreateUserProfile :one
INSERT INTO User_Profiles (user_id, name, email, bio)
VALUES ($1, $2, $3, $4) RETURNING *;
-- Update a user's profile
-- name: UpdateUserProfile :one
UPDATE User_Profiles
SET name = COALESCE(sqlc.narg(name), name),
    bio  = COALESCE(sqlc.narg(bio), bio)
WHERE id = $1 RETURNING *;
-- Get a user profile by ID
-- name: GetUserProfileById :one
SELECT *
FROM User_Profiles
WHERE user_id = $1;
-- Delete a user profile by ID
-- name: DeleteUserProfile :exec
DELETE
FROM User_Profiles
WHERE user_id = $1;
-- Get all user profiles
-- name: GetAllUserProfiles :many
SELECT *
FROM User_Profiles
WHERE user_id != $3
ORDER BY name LIMIT $1
OFFSET $2;