import {all, call, takeLatest} from 'redux-saga/effects';

import api from '@src/services/apis';
import {invoke} from '../sagaHelper/invokeSaga';
import {
  IGetListAllPostAction,
  PostActionType,
} from '../actionTypes/postActionTypes';
import {ResponseGetListAllPostApi} from '@src/services/apiTypes/postApiTypes';

const {postApis} = api;

function* getListAllPostSaga({type, payload}: IGetListAllPostAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const {data, success}: ResponseGetListAllPostApi = yield call(
        postApis.getListAllPostApi,
        params.pageId,
        params.pageSize,
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

function* watchGetListAllPost() {
  yield takeLatest(PostActionType.GET_LIST_ALL_POST, getListAllPostSaga);
}

export default function* postSagas() {
  yield all([watchGetListAllPost()]);
}
