package db

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

func LikePost(t *testing.T, arg ...interface{}) Like {
	var post Post
	var user User

	if len(arg) == 0 {
		post = CreateRandomPost(t)
		user = createRandomUser(t)
	} else {
		post = arg[0].(Post)
		user = arg[1].(User)
	}

	argLikePost := LikePostParams{
		PostID:   post.ID,
		AuthorID: user.ID,
	}

	likedPost, err := testStore.LikePost(context.Background(), argLikePost)
	require.NoError(t, err)
	require.NotEmpty(t, likedPost)

	require.Equal(t, likedPost.AuthorID, user.ID)
	require.Equal(t, likedPost.PostID, post.ID)
	return likedPost
}

func TestLikePost(t *testing.T) {
	LikePost(t)
}
func TestUnlikePost(t *testing.T) {
	post := CreateRandomPost(t)
	user := createRandomUser(t)
	likedPost := LikePost(t, post, user)

	arg := UnlikePostParams{
		PostID:   post.ID,
		AuthorID: user.ID,
	}

	unLikedPost := testStore.UnlikePost(context.Background(), arg)
	require.Equal(t, likedPost.AuthorID, user.ID)
	require.Equal(t, likedPost.PostID, post.ID)
	require.Empty(t, unLikedPost)

}

func TestGetAllLikesOfPost(t *testing.T) {
	const (
		limit  = 5
		offset = 0
	)

	post := CreateRandomPost(t)

	n := 5
	users := make([]User, n)
	for i := 0; i < n; i++ {
		users[i] = createRandomUser(t)
		LikePost(t, post, users[i])
	}

	arg := GetAllLikesOfPostParams{
		PostID: post.ID,
		Limit:  limit,
		Offset: offset,
	}

	listLikes, err := testStore.GetAllLikesOfPost(context.Background(), arg)
	require.NoError(t, err)
	require.Len(t, listLikes, n)
}

func TestGetAllLikesOfUser(t *testing.T) {
	const (
		limit  = 5
		offset = 0
	)
	user := createRandomUser(t)

	n := 5
	posts := make([]Post, n)
	for i := 0; i < n; i++ {
		posts[i] = CreateRandomPost(t)
		LikePost(t, posts[i], user)
	}

	arg := GetAllLikesOfUserParams{
		AuthorID: user.ID,
		Limit:    limit,
		Offset:   offset,
	}

	listLikes, err := testStore.GetAllLikesOfUser(context.Background(), arg)
	require.NoError(t, err)
	require.Len(t, listLikes, n)
}
func TestCountLikeOfPost(t *testing.T) {
	post := CreateRandomPost(t)

	n := 5
	users := make([]User, n)
	for i := 0; i < n; i++ {
		users[i] = createRandomUser(t)
		LikePost(t, post, users[i])
	}

	like_count, err := testStore.CountLikeOfPost(context.Background(), post.ID)
	require.NoError(t, err)
	require.EqualValues(t, like_count, n)
}

func TestCheckLikeStatusOfUser(t *testing.T) {
	post := CreateRandomPost(t)
	user := createRandomUser(t)
	LikePost(t, post, user)
	likeStatus, err := testStore.CheckLikeStatusOfUser(context.Background(), CheckLikeStatusOfUserParams{
		PostID:   post.ID,
		AuthorID: user.ID,
	})
	require.NoError(t, err)
	require.True(t, likeStatus)
}
