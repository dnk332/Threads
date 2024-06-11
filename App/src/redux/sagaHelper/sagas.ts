import {put, select} from 'redux-saga/effects';

import {loadingActions, authActions} from '@actions';

import {handleErrorMessage} from './handleError';
// import i18n from 'i18next';
import {authSelector, connectSelector} from '@selectors';
// import {signOutSubmit} from '@actions/authActions';
// import {Toast} from 'react-native-toast-message/lib/src/Toast';

const {showLoading, onFetching, nonFetching, hideLoading} = loadingActions;
const {signOutSubmit} = authActions;

export function* invoke(
  execution: () => any,
  handleError: any,
  showDialog: boolean,
  actionType: string,
  errorCallback: (error: string) => any,
) {
  try {
    const isConnected = yield select(connectSelector.getIsConnectedSelector);

    if (!isConnected) {
      if (showDialog) {
        // Toast.show({
        //   type: 'error',
        //   props: 'Khong co ket noi mang',
        // });
        // return;
      }
    }
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

    const token = yield select(authSelector.getUserTokenSelector);

    console.log('--------error--------', error);

    if (
      error &&
      error.response &&
      (error.response.status === 401 ||
        error.result === 'expried' ||
        error.response?.data?.result === 'expried')
    ) {
      if (token) {
        yield put(signOutSubmit());
      }
      return;
    }

    const errorMessage = handleErrorMessage(error);
    if (typeof handleError === 'function') {
      yield handleError(errorMessage);
    } else {
      if (Array.isArray(errorMessage?.message)) {
        if (errorCallback) {
          yield* errorCallback(errorMessage?.message[0]);
        } else {
          // yield Toast.show({
          //   type: 'error',
          //   props: {title: errorMessage?.message[0]},
          // });
        }
        //  Alert.alert(errorMessage?.message[0]);
      } else {
        if (errorCallback) {
          yield* errorCallback(errorMessage?.message);
        } else {
          // yield Toast.show({
          //   type: 'error',
          //   props: {title: errorMessage?.message},
          // });
        }
        // yield Alert.alert(errorMessage?.message);
      }
    }
  }
}
