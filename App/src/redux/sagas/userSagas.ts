import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import {actionTypes, userActions} from '@actions';
import api from '@apis';
import {invoke} from '@appRedux/sagaHelper/sagas';
import {currentAccountSelector} from '../selectors';

const {USER} = actionTypes;
const {userApis} = api;

function* getUserInfo({type, payload}) {
  const {user_id, callback} = payload;
  yield invoke(
    function* execution() {
      const response = yield call(userApis.getUserInfoApi, user_id);

      yield callback?.({
        success: true,
        data: response,
      });

      if (response.success) {
        yield put(userActions.saveUserInfoAction(response));
      }
    },
    error => {
      callback?.({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* updateUserInfo({type, payload}) {
  const {name, email, bio, callback} = payload;
  yield invoke(
    function* execution() {
      const currentAccount = yield select(currentAccountSelector);
      const response = yield call(userApis.updateUserInfoApi, {
        user_id: currentAccount.user_id,
        name,
        email,
        bio,
      });

      yield callback?.({
        success: true,
        data: response,
      });

      if (response.success) {
        yield put(userActions.saveUserInfoAction(response));
      }
    },
    error => {
      callback?.({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* watchGetUserInfo() {
  yield takeLatest(USER.GET_USER_INFO, getUserInfo);
}

function* watchUpdateUserInfo() {
  yield takeLatest(USER.UPDATE_INFO, updateUserInfo);
}

export default function* userSagas() {
  yield all([watchGetUserInfo(), watchUpdateUserInfo()]);
}
