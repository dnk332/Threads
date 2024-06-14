import {all, call, put, takeEvery} from 'redux-saga/effects';

import {actionTypes, authActions} from '@actions';
import api from '@apis';
import {invoke} from '@appRedux/sagaHelper/sagas';
import * as Navigator from '@navigators';
import {userActions} from '@actions';

const {AUTH} = actionTypes;

function* onLogin({type, payload}) {
  const {params, callback} = payload;

  yield invoke(
    function* execution() {
      Navigator.navigateAndSimpleReset('LOADING_INFO');
      const response = yield call(api.authApis.login, params);

      callback?.({
        success: response.code === 200,
        message: response.message ?? response.msg,
      });

      if (response.success) {
        yield put(authActions.saveToken(response.access_token));
        yield put(userActions.updateUserInfo(response.user));
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
      const response = yield call(api.authApis.register, params);

      callback?.(response);
      if (response.success) {
        yield put(authActions.addAccountInfo(params));
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

export default function* authSagas() {
  yield all([watchLogin(), watchRegister()]);
}
