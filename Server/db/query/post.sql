-- Create a post
-- name: CreatePost :one
INSERT INTO Posts (author_id, text_content)
VALUES ($1, $2) RETURNING *;
-- Update a post
-- name: UpdatePost :one
UPDATE Posts
SET text_content = $2,
    updated_at = now()
WHERE id = $1
RETURNING *;
-- Get a post by ID
-- name: GetPostById :one
SELECT *
FROM Posts
WHERE id = $1;
-- Get a list of all posts of one user
-- name: GetListPostByAuthor :many
SELECT *
FROM Posts
WHERE author_id = $1
ORDER BY created_at LIMIT $2
OFFSET $3;
-- Get a list of all posts
-- name: GetListAllPost :many
SELECT *
FROM Posts
ORDER BY created_at DESC
LIMIT $1
OFFSET $2;
-- Delete a post by ID
-- name: DeletePost :exec
DELETE
FROM Posts
WHERE id = $1;
-- Search posts by text content
-- name: SearchPostByTextContent :many
SELECT *
FROM Posts
WHERE text_content ILIKE $1
ORDER BY updated_at DESC
LIMIT $2
OFFSET $3;