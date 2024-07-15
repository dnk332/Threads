-- Set user avatar
-- name: SetUserAvatar :one
INSERT INTO Medias (content, type, object_type, object_id)
VALUES ($1, 'image', 'user_profile', $2) RETURNING *;

-- Set user avatar
-- name: AddPostImage :one
INSERT INTO Medias (content, type, object_type, object_id)
VALUES ($1, 'image', 'post', $2) RETURNING *;

-- Get image
-- name: GetImage :one
SELECT *
FROM Medias
WHERE object_type = $1
  AND object_id = $2
  AND type = 'image';