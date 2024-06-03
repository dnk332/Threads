package db

import (
	"context"
	"log"
	"os"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	dbSource = "postgresql://root:secret@localhost:5432/threadsapp?sslmode=disable"
)

var testQueries *Queries

func TestMain(m *testing.M) {
	connPool, err := pgxpool.New(context.Background(), dbSource)

	if err != nil {
		log.Fatal("cannot connect to db : ", err)
	}
	testQueries = New(connPool)
	db := testQueries.db
	if db == nil {
		log.Fatalf("error..")
	}

	os.Exit(m.Run())
}
