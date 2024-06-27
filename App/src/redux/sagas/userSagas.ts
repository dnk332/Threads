import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import {userActions} from '@actions';
import api from '@src/services/apis';
import {invoke} from '@appRedux/sagaHelper/sagas';
import {currentAccountSelector} from '../selectors';
import {
  IGetUserProfileAction,
  IUpdateUserProfileAction,
  UserActionType,
} from '../actionTypes/userActionTypes';
import {
  ResponseGetUserInfoApi,
  ResponseUpdateUserInfoApi,
} from '@src/services/apiTypes/userApiTypes';

const {userApis} = api;

function* getUserProfileSaga({type, payload}: IGetUserProfileAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const response: ResponseGetUserInfoApi = yield call(
        userApis.getUserInfoApi,
        params.user_id,
      );
      yield callback({
        success: true,
        data: response,
      });
      if (response.success) {
        yield put(userActions.saveUserInfoAction(response.data.user_profile));
      }
    },
    error => {
      callback({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* updateUserProfileSaga({type, payload}: IUpdateUserProfileAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const currentAccount = yield select(currentAccountSelector);
      const response: ResponseUpdateUserInfoApi = yield call(
        userApis.updateUserInfoApi,
        currentAccount.user_id,
        params.name,
        params.email,
        params.bio,
      );
      yield callback({
        success: true,
        data: response,
      });
      if (response.success) {
        yield put(userActions.saveUserInfoAction(response.data.user_profile));
      }
    },
    error => {
      callback({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* watchGetUserProfile() {
  yield takeLatest(UserActionType.GET_USER_PROFILE, getUserProfileSaga);
}

function* watchUpdateUserProfile() {
  yield takeLatest(UserActionType.UPDATE_PROFILE, updateUserProfileSaga);
}

export default function* userSagas() {
  yield all([watchGetUserProfile(), watchUpdateUserProfile()]);
}
