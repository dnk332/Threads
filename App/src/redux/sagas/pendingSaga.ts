import {all, put, select, takeEvery} from 'redux-saga/effects';
import {
  ITryRecallAction,
  PendingActionType,
} from '@appRedux/actions/types/pendingActionType';
import {pendingActionSelector} from '@appRedux/selectors/pendingSelector';
import {logoutAction} from '@appRedux/actions/authAction';
import {IUserAction} from '@appRedux/actions/types/userActionTypes';
import {IPostAction} from '@appRedux/actions/types/postActionTypes';
import {ILikeAction} from '@appRedux/actions/types/likeActionTypes';
import {IAuthAction} from '@appRedux/actions/types/authActionTypes';
import {pendingActions} from '@actions';

function* tryRecallSaga(action: ITryRecallAction) {
  const pendingAction: IUserAction | IPostAction | ILikeAction | IAuthAction =
    yield select(pendingActionSelector);
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
