import {all, call, takeLatest} from 'redux-saga/effects';

import api from '@src/services/apis';
import {ResponseGetUserProfileApi} from '@src/services/apiTypes/userApiTypes';
import {invoke} from '../sagaHelper/invokeSaga';
import {
  IGetListAllPostAction,
  PostActionType,
} from '../actionTypes/postActionTypes';

const {postApis} = api;

function* getListAllPostSaga({type, payload}: IGetListAllPostAction) {
  const {params, callback} = payload;
  yield invoke(
    function* execution() {
      const response: ResponseGetUserProfileApi = yield call(
        postApis.getListAllPostApi,
        params.limit,
        params.offset,
      );
      console.log('getListAllPostSaga response', response);
      yield callback({
        success: true,
        data: response,
      });
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
  yield all([watchGetListAllPost]);
}
