import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import {authActions, userActions} from '@actions';
import api from '@src/services/apis';
import {invoke} from '@appRedux/helper/invokeSaga';
import Navigator from '@navigators';
import {accessTokenSelector, refreshTokenSelector} from '@selectors';
import SCREEN_NAME from '@src/navigation/ScreenName';
import showAlert from '@appRedux/helper/handleErrorAlert';

import {
  AuthActionType,
  IAuthCheckAction,
  ILoginAction,
  ILogoutAction,
  IRefreshTokenAction,
  IRegisterAction,
} from '@appRedux/actions/types/authActionTypes';
import {
  ResponseLoginApi,
  ResponseRefreshTokenApi,
  ResponseRegisterApi,
  ResponseVerifyTokenApi,
} from '@src/services/apiTypes/authApiTypes';
import {userModel} from '@src/models/user';
import {refreshTokenAction} from '@appRedux/actions/authAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

const {authApis} = api;

function* loginSaga({payload}: ILoginAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const {data}: ResponseLoginApi = yield call(
        authApis.loginApi,
        params.username,
        params.password,
      );
      Navigator.navigateTo(SCREEN_NAME.LOADING_INFO);
      yield put(
        authActions.setTokenAction(
          data.access_token,
          data.access_token_expires_at,
        ),
      );
      yield put(authActions.setRefreshTokenAction(data.refresh_token));
      yield put(authActions.setAccountInfoAction(userModel(data.user)));
      yield put(authActions.setListAccountInfoAction(userModel(data.user)));
      callback({data, success: true});
    },
    errorCallback: error => {
      showAlert({
        title: 'Error',
        message: error.message,
        buttons: [{text: 'OK'}],
        cancelable: false,
      });
      callback({success: false});
    },
  });
}

function* registerSaga({payload}: IRegisterAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const {data}: ResponseRegisterApi = yield call(
        authApis.registerApi,
        params.username,
        params.password,
      );
      console.log('success');
      callback({data, success: true});
    },
    errorCallback: error => {
      console.log('error', error);
      showAlert({
        title: 'Error',
        message: error.message,
        buttons: [{text: 'OK'}],
        cancelable: false,
      });
      callback({success: false});
    },
  });
}

function* logoutSaga({}: ILogoutAction) {
  // yield call(authApis.logoutApi);
  yield put(authActions.setTokenAction(null, null));
  yield put(authActions.setRefreshTokenAction(null));
  yield put(userActions.saveUserProfileAction(null));
  Navigator.navigateAndSimpleReset(SCREEN_NAME.LOGIN, 0);
}

function* authCheckSaga({payload}: IAuthCheckAction) {
  const {callback} = payload || {};
  // Use selectors for both tokens
  const {accessToken, refreshToken} = yield all({
    accessToken: select(accessTokenSelector),
    refreshToken: select(refreshTokenSelector),
  });
  if (!refreshToken && !accessToken) {
    callback({success: false, message: 'no token'});
    return;
  }
  // Check if access token is valid
  try {
    const {data}: ResponseVerifyTokenApi = yield call(
      authApis.verifyAccessTokenApi,
      accessToken,
    );

    if (data.message === 'jwt_auth_valid_token') {
      callback({success: true});
      return;
    }
  } catch (e) {
    console.error('Access token verification failed:', e);
  }

  // If access token is expired, try refreshing it
  try {
    const callbackRefreshToken: Callback = ({success}) => {
      if (success) {
        callback({success});
        return;
      }
      callback({success: false});
    };
    yield put(refreshTokenAction(callbackRefreshToken));
  } catch (e) {
    console.error('Token refresh failed:', e);
    callback({success: false, message: 'token refresh error'});
    yield put(authActions.logoutAction());
  }
}

function* refreshTokenSaga({payload}: IRefreshTokenAction) {
  const {callback} = payload;
  const refreshToken = yield select(refreshTokenSelector);
  try {
    const {data}: ResponseRefreshTokenApi = yield call(
      authApis.refreshAccessTokenApi,
      refreshToken,
    );

    if (data.access_token) {
      yield put(
        authActions.setTokenAction(
          data.access_token,
          data.access_token_expires_at,
        ),
      );
      callback({success: true, data});
    } else {
      callback({success: false});
      yield put(authActions.logoutAction());
    }
  } catch (e) {
    console.error('Token refresh failed:', e);
    callback({success: false});
    yield put(authActions.logoutAction());
  }
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

function* watchRefreshToken() {
  yield takeEvery(AuthActionType.REFRESH_TOKEN, refreshTokenSaga);
}

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchAuthCheck(),
    watchLogout(),
    watchRefreshToken(),
  ]);
}
