-- Create a new session
-- name: CreateSession :one
INSERT INTO Sessions (
  id,
  user_id,
  refresh_token,
  user_agent,
  client_ip,
  is_blocked,
  expires_at
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
) RETURNING *;
-- Get a session
-- name: GetSession :one
SELECT * FROM Sessions
WHERE id = $1 LIMIT 1;
-- Get a session by user ID
-- name: DeleteSession :exec
DELETE FROM Sessions
WHERE id = $1;
-- Get a session by user ID
-- name: GetSessionByUserID :one
SELECT * FROM Sessions
WHERE user_id = $1 LIMIT 1;