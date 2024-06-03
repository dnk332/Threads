package db

import (
	"context"
	"testing"
	"time"

	"github.com/briandnk/Threads/utils"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/stretchr/testify/require"
)

func createRandomHashPassword(t *testing.T) string {
	hashedPassword, err := utils.HashPassword(utils.RandomString(6))
	require.NoError(t, err)
	return hashedPassword
}

func createRandomUser(t *testing.T) User {
	hashedPassword := createRandomHashPassword(t)
	arg := CreateUserParams{
		Username:       utils.RandomString(6),
		HashedPassword: hashedPassword,
	}

	user, err := testQueries.CreateUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, user)

	require.Equal(t, arg.Username, user.Username)
	require.Equal(t, arg.HashedPassword, user.HashedPassword)

	require.NotZero(t, user.CreatedAt)
	require.NotZero(t, user.PasswordChangedAt)
	require.False(t, user.IsFrozen)

	return user
}

func TestCreateUser(t *testing.T) {
	createRandomUser(t)
}

func TestUpdateUser(t *testing.T) {
	user1 := createRandomUser(t)
	hashedPassword := createRandomHashPassword(t)

	arg := UpdateUserParams{
		ID: pgtype.Int8{
			Int64: user1.ID,
			Valid: true,
		},
		Username: pgtype.Text{
			String: utils.RandomString(6),
			Valid:  true,
		},
		HashedPassword: pgtype.Text{
			String: hashedPassword,
			Valid:  true,
		},
		IsFrozen: pgtype.Bool{
			Bool:  user1.IsFrozen,
			Valid: true,
		},
	}

	user2, err := testQueries.UpdateUser(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, user2)

	require.Equal(t, user1.ID, user2.ID)
	require.Equal(t, user1.Username, user2.Username)
	require.Equal(t, user1.HashedPassword, user2.HashedPassword)
	require.Equal(t, user1.IsFrozen, user2.IsFrozen)

	require.WithinDuration(t, user1.CreatedAt, user2.CreatedAt, time.Second)
	require.WithinDuration(t, user1.PasswordChangedAt, user2.PasswordChangedAt, time.Second)
}
