package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/briandnk/Threads/utils"
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
	newHashedPassword := createRandomHashPassword(t)
	newUserName := utils.RandomString(6)

	arg := UpdateUserParams{
		ID: user1.ID,
		Username: sql.NullString{
			String: newUserName,
			Valid:  true,
		},
		HashedPassword: sql.NullString{
			String: newHashedPassword,
			Valid:  true,
		},
		IsFrozen: sql.NullBool{
			Bool:  user1.IsFrozen,
			Valid: true,
		},
	}

	user2, err := testQueries.UpdateUser(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, user2)

	require.Equal(t, user1.ID, user2.ID)
	require.Equal(t, newUserName, user2.Username)
	require.Equal(t, newHashedPassword, user2.HashedPassword)
	require.Equal(t, user1.IsFrozen, user2.IsFrozen)

	require.WithinDuration(t, user1.CreatedAt, user2.CreatedAt, time.Second)
	require.WithinDuration(t, user1.PasswordChangedAt, user2.PasswordChangedAt, time.Second)
}

func TestDeleteUser(t *testing.T) {
	user1 := createRandomUser(t)
	err := testQueries.DeleteUser(context.Background(), user1.ID)
	require.NoError(t, err)

	user2, err := testQueries.GetUserById(context.Background(), user1.ID)
	require.Error(t, err)
	require.EqualError(t, err, ErrRecordNotFound.Error())
	require.Empty(t, user2)
}

func TestListUsers(t *testing.T) {
	const (
		limit  = 5
		offset = 0
	)
	arg := GetListUserParams{
		Limit:  limit,
		Offset: offset,
	}

	users, err := testQueries.GetListUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, users)
	require.Len(t, users, limit)
}
