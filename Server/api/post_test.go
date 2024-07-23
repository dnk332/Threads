package api

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/briandnk/Threads/token"

	mockdb "github.com/briandnk/Threads/db/mock"
	db "github.com/briandnk/Threads/db/sqlc"
	"github.com/briandnk/Threads/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
)

func requireBodyMatchPost(t *testing.T, body *bytes.Buffer, post db.Post) {
	data, err := io.ReadAll(body)
	require.NoError(t, err)

	var gotPost db.Post
	err = json.Unmarshal(data, &gotPost)

	require.NoError(t, err)
	require.Equal(t, post.ID, gotPost.ID)
	require.Equal(t, post.AuthorID, gotPost.AuthorID)
	require.Equal(t, post.TextContent, gotPost.TextContent)
	require.WithinDuration(t, post.CreatedAt, gotPost.CreatedAt, time.Second)
	require.WithinDuration(t, post.UpdatedAt, gotPost.UpdatedAt, time.Second)
}

func requireBodyMatchPosts(t *testing.T, body *bytes.Buffer, expectedPosts []getListAllPostResponse) {
	data, err := io.ReadAll(body)
	require.NoError(t, err)

	var gotPosts []getListAllPostResponse
	err = json.Unmarshal(data, &gotPosts)
	require.NoError(t, err)

	require.Equal(t, len(expectedPosts), len(gotPosts))
}

func randomPost(user db.User) (post db.Post) {
	post = db.Post{
		ID:          utils.RandomInt(1, 1000),
		AuthorID:    user.ID,
		TextContent: utils.RandomString(60),
	}
	return
}

func randomS3Image() (image Image) {
	link := fmt.Sprintf("https://www.gstatic.com/webp/gallery/%v.jpg", utils.RandomInt(1, 100))
	image = Image{
		Index:     utils.RandomInt(1, 100),
		Uri:       link,
		ImageName: utils.RandomString(6),
		ImageType: "jpeg",
		Size:      2000.0,
		CreatedAt: time.Now(),
	}
	return
}

func randomMediaImage(post db.Post, imageS3 Image) (image db.Media) {
	image = db.Media{
		ID:                utils.RandomInt(1, 1000),
		Link:              imageS3.Uri,
		ReferenceObjectID: post.ID,
		Type:              "image",
		OrderColumn:       int32(utils.RandomInt(1, 10)),
		ReferenceObject:   "post",
		CreatedAt:         time.Now(),
	}
	return
}

func TestCreatePostAPI(t *testing.T) {
	user, _ := randomUser(t)
	post := randomPost(user)

	imageNumber := 3

	var images []Image
	var imageMedia []db.Media

	for i := 0; i < imageNumber; i++ {
		images = append(images, randomS3Image())
	}

	for i := 0; i < imageNumber; i++ {
		imageMedia = append(imageMedia, randomMediaImage(post, images[i]))
	}

	testCases := []struct {
		name          string
		body          gin.H
		setupAuth     func(t *testing.T, request *http.Request, tokenMaker token.Maker)
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recoder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			body: gin.H{
				"text_content":   post.TextContent,
				"images_content": images,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				arg := db.CreatePostParams{
					AuthorID:    post.AuthorID,
					TextContent: post.TextContent,
				}
				for i, image := range images {
					argPostImage := db.AddPostImageParams{
						Link:              image.Uri,
						OrderColumn:       int32(image.Index),
						ReferenceObjectID: post.ID,
					}
					store.EXPECT().
						AddPostImage(gomock.Any(), gomock.Eq(argPostImage)).
						Return(imageMedia[i], nil)
				}

				store.EXPECT().
					CreatePost(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(post, nil)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchPost(t, recorder.Body, post)
			},
		},
		{
			name: "InvalidTextContent",
			body: gin.H{
				"text_content": "",
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserById(gomock.Any(), gomock.Any()).
					Times(0)
				store.EXPECT().
					CreateUserProfile(gomock.Any(), gomock.Any()).
					Times(0)

			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusBadRequest, recorder.Code)
			},
		},
		{
			name: "NoAuthorization",
			body: gin.H{
				"text_content": post.TextContent,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserById(gomock.Any(), gomock.Any()).
					Times(0)

				store.EXPECT().
					CreateUserProfile(gomock.Any(), gomock.Any()).
					Times(0)

			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnauthorized, recorder.Code)
			},
		},
	}

	for i := range testCases {
		tc := testCases[i]

		t.Run(tc.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			tc.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			// Marshal body data to JSON
			data, err := json.Marshal(tc.body)
			require.NoError(t, err)

			url := "/posts"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(data))
			require.NoError(t, err)

			tc.setupAuth(t, request, server.tokenMaker)
			server.router.ServeHTTP(recorder, request)
			tc.checkResponse(recorder)
		})
	}
}

