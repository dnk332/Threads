package db

import (
	"context"
	"testing"
	"time"

	"github.com/briandnk/Threads/utils"
	"github.com/stretchr/testify/require"
)

func CreateRandomPost(t *testing.T, textContent ...string) Post {
	author := createRandomUser(t)

	content := utils.RandomString(60)
	if len(textContent) != 0 {
		content = textContent[0]
	}

	arg := CreatePostParams{
		AuthorID:    author.ID,
		TextContent: content,
	}

	post, err := testStore.CreatePost(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, post)

	require.Equal(t, arg.AuthorID, post.AuthorID)
	require.Equal(t, arg.TextContent, post.TextContent)

	require.NotZero(t, post.CreatedAt)
	require.NotZero(t, post.UpdatedAt)

	return post
}

func TestCreatePost(t *testing.T) {
	CreateRandomPost(t)
}

func TestUpdatePost(t *testing.T) {
	post := CreateRandomPost(t)

	arg := UpdatePostParams{
		ID:          post.ID,
		TextContent: utils.RandomString(60),
	}

	updatedPost, err := testStore.UpdatePost(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, updatedPost)

	require.Equal(t, post.AuthorID, updatedPost.AuthorID)
	require.Equal(t, arg.TextContent, updatedPost.TextContent)

	require.WithinDuration(t, post.CreatedAt, updatedPost.CreatedAt, time.Second)
	require.WithinDuration(t, post.CreatedAt, updatedPost.CreatedAt, time.Second)

}
func TestGetPostByID(t *testing.T) {
	post1 := CreateRandomPost(t)

	post2, err := testStore.GetPostById(context.Background(), post1.ID)
	require.NoError(t, err)
	require.NotEmpty(t, post2)

	require.Equal(t, post1.ID, post2.ID)
	require.Equal(t, post1.AuthorID, post2.AuthorID)
	require.Equal(t, post1.TextContent, post2.TextContent)
	require.WithinDuration(t, post1.CreatedAt, post2.CreatedAt, time.Second)
	require.WithinDuration(t, post1.UpdatedAt, post2.UpdatedAt, time.Second)
}

func TestDeletePost(t *testing.T) {
	post1 := CreateRandomPost(t)
	err := testStore.DeletePost(context.Background(), post1.ID)
	require.NoError(t, err)

	post2, err := testStore.GetPostById(context.Background(), post1.ID)
	require.Error(t, err)
	require.EqualError(t, err, ErrRecordNotFound.Error())
	require.Empty(t, post2)
}
func TestListAllPosts(t *testing.T) {
	const (
		limit  = 3
		offset = 0
	)

	for i := 0; i < limit; i++ {
		CreateRandomPost(t)
	}

	arg := GetListAllPostParams{
		Limit:  limit,
		Offset: offset,
	}

	posts, err := testStore.GetListAllPost(context.Background(), arg)
	require.NoError(t, err)
	require.Len(t, posts, limit)
}
func TestGetListPostByAuthor(t *testing.T) {
	const (
		limit  = 3
		offset = 0
	)

	hashedPassword := createRandomHashPassword(t)
	arg := CreateUserParams{
		Username:       utils.RandomString(6),
		HashedPassword: hashedPassword,
	}
	user, err := testStore.CreateUser(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, user)

	require.Equal(t, arg.Username, user.Username)
	require.Equal(t, arg.HashedPassword, user.HashedPassword)

	require.NotZero(t, user.CreatedAt)
	require.NotZero(t, user.PasswordChangedAt)
	require.False(t, user.IsFrozen)

	for i := 0; i < limit; i++ {
		arg := CreatePostParams{
			AuthorID:    user.ID,
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

	arg1 := GetListPostByAuthorParams{
		AuthorID: user.ID,
		Limit:    limit,
		Offset:   offset,
	}

	posts, err := testStore.GetListPostByAuthor(context.Background(), arg1)
	require.NoError(t, err)
	require.Len(t, posts, limit)

}

func TestSearchPostByTextContent(t *testing.T) {
	content := utils.RandomString(60)
	for i := 0; i < 10; i++ {
		CreateRandomPost(t, content)
	}
	arg := SearchPostByTextContentParams{
		TextContent: content,
		Limit:       5,
		Offset:      0,
	}
	posts, err := testStore.SearchPostByTextContent(context.Background(), arg)
	require.NoError(t, err)
	require.Len(t, posts, 5)

}
