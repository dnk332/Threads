import {
  AppActionType,
  IClearStorageAction,
  ISetAppConnectivityAction,
  ISetDeviceInfoAction,
  ISetDomainAction,
  IStartAction,
} from '@appRedux/actions/types/appActionTypes';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

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
export const setDeviceInfoAction = (
  deviceInfo: object,
): ISetDeviceInfoAction => ({
  type: AppActionType.SET_DEVICE_INFO,
  payload: {
    params: {deviceInfo},
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
