import {all, call, select, takeLatest} from 'redux-saga/effects';

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
import {currentAccountSelector} from '@selectors';
import {IUser} from '@src/types/user';
import {ResponseUploadImageApi} from '@apiTypes/otherApiTypes';

const {postApis, otherApis} = api;

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
      const account: IUser = yield select(currentAccountSelector);

      const listImage: ResponseUploadImageApi = yield call(
        otherApis.uploadImageApi,
        params.images,
      );
      console.log('listImage', listImage);
      const {data}: ResponseCreatePostApi = yield call(
        postApis.createPostApi,
        account.user_id,
        params.text_content,
        listImage.data,
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
