import {all, call, takeLatest} from 'redux-saga/effects';

import api from '@src/services/apis';
import {invoke} from '@appRedux/helper/invokeSaga';
import {
  IToggleLikePostAction,
  LikeActionType,
} from '@appRedux/actions/types/likeActionTypes';
import {
  ResponseLikePostApi,
  ResponseUnlikePostApi,
} from '@src/services/apiTypes/likeApiTypes';

const {likeApis} = api;

function* toggleLikePostSaga(action: IToggleLikePostAction) {
  const {params, callback} = action.payload;
  const {postId, status} = params;

  yield invoke({
    execution: function* execution() {
      const {data}: ResponseLikePostApi | ResponseUnlikePostApi = yield call(
        status === 'like' ? likeApis.likePostApi : likeApis.unlikePostApi,
        postId,
      );
      callback({success: true, data});
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
    retryCallAction: action,
  });
}

function* watchToggleLikePost() {
  yield takeLatest(LikeActionType.TOGGLE_LIKE, toggleLikePostSaga);
}

export default function* likeSagas() {
  yield all([watchToggleLikePost()]);
}
