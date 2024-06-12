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
      try {
        const response = yield call(api.authApis.login, params);

        callback?.({
          success: response.code === 200,
          message: response.message ?? response.msg,
        });
        console.log('response', response);
        if (response.success) {
          yield put(authActions.onLoginSuccess(response.access_token));
          yield put(userActions.onUpdateUserInfoSuccess(response.user));

          Navigator.navigateTo('ROOT');
        }
      } catch (error) {
        callback?.({success: false, message: error.message});
      }
    },
    () => {},
    false,
    type,
    () => {},
  );
}
function* onRegister({type, payload}) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      try {
        const response = yield call(api.authApis.register, params);
        callback?.({
          success: response.code === 200,
          message: response.message ?? response.msg,
        });
      } catch (error) {
        callback?.({success: false, message: error.message});
      }
    },
    () => {},
    false,
    type,
    () => {},
  );
}

function* watchLogin() {
  yield takeEvery(AUTH.LOGIN.HANDLER, onLogin);
}

function* watchRegister() {
  yield takeEvery(AUTH.REGISTER.HANDLER, onRegister);
}

export default function* authSagas() {
  yield all([watchLogin(), watchRegister()]);
}
