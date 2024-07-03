import {all, put, select, takeEvery} from 'redux-saga/effects';

import {actionTypes, authActions} from '@actions';
import {domainSelector} from '@selectors';
import {Setting} from '@configs';
import * as TimeAgo from '@hooks/TimeAgo';
import _ from 'lodash';
import {AppActionType, IStartAction} from '../actionTypes/appActionTypes';
import {invoke} from '../sagaHelper/invokeSaga';

const {APP} = actionTypes;

function* startApplicationSaga({type, payload}: IStartAction) {
  const {callback} = payload;
  yield invoke(
    function* execution() {
      TimeAgo.SetUpTime();
      const domain = yield select(domainSelector);
      console.log('domain', domain);
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
        if (!_.isEmpty(message) || !success) {
          callback({
            success: false,
          });
          return;
        }
        callback({
          success: true,
        });
      };
      yield put(authActions.authCheckAction(checkAuth));
    },
    error => {
      callback({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* watchStartApplication() {
  yield takeEvery(AppActionType.START_APPLICATION, startApplicationSaga);
}

export default function* applicationSagas() {
  yield all([watchStartApplication()]);
}
