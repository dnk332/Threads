import {all, put, select, takeEvery} from 'redux-saga/effects';

import {actionTypes} from '@actions';
import {domainSelector} from '@selectors';
import {Setting} from '@configs';

const {APP} = actionTypes;

function* onStartApplication(action) {
  const domain = yield select(domainSelector);
  yield all([
    yield put({
      type: APP.SAVE_DOMAIN,
      domain: domain ?? Setting.domain,
    }),
  ]);
  action.callback?.({success: true});
}

function* watchStartApplication() {
  yield takeEvery(APP.START_APPLICATION, onStartApplication);
}

export default function* applicationSagas() {
  yield all([watchStartApplication()]);
}
