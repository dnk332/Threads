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
import {Callback} from '@actionTypes/actionTypeBase';

const {authApis} = api;

function* loginSaga({type, payload}: ILoginAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
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
    null,
    false,
    type,
    function* rollback(error) {
      showAlert({
        title: 'Error',
        message: error.message,
        buttons: [{text: 'OK'}],
        cancelable: false,
      });
      Navigator.goBack();
    },
  );
}

function* registerSaga({type, payload}: IRegisterAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const {data, success}: ResponseRegisterApi = yield call(
        authApis.registerApi,
        params.username,
        params.password,
      );
      callback({data, success});
    },
    null,
    false,
    type,
    function* rollback(error) {
      showAlert({
        title: 'Error',
        message: error.message,
        buttons: [{text: 'OK'}],
        cancelable: false,
      });
      callback({success: false});
    },
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
        yield put(authActions.logoutAction());
        return;
      }
      if (accessToken) {
        try {
          const {data, success}: ResponseVerifyTokenApi = yield call(
            authApis.verifyAccessTokenApi,
            accessToken,
          );
          if (data.message === 'jwt_auth_valid_token') {
            callback({success});
            return;
          }
        } catch (error) {
          console.log('verify token fail');
        }
      }
      if (refreshToken) {
        const checkToken: Callback = ({success, data}) => {
          if (data.access_token) {
            put(
              authActions.setTokenAction(
                data.access_token,
                data.access_token_expires_at,
              ),
            );
            callback({success});
            return;
          } else {
            callback({success: false, message: 'all tokens are expired'});
          }
        };
        yield put(authActions.refreshTokenAction(checkToken));
      }
    },
    () => {},
    false,
    type,
    () => {},
  );
}

function* refreshTokenSaga({type, payload}: IRefreshTokenAction) {
  const {callback} = payload || {};
  yield invoke(
    function* execution() {
      const refreshToken = yield select(refreshTokenSelector);
      const {data, success}: ResponseRefreshTokenApi = yield call(
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
      }
      callback({success, data});
    },
    () => {},
    false,
    type,
    () => {},
  );
}

function* logoutSaga({type}: ILogoutAction) {
  yield invoke(
    function* execution() {
      // yield call(authApis.logoutApi);
      yield put(authActions.setTokenAction(null, null));
      yield put(authActions.setRefreshTokenAction(null));
      yield put(userActions.saveUserProfileAction(null));
      Navigator.navigateAndSimpleReset(SCREEN_NAME.LOGIN);
    },
    () => {},
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

function* watchRefreshToken() {
  yield takeEvery(AuthActionType.REFRESH_TOKEN, refreshTokenSaga);
}

function* watchLogout() {
  yield takeEvery(AuthActionType.LOGOUT, logoutSaga);
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
