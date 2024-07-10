import {put, select} from 'redux-saga/effects';
import {authActions, loadingActions} from '@actions';
import {refreshTokenSelector} from '@selectors';
import {
  CustomError,
  handleErrorMessage,
  isNetworkError,
  isUnauthorizedError,
} from './handleErrorMessage';
import {Callback} from '@actionTypes/actionTypeBase';

const {
  showLoadingAction,
  onFetchingAction,
  nonFetchingAction,
  hideLoadingAction,
} = loadingActions;
const {logoutAction} = authActions;

export function* invoke(
  execution: () => any,
  handleError: ((error: CustomError) => any) | null,
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
  handleError: ((error: CustomError) => any) | null,
  errorCallback: (error: CustomError) => any,
) {
  const refreshToken = yield select(refreshTokenSelector);
  console.log('>>>>handleSagaError>>>>', error);
  if (isNetworkError(error) && typeof handleError === 'function') {
    yield handleError({
      message: 'Temporary network issue. Please try again later',
      response: {status: 502},
    });
    return;
  }

  if (isUnauthorizedError(error)) {
    if (refreshToken) {
      let callback: Callback = ({success}) => {
        if (!success) {
          put(authActions.logoutAction());
          return;
        }
      };
      yield put(authActions.refreshTokenAction(callback));
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
