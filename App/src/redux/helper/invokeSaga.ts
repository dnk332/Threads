import {put} from 'redux-saga/effects';
import {authActions, loadingActions, pendingActions} from '@actions';
import {
  CustomError,
  handleErrorMessage,
  isNetworkError,
  isUnauthorizedError,
} from './handleErrorMessage';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
import {IListAllAction} from '@appRedux/actions/types/pendingActionType';
import {isFunction} from 'formik';

const {
  showLoadingAction,
  onFetchingAction,
  nonFetchingAction,
  hideLoadingAction,
} = loadingActions;

interface InvokeParams {
  execution: () => any;
  errorCallback?: ((error: CustomError) => any) | null;
  retryCallAction?: IListAllAction | null;
  showLoading?: boolean;
  actionType?: string;
}

export function* invoke({
  execution,
  errorCallback = null,
  retryCallAction = null,
  showLoading = false,
  actionType,
}: InvokeParams) {
  try {
    if (showLoading) {
      yield put(showLoadingAction(actionType));
    }
    yield put(onFetchingAction(actionType));
    yield* execution();
  } catch (error) {
    yield handleSagaError(error as CustomError, errorCallback, retryCallAction);
  } finally {
    yield put(nonFetchingAction(actionType));
    if (showLoading) {
      yield put(hideLoadingAction(actionType));
    }
  }
}

function* handleSagaError(
  error: CustomError,
  errorCallback: ((error: CustomError) => any) | null,
  retryCallAction: IListAllAction | null = null,
) {
  if (isNetworkError(error) && errorCallback) {
    yield errorCallback({
      message: 'Network issue. Please try again later',
      response: {status: 502},
    });
    return;
  }

  if (retryCallAction) {
    console.log('add pending action', retryCallAction);
    yield put(pendingActions.addPendingAction(retryCallAction));
  }

  if (isUnauthorizedError(error) && retryCallAction) {
    const callback: Callback = ({success}) => {
      if (success && retryCallAction) {
        console.log('call pending action');
        put(pendingActions.tryRecallAction());
      }
    };
    yield put(authActions.refreshTokenAction(callback));
  }

  const errorMessage = handleErrorMessage(error);
  const message = Array.isArray(errorMessage.message)
    ? errorMessage.message[0]
    : errorMessage.message;

  if (isFunction(errorCallback)) {
    yield errorCallback(message);
  }
}
