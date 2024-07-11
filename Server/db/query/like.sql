-- Like a post
-- name: LikePost :one
INSERT INTO Likes (post_id, author_id)
VALUES ($1, $2) RETURNING *;
-- Unlike a post
-- name: UnlikePost :exec
DELETE
FROM Likes
WHERE post_id = $1
  AND author_id = $2;
-- Count like of post
-- name: CountLikeOfPost :one
SELECT COUNT(*) AS like_count
FROM Likes
WHERE post_id = $1;
-- Get all likes of post
-- name: GetAllLikesOfPost :many
SELECT *
FROM Likes
WHERE post_id = $1
ORDER BY created_at DESC LIMIT $2
OFFSET $3;
-- Get all likes of user
-- name: GetAllLikesOfUser :many
SELECT *
FROM Likes
WHERE author_id = $1
ORDER BY created_at DESC LIMIT $2
OFFSET $3;
-- Check like status of user
-- name: CheckLikeStatusOfUser :one
SELECT EXISTS (SELECT 1
               FROM Likes
               WHERE post_id = $1
                 AND author_id = $2) AS has_liked;