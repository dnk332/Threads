import {all, call, takeEvery} from 'redux-saga/effects';

import api from '@src/services/apis';
import {invoke} from '@appRedux/helper/invokeSaga';
import {
  IUploadImageAction,
  OtherActionType,
} from '@appRedux/actions/types/otherActionTypes';
import {ResponseUploadImageApi} from '@apiTypes/otherApiTypes';

const {otherApis} = api;

function* uploadImageSaga(action: IUploadImageAction) {
  const {params, callback} = action.payload;
  console.log('uploadImageSaga started', action);

  yield invoke({
    execution: function* execution() {
      const {data}: ResponseUploadImageApi = yield call(
        otherApis.uploadImageApi,
        params,
      );
      callback({success: true, data});
    },
    errorCallback: error => {
      callback({success: false, message: error.message});
    },
    retryCallAction: action,
  });
}

function* watchUploadImage() {
  yield takeEvery(OtherActionType.UPLOAD_IMAGE, uploadImageSaga);
}

export default function* otherSagas() {
  yield all([watchUploadImage()]);
}
