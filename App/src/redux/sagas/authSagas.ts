import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import {authActions} from '@actions';
import api from '@src/services/apis';
import {invoke} from '@appRedux/sagaHelper/sagas';
import * as Navigator from '@navigators';
import {userActions} from '@actions';
import {accessTokenSelector, refreshTokenSelector} from '../selectors';
import {refreshAccessTokenApi} from '@src/services/apis/authApis';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {
  AuthActionType,
  IAuthCheckAction,
  ILoginAction,
  ILogoutAction,
  IRegisterAction,
} from '../actionTypes/authActionTypes';
import {
  ResponseLoginApi,
  ResponseRefreshTokenApi,
  ResponseRegisterApi,
  ResponseVerifyTokenApi,
} from '@src/services/apiTypes/authApiTypes';

const {authApis} = api;

function* loginSaga({type, payload}: ILoginAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      Navigator.navigateAndSimpleReset(SCREEN_NAME.LOADING_INFO);
      const response: ResponseLoginApi = yield call(
        authApis.loginApi,
        params.username,
        params.password,
      );
      const data = response.data;
      callback({
        data: data,
        success: response.success,
      });
      if (response.success) {
        yield put(
          authActions.setTokenAction(
            data.access_token,
            data.access_token_expires_at,
          ),
        );
        yield put(authActions.setRefreshTokenAction(data.refresh_token));
        yield put(authActions.setAccountInfoAction(data.user));
        Navigator.navigateAndSimpleReset(SCREEN_NAME.ROOT);
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
function* registerSaga({type, payload}: IRegisterAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const response: ResponseRegisterApi = yield call(
        authApis.registerApi,
        params.username,
        params.password,
      );
      const data = response.data;
      callback({
        data: data,
        success: response.success,
      });
      if (response.success) {
        yield put(authActions.setAccountInfoAction(response.data.user));
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
function* authCheckSaga({type, payload}: IAuthCheckAction) {
  const {callback} = payload || {};
  yield invoke(
    function* execution() {
      const {refreshToken, accessToken} = yield all({
        refreshToken: select(refreshTokenSelector),
        accessToken: select(accessTokenSelector),
      });

      if (!refreshToken && !accessToken) {
        callback({success: false, message: 'no token'});
        return;
      }

      if (accessToken) {
        try {
          const response: ResponseVerifyTokenApi = yield call(
            authApis.verifyAccessTokenApi,
            accessToken,
          );
          if (response.data.code === 'jwt_auth_valid_token') {
            callback({success: true});
            return;
          }
        } catch (error) {
          console.log('verify token fail');
        }
      }

      if (refreshToken) {
        const response: ResponseRefreshTokenApi = yield call(
          refreshAccessTokenApi,
          refreshToken,
        ) || {};
        if (response.data.access_token) {
          yield put(
            authActions.setTokenAction(
              response.data.access_token,
              response.data.access_token_expires_at,
            ),
          );
          callback({success: true});
          return;
        }
      }
    },
    () => {
      put(authActions.logoutAction());
    },
    false,
    type,
    () => {},
  );
}

function* logoutSaga({type, payload}: ILogoutAction) {
  const {callback} = payload;

  yield invoke(
    function* execution() {
      yield call(authApis.logoutApi);
      yield put(authActions.setTokenAction(null, null));
      yield put(authActions.setRefreshTokenAction(null));
      yield put(userActions.saveUserInfoAction(null));
      Navigator.navigateAndSimpleReset(SCREEN_NAME.LOGIN);
    },
    error => {
      callback({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* watchLogin() {
  yield takeEvery(AuthActionType.LOGIN, loginSaga);
}

function* watchRegister() {
  yield takeEvery(AuthActionType.REGISTER, registerSaga);
}

function* watchAuthCheck() {
  yield takeEvery(AuthActionType.AUTH_CHECK, authCheckSaga);
}
function* watchLogout() {
  yield takeEvery(AuthActionType.LOGOUT, logoutSaga);
}

export default function* authSagas() {
  yield all([watchLogin(), watchRegister(), watchAuthCheck(), watchLogout()]);
}
