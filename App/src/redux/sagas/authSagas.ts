import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import {actionTypes, authActions} from '@actions';
import api from '@apis';
import {invoke} from '@appRedux/sagaHelper/sagas';
import * as Navigator from '@navigators';
import {userActions} from '@actions';
import {accessTokenSelector, refreshTokenSelector} from '../selectors';
import {refreshAccessTokenApi} from '@src/apis/authApis';
import {saveTokenAction} from '../actions/auth';

const {AUTH} = actionTypes;
const {authApis} = api;

function* onLogin({type, payload}) {
  const {params, callback} = payload;

  yield invoke(
    function* execution() {
      Navigator.navigateAndSimpleReset('LOADING_INFO');
      const response = yield call(authApis.loginApi, params);

      callback?.({
        success: response.code === 200,
        message: response.message ?? response.msg,
      });

      if (response.success) {
        yield put(authActions.saveTokenAction(response.access_token));
        yield put(authActions.saveRefreshTokenAction(response.refresh_token));
        yield put(userActions.updateUserInfoAction(response.user));
        Navigator.navigateAndSimpleReset('ROOT');
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
function* onRegister({type, payload}) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const response = yield call(authApis.registerApi, params);

      callback?.(response);
      if (response.success) {
        yield put(authActions.addAccountInfoAction(params));
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
function* onAuthCheck({type, payload}) {
  const {callback} = payload;

  yield invoke(
    function* execution() {
      console.log('run auth check');
      const refreshToken = yield select(refreshTokenSelector);
      const accessToken = yield select(accessTokenSelector);

      if (!refreshToken && !accessToken) {
        callback?.({success: false, message: 'no token'});
      }

      if (accessToken) {
        const response = yield call(authApis.verifyAccessTokenApi, accessToken);
        if (response.code === 'jwt_auth_valid_token') {
          callback?.({success: true});
          return;
        }
      }

      if (refreshToken) {
        const response = yield call(refreshAccessTokenApi, refreshToken);
        if (response && response['accessToken']) {
          yield put(saveTokenAction(response['accessToken']));
          callback?.({success: true});
          return;
        }
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

function* watchLogin() {
  yield takeEvery(AUTH.LOGIN, onLogin);
}

function* watchRegister() {
  yield takeEvery(AUTH.REGISTER, onRegister);
}

function* watchAuthCheck() {
  yield takeEvery(AUTH.AUTH_CHECK, onAuthCheck);
}

export default function* authSagas() {
  yield all([watchLogin(), watchRegister(), watchAuthCheck()]);
}
