import {all, put, select, takeEvery} from 'redux-saga/effects';

import {actionTypes, authActions} from '@actions';
import {domainSelector} from '@selectors';
import {Setting} from '@configs';
import * as TimeAgo from '@hooks/TimeAgo';
import _ from 'lodash';

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

  const checkAuth = ({
    success,
    message = '',
  }: {
    success: boolean;
    message?: string;
  }) => {
    if (_.isEmpty(message) || !success) {
      action.callback?.({accessAble: false});
      return;
    }
    action.callback?.({accessAble: true});
  };

  yield put(authActions.authCheckAction(checkAuth));
}

function* watchStartApplication() {
  yield takeEvery(APP.START_APPLICATION, onStartApplication);
}

export default function* applicationSagas() {
  yield all([watchStartApplication()]);
}
