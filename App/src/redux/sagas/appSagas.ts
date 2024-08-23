import {all, put, select, takeEvery} from 'redux-saga/effects';

import {appActions, authActions} from '@actions';
import {domainSelector} from '@selectors';
import {Setting} from '@configs';
import * as TimeAgo from '@hooks/hookTime/SetUpTime';
import _ from 'lodash';
import {
  AppActionType,
  IStartAction,
} from '@appRedux/actions/types/appActionTypes';
import {invoke} from '@appRedux/helper/invokeSaga';

function* startApplicationSaga({payload}: IStartAction) {
  const {callback} = payload;
  yield invoke({
    execution: function* execution() {
      TimeAgo.SetUpTime();
      const domain: string | null = yield select(domainSelector);
      yield put(appActions.setDomainAction(domain ?? Setting.domain));
      const checkAuth = ({
        success,
        message = '',
      }: {
        success: boolean;
        message?: string;
      }) => {
        if (!_.isEmpty(message) || !success) {
          callback({success: false});
          return;
        }
        callback({success: true});
      };
      yield put(authActions.authCheckAction(checkAuth));
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
  });
}

function* watchStartApplication() {
  yield takeEvery(AppActionType.START_APPLICATION, startApplicationSaga);
}

export default function* applicationSagas() {
  yield all([watchStartApplication()]);
}
