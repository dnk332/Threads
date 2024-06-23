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
      console.log('run onRegister');
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
function* onAuthCheck(actions) {
  const {callback} = actions.payload || {};

  const {refreshToken, accessToken} = yield all({
    refreshToken: select(refreshTokenSelector),
    accessToken: select(accessTokenSelector),
  });

  if (!refreshToken && !accessToken) {
    callback?.({success: false, message: 'no token'});
    return;
  }

  if (accessToken) {
    try {
      const {code} = yield call(authApis.verifyAccessTokenApi, {
        access_token: accessToken,
      });
      if (code === 'jwt_auth_valid_token') {
        callback?.({success: true});
        return;
      }
    } catch (error) {
      console.log('verify token fail');
    }
  }

  if (refreshToken) {
    const {access_token} = yield call(refreshAccessTokenApi, {
      refresh_token: refreshToken,
    }) || {};
    if (access_token) {
      yield put(saveTokenAction(access_token));
      callback?.({success: true});
      return;
    }
  }

  callback?.({success: false, message: 'token verification failed'});
}

function* onLogout({type, payload}) {
  const {callback} = payload;

  yield invoke(
    function* execution() {
      yield call(authApis.logoutApi, null);
      yield put(authActions.saveTokenAction(null));
      yield put(authActions.saveRefreshTokenAction(null));
      yield put(userActions.updateUserInfoAction({}));
      Navigator.navigateAndSimpleReset('LOGIN');
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
function* watchLogout() {
  yield takeEvery(AUTH.LOGOUT, onLogout);
}

export default function* authSagas() {
  yield all([watchLogin(), watchRegister(), watchAuthCheck(), watchLogout()]);
}
