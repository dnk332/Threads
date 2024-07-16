DB_NAME=threadsapp
DB_URL=postgresql://root:secret@localhost:5432/"$(DB_NAME)"?sslmode=disable

postgres:
	docker run --name postgres16 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16.2-alpine3.19
createdb:
	docker exec -it postgres16 createdb --username=root --owner=root "$(DB_NAME)"
dropdb:
	docker exec -it postgres16 dropdb "$(DB_NAME)"
migrateup:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migrateup1:
	migrate -path db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path db/migration -database "$(DB_URL)" -verbose down 1
sqlc:
	sqlc generate
test:
	go test -v -cover ./...
server:
	go run main.go
ngrok:
	ngrok http http://localhost:8082
mock:
	mockgen -package mockdb -destination db/mock/store.go github.com/briandnk/Threads/db/sqlc Store

.PHONY: postgres createdb dropdb migrateup migratedown sqlc test server mock migrateup1 migratedown1