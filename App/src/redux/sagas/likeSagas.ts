import {all, call, takeLatest} from 'redux-saga/effects';

import api from '@src/services/apis';
import {invoke} from '../sagaHelper/invokeSaga';
import {
  IToggleLikePostAction,
  LikeActionType,
} from '../actionTypes/likeActionTypes';
import {
  ResponseLikePostApi,
  ResponseUnlikePostApi,
} from '@src/services/apiTypes/likeApiTypes';

const {likeApis} = api;

function* toggleLikePostSaga({type, payload}: IToggleLikePostAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const {postId, action} = params;
      const {data, success}: ResponseLikePostApi | ResponseUnlikePostApi =
        yield call(
          action === 'like' ? likeApis.likePostApi : likeApis.unlikePostApi,
          postId,
        );
      yield callback({success, data});
    },
    error => {
      callback({success: false, message: error.message});
    },
    false,
    type,
    () => {},
  );
}

function* watchToggleLikePost() {
  yield takeLatest(LikeActionType.TOGGLE_LIKE, toggleLikePostSaga);
}

export default function* likeSagas() {
  yield all([watchToggleLikePost()]);
}
