import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import {userActions} from '@actions';
import api from '@src/services/apis';
import {currentAccountSelector} from '@selectors';
import {
  IGetUserProfileAction,
  IUpdateUserProfileAction,
  UserActionType,
} from '@actionTypes/userActionTypes';
import {
  ResponseGetUserProfileApi,
  ResponseUpdateUserProfileApi,
} from '@src/services/apiTypes/userApiTypes';
import {invoke} from '../sagaHelper/invokeSaga';
import {userProfileModel} from '@src/models/user';

const {userApis} = api;

function* getUserProfileSaga({payload}: IGetUserProfileAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const {data, success}: ResponseGetUserProfileApi = yield call(
        userApis.getUserProfileApi,
        params.user_id,
      );
      callback({data, success});
      yield put(userActions.saveUserProfileAction(userProfileModel(data)));
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
  });
}

function* updateUserProfileSaga({payload}: IUpdateUserProfileAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const currentAccount = yield select(currentAccountSelector);
      const {data, success}: ResponseUpdateUserProfileApi = yield call(
        userApis.updateUserInfoApi,
        currentAccount.user_id,
        params.name,
        params.email,
        params.bio,
      );
      console.log('data', data);
      callback({data, success});
      yield put(userActions.saveUserProfileAction(userProfileModel(data)));
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
  });
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
