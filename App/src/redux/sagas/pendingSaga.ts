import {all, put, select, takeEvery} from 'redux-saga/effects';
import {
  IListAllAction,
  ITryRecallAction,
  PendingActionType,
} from '@appRedux/actions/types/pendingActionType';
import {pendingActionSelector} from '@appRedux/selectors/pendingSelector';
import {logoutAction} from '@appRedux/actions/authAction';
import {pendingActions} from '@actions';

function* tryRecallSaga(action: ITryRecallAction) {
  const pendingAction: IListAllAction = yield select(pendingActionSelector);
  console.log('pendingAction', pendingAction);
  try {
    yield put(pendingAction);
    // Clear action if recall success
    yield put(pendingActions.clearPendingAction());
  } catch (e) {
    console.error('Got some error with action: ', action, ' ERROR: ', e);
    yield put(logoutAction());
  }
}

function* watchTryRecall() {
  yield takeEvery(PendingActionType.TRY_RECALL, tryRecallSaga);
}

export default function* pendingSaga() {
  yield all([watchTryRecall()]);
}
