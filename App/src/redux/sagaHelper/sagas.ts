import {put, select} from 'redux-saga/effects';
import {
  showLoading,
  onFetching,
  nonFetching,
  hideLoading,
} from '~/appRedux/action/loadingActions';
import {handleErrorMessage} from './handleError';
import {logoutSuccess} from '../actions/userActions';
import APIUtils from './apiUtils';

export function* invoke(execution, handleError, showDialog, actionType) {
  try {
    // const isConnected = yield select(getIsConnectedSelector);
    if (showDialog) {
      yield put(showLoading(actionType));
    }
    yield put(onFetching(actionType));
    yield* execution();
    yield put(nonFetching(actionType));
    if (showDialog) {
      yield put(hideLoading(actionType));
    }
  } catch (error) {
    console.info(`Saga Invoke Error [${actionType}]>>>>>`, {error});
    yield put(nonFetching(actionType));
    if (showDialog) {
      yield put(hideLoading(actionType));
    }
    const errorMessage = handleErrorMessage(error);
    if (errorMessage && errorMessage.status === 'EXP_TOKEN') {
      yield put(logoutSuccess());
      APIUtils.setAccessToken(null);
    }
    if (typeof handleError === 'function') {
      yield handleError(errorMessage);
    }
  }
}
