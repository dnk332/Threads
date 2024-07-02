package db

import (
	"context"
	"testing"

	"github.com/briandnk/Threads/utils"
	"github.com/stretchr/testify/require"
)

func TestCreatePost(t *testing.T) {
	author := createRandomUser(t)

	arg := CreatePostParams{
		AuthorID:    author.ID,
		TextContent: utils.RandomString(60),
	}

	post, err := testStore.CreatePost(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, post)

	require.Equal(t, arg.AuthorID, post.AuthorID)
	require.Equal(t, arg.TextContent, post.TextContent)

	require.NotZero(t, post.CreatedAt)
	require.NotZero(t, post.UpdatedAt)
}

func TestUpdatePost(t *testing.T) {

}
