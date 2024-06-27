import {
  AppActionType,
  IClearStorageAction,
  ISetAppConnectivityAction,
  ISetDomainAction,
  IStartAction,
} from '@actionTypes/appActionTypes';
import {Callback} from '@actionTypes/actionTypeBase';

export const startAction = (callback: Callback): IStartAction => ({
  type: AppActionType.START_APPLICATION,
  payload: {
    callback,
  },
});
export const clearStorageAction = (): IClearStorageAction => ({
  type: AppActionType.CLEAR_REDUCER,
});
export const setDomainAction = (domain: string): ISetDomainAction => ({
  type: AppActionType.SET_DOMAIN,
  payload: {
    params: {domain},
  },
});
export const setAppConnectivityChangeAction = (
  status: string,
): ISetAppConnectivityAction => ({
  type: AppActionType.SET_APP_CONNECTIVITY,
  payload: {
    params: {
      status,
    },
  },
});
