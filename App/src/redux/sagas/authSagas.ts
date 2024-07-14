import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import {authActions, userActions} from '@actions';
import api from '@src/services/apis';
import {invoke} from '@appRedux/sagaHelper/invokeSaga';
import Navigator from '@navigators';
import {accessTokenSelector, refreshTokenSelector} from '@selectors';
import SCREEN_NAME from '@src/navigation/ScreenName';
import showAlert from '@appRedux/sagaHelper/handleErrorAlert';

import {
  AuthActionType,
  IAuthCheckAction,
  ILoginAction,
  ILogoutAction,
  IRefreshTokenAction,
  IRegisterAction,
} from '@actionTypes/authActionTypes';
import {
  ResponseLoginApi,
  ResponseRefreshTokenApi,
  ResponseRegisterApi,
  ResponseVerifyTokenApi,
} from '@src/services/apiTypes/authApiTypes';
import {userModel} from '@src/models/user';
import {refreshTokenAction} from '@appRedux/actions/authAction';
import {Callback} from '@actionTypes/actionTypeBase';

const {authApis} = api;

function* loginSaga({payload}: ILoginAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      Navigator.navigateTo(SCREEN_NAME.LOADING_INFO);
      const {data, success}: ResponseLoginApi = yield call(
        authApis.loginApi,
        params.username,
        params.password,
      );
      if (success) {
        yield put(
          authActions.setTokenAction(
            data.access_token,
            data.access_token_expires_at,
          ),
        );
        yield put(authActions.setRefreshTokenAction(data.refresh_token));
        yield put(authActions.setAccountInfoAction(userModel(data.user)));
        yield put(authActions.setListAccountInfoAction(userModel(data.user)));
        Navigator.navigateAndSimpleReset(SCREEN_NAME.ROOT);
      }
      callback({data, success});
    },
    errorCallback: function* rollback(error) {
      showAlert({
        title: 'Error',
        message: error.message,
        buttons: [{text: 'OK'}],
        cancelable: false,
      });
      Navigator.goBack();
    },
  });
}

function* registerSaga({payload}: IRegisterAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const {data, success}: ResponseRegisterApi = yield call(
        authApis.registerApi,
        params.username,
        params.password,
      );
      callback({data, success});
    },
    errorCallback: function* rollback(error) {
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
    const {data, success}: ResponseVerifyTokenApi = yield call(
      authApis.verifyAccessTokenApi,
      accessToken,
    );

    if (data.message === 'jwt_auth_valid_token') {
      callback({success});
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
    const {data, success}: ResponseRefreshTokenApi = yield call(
      authApis.refreshAccessTokenApi,
      refreshToken,
    );

    if (success && data.access_token) {
      yield put(
        authActions.setTokenAction(
          data.access_token,
          data.access_token_expires_at,
        ),
      );
      callback({success, data});
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
