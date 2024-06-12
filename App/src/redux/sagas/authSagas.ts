import {all, call, takeEvery} from 'redux-saga/effects';
import {actionTypes} from '@actions';
import api from '@apis';
import {invoke} from '../sagaHelper/sagas';

const {USER} = actionTypes;

/**
 * handle register
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* onRegister({type, params, callback}) {
  console.log('onRegister', {type, params, callback});
  yield invoke(
    function* execution() {
      console.log('run onRegister');
      try {
        const response = yield call(api.authApis.register, params);
        callback?.({
          success: response.code === 200,
          message: response.message ?? response.msg,
        });
        console.log('saga response', response);
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

function* watchRegister() {
  yield takeEvery(USER.REGISTER.HANDLER, onRegister);
}

export default function* authSagas() {
  yield all([watchRegister()]);
}
