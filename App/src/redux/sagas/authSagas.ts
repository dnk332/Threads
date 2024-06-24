import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import {actionTypes, authActions} from '@actions';
import api from '@apis';
import {invoke} from '@appRedux/sagaHelper/sagas';
import * as Navigator from '@navigators';
import {userActions} from '@actions';
import {accessTokenSelector, refreshTokenSelector} from '../selectors';
import {refreshAccessTokenApi} from '@src/apis/authApis';
import {saveTokenAction} from '../actions/auth';
import SCREEN_NAME from '@src/navigation/ScreenName';

const {AUTH} = actionTypes;
const {authApis} = api;

function* onLogin({type, payload}) {
  const {params, callback} = payload;

  yield invoke(
    function* execution() {
      Navigator.navigateAndSimpleReset(SCREEN_NAME.LOADING_INFO);
      const response = yield call(authApis.loginApi, params);

      callback?.({
        success: response.code === 200,
        message: response.message ?? response.msg,
      });

      if (response.success) {
        yield put(authActions.saveTokenAction(response.access_token));
        yield put(authActions.saveRefreshTokenAction(response.refresh_token));
        yield put(authActions.updateCurrentAccountAction(response.user));
        Navigator.navigateAndSimpleReset(SCREEN_NAME.ROOT);
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
      yield put(userActions.saveUserInfoAction(null));
      Navigator.navigateAndSimpleReset(SCREEN_NAME.LOGIN);
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