func TestGetListAllPostAPI(t *testing.T) {
	user, _ := randomUser(t)
	userProfile := randomUserProfile(user)

	authorAvatar := db.Media{
		ID:                utils.RandomInt(10, 100),
		Link:              utils.RandomString(12),
		Type:              "image",
		OrderColumn:       0,
		CreatedAt:         time.Now(),
		ReferenceObject:   "user_profile",
		ReferenceObjectID: userProfile.ID,
	}

	n := 5
	posts := make([]db.Post, n)
	for i := 0; i < n; i++ {
		posts[i] = randomPost(user)
	}

	var images []Image
	imageMedia := make([][]db.Media, n)
	for i := 0; i < n; i++ {
		images = append(images, randomS3Image())
	}

	for i := 0; i < n; i++ {
		var postMedia []db.Media
		postMedia = append(postMedia, randomMediaImage(posts[i], images[i]))

		imageMedia[i] = postMedia
	}

	type Query struct {
		PageID   int
		PageSize int
	}
	testCases := []struct {
		name          string
		query         Query
		setupAuth     func(t *testing.T, request *http.Request, tokenMaker token.Maker)
		buildStubs    func(store *mockdb.MockStore)
		checkResponse func(recoder *httptest.ResponseRecorder)
	}{
		{
			name: "OK",
			query: Query{
				PageID:   1,
				PageSize: n,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetListAllPost(gomock.Any(), gomock.Eq(db.GetListAllPostParams{
						Limit:  int32(n),
						Offset: 0,
					})).
					Times(1).
					Return(posts, nil)
				for i := 0; i < n; i++ {
					store.EXPECT().
						GetUserById(gomock.Any(), user.ID).
						Times(1).
						Return(user, nil)
					store.EXPECT().
						GetImage(gomock.Any(), gomock.Eq(db.GetImageParams{
							ReferenceObject:   "user_profile",
							ReferenceObjectID: userProfile.ID,
						})).
						Times(1).
						Return(authorAvatar, nil)
					store.EXPECT().
						CountLikeOfPost(gomock.Any(), posts[i].ID).
						Times(1).
						Return(int64(0), nil)
					store.EXPECT().
						GetUserProfileById(gomock.Any(), user.ID).
						Times(1).
						Return(userProfile, nil)

					store.EXPECT().
						GetImagesForPost(gomock.Any(), gomock.Eq(posts[i].ID)).
						Times(1).Return(imageMedia[i], nil)

					store.EXPECT().
						CheckLikeStatusOfUser(gomock.Any(), gomock.Eq(db.CheckLikeStatusOfUserParams{
							PostID:   posts[i].ID,
							AuthorID: user.ID,
						})).
						Times(1)
				}
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)

				var expectedResponse []getListAllPostResponse
				for i, post := range posts {
					author := Author{
						ID:           user.ID,
						UserName:     user.Username,
						Email:        userProfile.Email,
						ProfileName:  userProfile.Name,
						AuthorAvatar: authorAvatar.Link,
					}
					interaction := Interaction{}

					expectedResponse = append(expectedResponse, getListAllPostResponse{
						Id:          post.ID,
						Post:        createPostResponse(post, imageMedia[i]),
						Author:      author,
						Interaction: interaction,
					})
				}

				requireBodyMatchPosts(t, recorder.Body, expectedResponse)
			},
		},
		{
			name: "NoAuthorization",
			query: Query{
				PageID:   1,
				PageSize: n,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetListAllPost(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusUnauthorized, recorder.Code)
			},
		},
		{
			name: "InternalError",
			query: Query{
				PageID:   1,
				PageSize: n,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetListAllPost(gomock.Any(), gomock.Any()).
					Times(1).
					Return([]db.Post{}, sql.ErrConnDone)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusInternalServerError, recorder.Code)
			},
		},
		{
			name: "InvalidPageID",
			query: Query{
				PageID:   -1,
				PageSize: n,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetListAllPost(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusBadRequest, recorder.Code)
			},
		},
		{
			name: "InvalidPageSize",
			query: Query{
				PageID:   1,
				PageSize: 100000,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetListAllPost(gomock.Any(), gomock.Any()).
					Times(0)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusBadRequest, recorder.Code)
			},
		},
	}

	for i := range testCases {
		tc := testCases[i]

		t.Run(tc.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			store := mockdb.NewMockStore(ctrl)
			tc.buildStubs(store)

			server := newTestServer(t, store)
			recorder := httptest.NewRecorder()

			url := "/posts"
			request, err := http.NewRequest(http.MethodGet, url, nil)
			require.NoError(t, err)

			// Add query parameters to request URL
			q := request.URL.Query()
			q.Add("page_id", fmt.Sprintf("%d", tc.query.PageID))
			q.Add("page_size", fmt.Sprintf("%d", tc.query.PageSize))
			request.URL.RawQuery = q.Encode()

			tc.setupAuth(t, request, server.tokenMaker)
			server.router.ServeHTTP(recorder, request)
			tc.checkResponse(recorder)
		})
	}
}
