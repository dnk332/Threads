import {all, call, takeLatest} from 'redux-saga/effects';

import api from '@src/services/apis';
import {invoke} from '@appRedux/helper/invokeSaga';
import {
  ICreatePostAction,
  IGetListAllPostAction,
  PostActionType,
} from '@appRedux/actions/types/postActionTypes';
import {
  ResponseCreatePostApi,
  ResponseGetListAllPostApi,
} from '@src/services/apiTypes/postApiTypes';

const {postApis} = api;

function* getListAllPostSaga({payload}: IGetListAllPostAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const {data}: ResponseGetListAllPostApi = yield call(
        postApis.getListAllPostApi,
        params.pageId,
        params.pageSize,
      );
      callback({success: true, data});
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
  });
}

function* createPostSaga({payload}: ICreatePostAction) {
  const {params, callback} = payload;
  yield invoke({
    execution: function* execution() {
      const {data}: ResponseCreatePostApi = yield call(
        postApis.createPostApi,
        params.author_id,
        params.text_content,
      );
      callback({success: true, data});
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
  });
}

function* watchGetListAllPost() {
  yield takeLatest(PostActionType.GET_LIST_ALL_POST, getListAllPostSaga);
}

function* watchCreatePost() {
  yield takeLatest(PostActionType.CREATE_POST, createPostSaga);
}

export default function* postSagas() {
  yield all([watchGetListAllPost(), watchCreatePost()]);
}
