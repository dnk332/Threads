import {all, put, select, takeEvery} from 'redux-saga/effects';
import {
  ITryRecallAction,
  PendingActionType,
} from '@actionTypes/pendingActionType';
import {pendingActionSelector} from '@appRedux/selectors/pendingSelector';
import {logoutAction} from '@appRedux/actions/authAction';
import {IUserAction} from '@actionTypes/userActionTypes';
import {IPostAction} from '@actionTypes/postActionTypes';
import {ILikeAction} from '@actionTypes/likeActionTypes';
import {IAuthAction} from '@actionTypes/authActionTypes';
import {pendingActions} from '@actions';

function* tryRecallSaga(action: ITryRecallAction) {
  const pendingAction: IUserAction | IPostAction | ILikeAction | IAuthAction =
    yield select(pendingActionSelector);
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
