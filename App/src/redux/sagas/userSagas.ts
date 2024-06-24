import {all, call, put, takeLatest} from 'redux-saga/effects';

import {actionTypes, userActions} from '@actions';
import api from '@apis';
import {invoke} from '@appRedux/sagaHelper/sagas';

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
        yield put(userActions.updateUserInfoAction(response));
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

export default function* userSagas() {
  yield all([watchGetUserInfo()]);
}
