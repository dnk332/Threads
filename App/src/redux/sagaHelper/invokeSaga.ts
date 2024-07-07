import {put, select} from 'redux-saga/effects';
import {loadingActions, authActions} from '@actions';
import {accessTokenSelector} from '@selectors';
import {
  CustomError,
  handleErrorMessage,
  isNetworkError,
  isUnauthorizedError,
} from './handleErrorMessage';

const {
  showLoadingAction,
  onFetchingAction,
  nonFetchingAction,
  hideLoadingAction,
} = loadingActions;
const {logoutAction} = authActions;

export function* invoke(
  execution: () => any,
  handleError: (error: CustomError) => any,
  showLoading: boolean,
  actionType: string,
  errorCallback: (error: CustomError) => any,
) {
  try {
    if (showLoading) {
      yield put(showLoadingAction(actionType));
    }
    yield put(onFetchingAction(actionType));
    yield* execution();
  } catch (error) {
    yield handleSagaError(error as CustomError, handleError, errorCallback);
  } finally {
    yield put(nonFetchingAction(actionType));
    if (showLoading) {
      yield put(hideLoadingAction(actionType));
    }
  }
}

function* handleSagaError(
  error: CustomError,
  handleError: (error: CustomError) => any,
  errorCallback: (error: CustomError) => any,
) {
  const token = yield select(accessTokenSelector);

  if (isNetworkError(error)) {
    yield handleError({
      message: 'Temporary network issue. Please try again later',
      response: {status: 502},
    });
    return;
  }

  if (isUnauthorizedError(error)) {
    if (token) {
      yield put(logoutAction());
      return;
    }
  }

  const errorMessage = handleErrorMessage(error);
  const message = Array.isArray(errorMessage.message)
    ? errorMessage.message[0]
    : errorMessage.message;

  if (typeof handleError === 'function') {
    yield handleError(message);
  } else if (errorCallback) {
    yield* errorCallback(message);
  }
}
