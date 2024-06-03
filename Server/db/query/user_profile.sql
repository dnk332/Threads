-- Create a new user profile
-- name: CreateUserProfile :one
INSERT INTO User_Profiles (user_id, name, email, bio)
VALUES ($1, $2, $3, $4)
RETURNING *;
-- Update a user's profile
-- name: UpdateUserProfile :one
UPDATE User_Profiles
SET name = $2,
    bio = $3
WHERE id = $1
RETURNING *;
-- Get a user profile by ID
-- name: GetUserProfileById :one
SELECT *
FROM User_Profiles
WHERE id = $1;
-- Delete a user profile by ID
-- name: DeleteUserProfile :exec
DELETE FROM User_Profiles
WHERE id = $1;