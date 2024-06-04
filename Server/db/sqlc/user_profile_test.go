package db

import (
	"context"
	"testing"
	"time"

	"github.com/briandnk/Threads/utils"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/stretchr/testify/require"
)

func createRandomUserProfile(t *testing.T) UserProfile {
	user := createRandomUser(t)
	arg := CreateUserProfileParams{
		UserID: user.ID,
		Name:   utils.RandomString(6),
		Email:  utils.RandomEmail(),
		Bio:    utils.RandomString(10),
	}

	userProfile, err := testQueries.CreateUserProfile(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, userProfile)

	require.Equal(t, user.ID, userProfile.UserID)
	require.Equal(t, arg.Name, userProfile.Name)
	require.Equal(t, arg.Email, userProfile.Email)
	require.Equal(t, arg.Bio, userProfile.Bio)

	require.NotZero(t, userProfile.CreatedAt)
	require.NotZero(t, userProfile.UpdatedAt)

	return userProfile
}

func TestCreateUserProfile(t *testing.T) {
	createRandomUserProfile(t)
}

func TestUpdateUserProfile(t *testing.T) {
	userProfile1 := createRandomUserProfile(t)
	newUserProfileName := utils.RandomString(6)
	newUserProfileBio := utils.RandomString(10)

	arg := UpdateUserProfileParams{
		ID: userProfile1.ID,
		Name: pgtype.Text{
			String: newUserProfileName,
			Valid:  true,
		},
		Bio: pgtype.Text{
			String: newUserProfileBio,
			Valid:  true,
		},
	}

	userProfile2, err := testQueries.UpdateUserProfile(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, userProfile2)

	require.Equal(t, userProfile1.ID, userProfile2.ID)
	require.Equal(t, userProfile1.UserID, userProfile2.UserID)
	require.Equal(t, newUserProfileName, userProfile2.Name)
	require.Equal(t, newUserProfileBio, userProfile2.Bio)
	require.Equal(t, userProfile1.Email, userProfile2.Email)

	require.WithinDuration(t, userProfile1.CreatedAt, userProfile2.CreatedAt, time.Second)
	require.WithinDuration(t, userProfile1.UpdatedAt, userProfile2.UpdatedAt, time.Second)
}

func TestDeleteUserProfile(t *testing.T) {
	userProfile1 := createRandomUser(t)
	err := testQueries.DeleteUserProfile(context.Background(), userProfile1.ID)
	require.NoError(t, err)

	userProfile2, err := testQueries.GetUserProfileById(context.Background(), userProfile1.ID)
	require.Error(t, err)
	require.EqualError(t, err, ErrRecordNotFound.Error())
	require.Empty(t, userProfile2)
}
