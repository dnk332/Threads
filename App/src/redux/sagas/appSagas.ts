import {all, put, select, takeEvery} from 'redux-saga/effects';

import {actionTypes} from '@actions';
import {domainSelector} from '@selectors';
import {Setting} from '@configs';
import * as TimeAgo from '@hooks/TimeAgo';

const {APP} = actionTypes;

function* onStartApplication(action) {
  TimeAgo.SetUpTime();

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
