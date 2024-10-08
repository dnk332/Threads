// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/briandnk/Threads/db/sqlc (interfaces: Store)

// Package mockdb is a generated GoMock package.
package mockdb

import (
	context "context"
	reflect "reflect"

	db "github.com/briandnk/Threads/db/sqlc"
	gomock "github.com/golang/mock/gomock"
	uuid "github.com/google/uuid"
)

// MockStore is a mock of Store interface.
type MockStore struct {
	ctrl     *gomock.Controller
	recorder *MockStoreMockRecorder
}

// MockStoreMockRecorder is the mock recorder for MockStore.
type MockStoreMockRecorder struct {
	mock *MockStore
}

// NewMockStore creates a new mock instance.
func NewMockStore(ctrl *gomock.Controller) *MockStore {
	mock := &MockStore{ctrl: ctrl}
	mock.recorder = &MockStoreMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockStore) EXPECT() *MockStoreMockRecorder {
	return m.recorder
}

// AddPostImage mocks base method.
func (m *MockStore) AddPostImage(arg0 context.Context, arg1 db.AddPostImageParams) (db.Media, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AddPostImage", arg0, arg1)
	ret0, _ := ret[0].(db.Media)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// AddPostImage indicates an expected call of AddPostImage.
func (mr *MockStoreMockRecorder) AddPostImage(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AddPostImage", reflect.TypeOf((*MockStore)(nil).AddPostImage), arg0, arg1)
}

// CheckLikeStatusOfUser mocks base method.
func (m *MockStore) CheckLikeStatusOfUser(arg0 context.Context, arg1 db.CheckLikeStatusOfUserParams) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CheckLikeStatusOfUser", arg0, arg1)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CheckLikeStatusOfUser indicates an expected call of CheckLikeStatusOfUser.
func (mr *MockStoreMockRecorder) CheckLikeStatusOfUser(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CheckLikeStatusOfUser", reflect.TypeOf((*MockStore)(nil).CheckLikeStatusOfUser), arg0, arg1)
}

// CountLikeOfPost mocks base method.
func (m *MockStore) CountLikeOfPost(arg0 context.Context, arg1 int64) (int64, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CountLikeOfPost", arg0, arg1)
	ret0, _ := ret[0].(int64)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CountLikeOfPost indicates an expected call of CountLikeOfPost.
func (mr *MockStoreMockRecorder) CountLikeOfPost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CountLikeOfPost", reflect.TypeOf((*MockStore)(nil).CountLikeOfPost), arg0, arg1)
}

// CreatePost mocks base method.
func (m *MockStore) CreatePost(arg0 context.Context, arg1 db.CreatePostParams) (db.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreatePost", arg0, arg1)
	ret0, _ := ret[0].(db.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreatePost indicates an expected call of CreatePost.
func (mr *MockStoreMockRecorder) CreatePost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreatePost", reflect.TypeOf((*MockStore)(nil).CreatePost), arg0, arg1)
}

// CreateSession mocks base method.
func (m *MockStore) CreateSession(arg0 context.Context, arg1 db.CreateSessionParams) (db.Session, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateSession", arg0, arg1)
	ret0, _ := ret[0].(db.Session)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateSession indicates an expected call of CreateSession.
func (mr *MockStoreMockRecorder) CreateSession(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateSession", reflect.TypeOf((*MockStore)(nil).CreateSession), arg0, arg1)
}

// CreateUser mocks base method.
func (m *MockStore) CreateUser(arg0 context.Context, arg1 db.CreateUserParams) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateUser", arg0, arg1)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUser indicates an expected call of CreateUser.
func (mr *MockStoreMockRecorder) CreateUser(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUser", reflect.TypeOf((*MockStore)(nil).CreateUser), arg0, arg1)
}

// CreateUserProfile mocks base method.
func (m *MockStore) CreateUserProfile(arg0 context.Context, arg1 db.CreateUserProfileParams) (db.UserProfile, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateUserProfile", arg0, arg1)
	ret0, _ := ret[0].(db.UserProfile)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUserProfile indicates an expected call of CreateUserProfile.
func (mr *MockStoreMockRecorder) CreateUserProfile(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUserProfile", reflect.TypeOf((*MockStore)(nil).CreateUserProfile), arg0, arg1)
}

// CreateUserTx mocks base method.
func (m *MockStore) CreateUserTx(arg0 context.Context, arg1 db.CreateUserTxParams) (db.CreateUserTxResult, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateUserTx", arg0, arg1)
	ret0, _ := ret[0].(db.CreateUserTxResult)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUserTx indicates an expected call of CreateUserTx.
func (mr *MockStoreMockRecorder) CreateUserTx(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUserTx", reflect.TypeOf((*MockStore)(nil).CreateUserTx), arg0, arg1)
}

// DeletePost mocks base method.
func (m *MockStore) DeletePost(arg0 context.Context, arg1 int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeletePost", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeletePost indicates an expected call of DeletePost.
func (mr *MockStoreMockRecorder) DeletePost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeletePost", reflect.TypeOf((*MockStore)(nil).DeletePost), arg0, arg1)
}

// DeleteSession mocks base method.
func (m *MockStore) DeleteSession(arg0 context.Context, arg1 uuid.UUID) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteSession", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteSession indicates an expected call of DeleteSession.
func (mr *MockStoreMockRecorder) DeleteSession(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteSession", reflect.TypeOf((*MockStore)(nil).DeleteSession), arg0, arg1)
}

// DeleteUser mocks base method.
func (m *MockStore) DeleteUser(arg0 context.Context, arg1 int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteUser", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteUser indicates an expected call of DeleteUser.
func (mr *MockStoreMockRecorder) DeleteUser(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteUser", reflect.TypeOf((*MockStore)(nil).DeleteUser), arg0, arg1)
}

// DeleteUserProfile mocks base method.
func (m *MockStore) DeleteUserProfile(arg0 context.Context, arg1 int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteUserProfile", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteUserProfile indicates an expected call of DeleteUserProfile.
func (mr *MockStoreMockRecorder) DeleteUserProfile(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteUserProfile", reflect.TypeOf((*MockStore)(nil).DeleteUserProfile), arg0, arg1)
}

// GetAllLikesOfPost mocks base method.
func (m *MockStore) GetAllLikesOfPost(arg0 context.Context, arg1 db.GetAllLikesOfPostParams) ([]db.Like, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetAllLikesOfPost", arg0, arg1)
	ret0, _ := ret[0].([]db.Like)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetAllLikesOfPost indicates an expected call of GetAllLikesOfPost.
func (mr *MockStoreMockRecorder) GetAllLikesOfPost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetAllLikesOfPost", reflect.TypeOf((*MockStore)(nil).GetAllLikesOfPost), arg0, arg1)
}

// GetAllLikesOfUser mocks base method.
func (m *MockStore) GetAllLikesOfUser(arg0 context.Context, arg1 db.GetAllLikesOfUserParams) ([]db.Like, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetAllLikesOfUser", arg0, arg1)
	ret0, _ := ret[0].([]db.Like)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetAllLikesOfUser indicates an expected call of GetAllLikesOfUser.
func (mr *MockStoreMockRecorder) GetAllLikesOfUser(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetAllLikesOfUser", reflect.TypeOf((*MockStore)(nil).GetAllLikesOfUser), arg0, arg1)
}

// GetAllUserProfiles mocks base method.
func (m *MockStore) GetAllUserProfiles(arg0 context.Context, arg1 db.GetAllUserProfilesParams) ([]db.UserProfile, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetAllUserProfiles", arg0, arg1)
	ret0, _ := ret[0].([]db.UserProfile)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetAllUserProfiles indicates an expected call of GetAllUserProfiles.
func (mr *MockStoreMockRecorder) GetAllUserProfiles(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetAllUserProfiles", reflect.TypeOf((*MockStore)(nil).GetAllUserProfiles), arg0, arg1)
}

// GetImage mocks base method.
func (m *MockStore) GetImage(arg0 context.Context, arg1 db.GetImageParams) (db.Media, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetImage", arg0, arg1)
	ret0, _ := ret[0].(db.Media)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetImage indicates an expected call of GetImage.
func (mr *MockStoreMockRecorder) GetImage(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetImage", reflect.TypeOf((*MockStore)(nil).GetImage), arg0, arg1)
}

// GetImagesForPost mocks base method.
func (m *MockStore) GetImagesForPost(arg0 context.Context, arg1 int64) ([]db.Media, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetImagesForPost", arg0, arg1)
	ret0, _ := ret[0].([]db.Media)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetImagesForPost indicates an expected call of GetImagesForPost.
func (mr *MockStoreMockRecorder) GetImagesForPost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetImagesForPost", reflect.TypeOf((*MockStore)(nil).GetImagesForPost), arg0, arg1)
}

// GetListAllPost mocks base method.
func (m *MockStore) GetListAllPost(arg0 context.Context, arg1 db.GetListAllPostParams) ([]db.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetListAllPost", arg0, arg1)
	ret0, _ := ret[0].([]db.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetListAllPost indicates an expected call of GetListAllPost.
func (mr *MockStoreMockRecorder) GetListAllPost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetListAllPost", reflect.TypeOf((*MockStore)(nil).GetListAllPost), arg0, arg1)
}

// GetListPostByAuthor mocks base method.
func (m *MockStore) GetListPostByAuthor(arg0 context.Context, arg1 db.GetListPostByAuthorParams) ([]db.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetListPostByAuthor", arg0, arg1)
	ret0, _ := ret[0].([]db.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetListPostByAuthor indicates an expected call of GetListPostByAuthor.
func (mr *MockStoreMockRecorder) GetListPostByAuthor(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetListPostByAuthor", reflect.TypeOf((*MockStore)(nil).GetListPostByAuthor), arg0, arg1)
}

// GetListUser mocks base method.
func (m *MockStore) GetListUser(arg0 context.Context, arg1 db.GetListUserParams) ([]db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetListUser", arg0, arg1)
	ret0, _ := ret[0].([]db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetListUser indicates an expected call of GetListUser.
func (mr *MockStoreMockRecorder) GetListUser(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetListUser", reflect.TypeOf((*MockStore)(nil).GetListUser), arg0, arg1)
}

// GetPostById mocks base method.
func (m *MockStore) GetPostById(arg0 context.Context, arg1 int64) (db.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetPostById", arg0, arg1)
	ret0, _ := ret[0].(db.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetPostById indicates an expected call of GetPostById.
func (mr *MockStoreMockRecorder) GetPostById(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetPostById", reflect.TypeOf((*MockStore)(nil).GetPostById), arg0, arg1)
}

// GetSession mocks base method.
func (m *MockStore) GetSession(arg0 context.Context, arg1 uuid.UUID) (db.Session, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetSession", arg0, arg1)
	ret0, _ := ret[0].(db.Session)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetSession indicates an expected call of GetSession.
func (mr *MockStoreMockRecorder) GetSession(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetSession", reflect.TypeOf((*MockStore)(nil).GetSession), arg0, arg1)
}

// GetSessionByUserID mocks base method.
func (m *MockStore) GetSessionByUserID(arg0 context.Context, arg1 int64) (db.Session, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetSessionByUserID", arg0, arg1)
	ret0, _ := ret[0].(db.Session)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetSessionByUserID indicates an expected call of GetSessionByUserID.
func (mr *MockStoreMockRecorder) GetSessionByUserID(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetSessionByUserID", reflect.TypeOf((*MockStore)(nil).GetSessionByUserID), arg0, arg1)
}

// GetUserById mocks base method.
func (m *MockStore) GetUserById(arg0 context.Context, arg1 int64) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetUserById", arg0, arg1)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUserById indicates an expected call of GetUserById.
func (mr *MockStoreMockRecorder) GetUserById(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUserById", reflect.TypeOf((*MockStore)(nil).GetUserById), arg0, arg1)
}

// GetUserByName mocks base method.
func (m *MockStore) GetUserByName(arg0 context.Context, arg1 string) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetUserByName", arg0, arg1)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUserByName indicates an expected call of GetUserByName.
func (mr *MockStoreMockRecorder) GetUserByName(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUserByName", reflect.TypeOf((*MockStore)(nil).GetUserByName), arg0, arg1)
}

// GetUserForUpdate mocks base method.
func (m *MockStore) GetUserForUpdate(arg0 context.Context, arg1 int64) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetUserForUpdate", arg0, arg1)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUserForUpdate indicates an expected call of GetUserForUpdate.
func (mr *MockStoreMockRecorder) GetUserForUpdate(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUserForUpdate", reflect.TypeOf((*MockStore)(nil).GetUserForUpdate), arg0, arg1)
}

// GetUserProfileById mocks base method.
func (m *MockStore) GetUserProfileById(arg0 context.Context, arg1 int64) (db.UserProfile, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetUserProfileById", arg0, arg1)
	ret0, _ := ret[0].(db.UserProfile)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUserProfileById indicates an expected call of GetUserProfileById.
func (mr *MockStoreMockRecorder) GetUserProfileById(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUserProfileById", reflect.TypeOf((*MockStore)(nil).GetUserProfileById), arg0, arg1)
}

// LikePost mocks base method.
func (m *MockStore) LikePost(arg0 context.Context, arg1 db.LikePostParams) (db.Like, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "LikePost", arg0, arg1)
	ret0, _ := ret[0].(db.Like)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// LikePost indicates an expected call of LikePost.
func (mr *MockStoreMockRecorder) LikePost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LikePost", reflect.TypeOf((*MockStore)(nil).LikePost), arg0, arg1)
}

// SearchPostByTextContent mocks base method.
func (m *MockStore) SearchPostByTextContent(arg0 context.Context, arg1 db.SearchPostByTextContentParams) ([]db.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SearchPostByTextContent", arg0, arg1)
	ret0, _ := ret[0].([]db.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SearchPostByTextContent indicates an expected call of SearchPostByTextContent.
func (mr *MockStoreMockRecorder) SearchPostByTextContent(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SearchPostByTextContent", reflect.TypeOf((*MockStore)(nil).SearchPostByTextContent), arg0, arg1)
}

// SearchUserByUsername mocks base method.
func (m *MockStore) SearchUserByUsername(arg0 context.Context, arg1 db.SearchUserByUsernameParams) ([]db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SearchUserByUsername", arg0, arg1)
	ret0, _ := ret[0].([]db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SearchUserByUsername indicates an expected call of SearchUserByUsername.
func (mr *MockStoreMockRecorder) SearchUserByUsername(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SearchUserByUsername", reflect.TypeOf((*MockStore)(nil).SearchUserByUsername), arg0, arg1)
}

// SetUserAvatar mocks base method.
func (m *MockStore) SetUserAvatar(arg0 context.Context, arg1 db.SetUserAvatarParams) (db.Media, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SetUserAvatar", arg0, arg1)
	ret0, _ := ret[0].(db.Media)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SetUserAvatar indicates an expected call of SetUserAvatar.
func (mr *MockStoreMockRecorder) SetUserAvatar(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetUserAvatar", reflect.TypeOf((*MockStore)(nil).SetUserAvatar), arg0, arg1)
}

// UnlikePost mocks base method.
func (m *MockStore) UnlikePost(arg0 context.Context, arg1 db.UnlikePostParams) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UnlikePost", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// UnlikePost indicates an expected call of UnlikePost.
func (mr *MockStoreMockRecorder) UnlikePost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UnlikePost", reflect.TypeOf((*MockStore)(nil).UnlikePost), arg0, arg1)
}

// UpdatePost mocks base method.
func (m *MockStore) UpdatePost(arg0 context.Context, arg1 db.UpdatePostParams) (db.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdatePost", arg0, arg1)
	ret0, _ := ret[0].(db.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdatePost indicates an expected call of UpdatePost.
func (mr *MockStoreMockRecorder) UpdatePost(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdatePost", reflect.TypeOf((*MockStore)(nil).UpdatePost), arg0, arg1)
}

// UpdateUser mocks base method.
func (m *MockStore) UpdateUser(arg0 context.Context, arg1 db.UpdateUserParams) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateUser", arg0, arg1)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateUser indicates an expected call of UpdateUser.
func (mr *MockStoreMockRecorder) UpdateUser(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateUser", reflect.TypeOf((*MockStore)(nil).UpdateUser), arg0, arg1)
}

// UpdateUserProfile mocks base method.
func (m *MockStore) UpdateUserProfile(arg0 context.Context, arg1 db.UpdateUserProfileParams) (db.UserProfile, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateUserProfile", arg0, arg1)
	ret0, _ := ret[0].(db.UserProfile)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateUserProfile indicates an expected call of UpdateUserProfile.
func (mr *MockStoreMockRecorder) UpdateUserProfile(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateUserProfile", reflect.TypeOf((*MockStore)(nil).UpdateUserProfile), arg0, arg1)
}
