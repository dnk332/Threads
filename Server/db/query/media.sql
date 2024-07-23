-- Set user avatar
-- name: SetUserAvatar :one
INSERT INTO Medias (link, type, reference_object, reference_object_id)
VALUES ($1, 'image', 'user_profile', $2) RETURNING *;

-- Set user avatar
-- name: AddPostImage :one
INSERT INTO Medias (link, type, order_column, reference_object, reference_object_id)
VALUES ($1, 'image', $2, 'post', $3) RETURNING *;

-- Get image
-- name: GetImage :one
SELECT *
FROM Medias
WHERE reference_object = $1
  AND reference_object_id = $2
  AND type = 'image';

-- Get image
-- name: GetImagesForPost :many
SELECT *
FROM Medias
WHERE reference_object = 'post'
  AND reference_object_id = $1
  AND type = 'image'
ORDER BY order_column;