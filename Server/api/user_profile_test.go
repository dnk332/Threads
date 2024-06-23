package api

import (
	"bytes"
	"encoding/json"
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

func randomUserProfile(user db.User) (userProfile db.UserProfile) {
	userProfile = db.UserProfile{
		UserID: user.ID,
		Name:   utils.RandomString(7),
		Email:  utils.RandomEmail(),
		Bio:    utils.RandomString(10),
	}
	return
}

func requireBodyMatchUserProfile(t *testing.T, body *bytes.Buffer, userProfile db.UserProfile) {
	data, err := io.ReadAll(body)
	require.NoError(t, err)

	var gotUserProfile db.UserProfile
	err = json.Unmarshal(data, &gotUserProfile)

	require.NoError(t, err)
	require.Equal(t, userProfile.UserID, gotUserProfile.UserID)
	require.Equal(t, userProfile.Name, gotUserProfile.Name)
	require.Equal(t, userProfile.Email, gotUserProfile.Email)
	require.Equal(t, userProfile.Bio, gotUserProfile.Bio)
	require.Equal(t, userProfile.CreatedAt, gotUserProfile.CreatedAt)
	require.Equal(t, userProfile.UpdatedAt, gotUserProfile.UpdatedAt)
}

func TestCreateUserProfileAPI(t *testing.T) {
	user, _ := randomUser(t)
	userProfile := randomUserProfile(user)

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
				"user_id": userProfile.UserID,
				"name":    userProfile.Name,
				"email":   userProfile.Email,
				"bio":     userProfile.Bio,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserById(gomock.Any(), userProfile.UserID).
					Times(1).
					Return(user, nil)

				arg := db.CreateUserProfileParams{
					UserID: userProfile.UserID,
					Name:   userProfile.Name,
					Email:  userProfile.Email,
					Bio:    userProfile.Bio,
				}
				store.EXPECT().
					CreateUserProfile(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(userProfile, nil)
			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusOK, recorder.Code)
				requireBodyMatchUserProfile(t, recorder.Body, userProfile)
			},
		},
		{
			name: "InvalidUserID",
			body: gin.H{
				"user_id": 0,
				"name":    userProfile.Name,
				"email":   userProfile.Email,
				"bio":     userProfile.Bio,
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
			name: "InvalidEmail",
			body: gin.H{
				"user_id": userProfile.UserID,
				"name":    userProfile.Name,
				"email":   "invalid-email",
				"bio":     userProfile.Bio,
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
			name: "InvalidName",
			body: gin.H{
				"user_id": userProfile.UserID,
				"name":    "invalid-name",
				"email":   userProfile.Email,
				"bio":     userProfile.Bio,
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
				"user_id": userProfile.UserID,
				"name":    userProfile.Name,
				"email":   userProfile.Email,
				"bio":     userProfile.Bio,
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
		{
			name: "DuplicateUserProfile",
			body: gin.H{
				"user_id": userProfile.UserID,
				"name":    userProfile.Name,
				"email":   userProfile.Email,
				"bio":     userProfile.Bio,
			},
			setupAuth: func(t *testing.T, request *http.Request, tokenMaker token.Maker) {
				addAuthorization(t, request, tokenMaker, authorizationTypeBearer, user.ID, time.Minute)
			},
			buildStubs: func(store *mockdb.MockStore) {
				store.EXPECT().
					GetUserById(gomock.Any(), user.ID).
					Times(1).
					Return(user, nil)

				arg := db.CreateUserProfileParams{
					UserID: userProfile.UserID,
					Name:   userProfile.Name,
					Email:  userProfile.Email,
					Bio:    userProfile.Bio,
				}
				store.EXPECT().
					CreateUserProfile(gomock.Any(), gomock.Eq(arg)).
					Times(1).
					Return(db.UserProfile{}, db.ErrUniqueViolation)

			},
			checkResponse: func(recorder *httptest.ResponseRecorder) {
				require.Equal(t, http.StatusConflict, recorder.Code)
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

			url := "/user-profiles"
			request, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(data))
			require.NoError(t, err)

			tc.setupAuth(t, request, server.tokenMaker)
			server.router.ServeHTTP(recorder, request)
			tc.checkResponse(recorder)
		})
	}
}
