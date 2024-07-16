-- Set user avatar
-- name: SetUserAvatar :one
INSERT INTO Medias (link, type, reference_object, reference_object_id)
VALUES ($1, 'image', 'user_profile', $2) RETURNING *;

-- Set user avatar
-- name: AddPostImage :one
INSERT INTO Medias (link, type, reference_object, reference_object_id)
VALUES ($1, 'image', 'post', $2) RETURNING *;

-- Get image
-- name: GetImage :one
SELECT *
FROM Medias
WHERE reference_object = $1
  AND reference_object_id = $2
  AND type = 'image';