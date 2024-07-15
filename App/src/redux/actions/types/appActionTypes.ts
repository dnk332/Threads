import {ActionBase} from './actionTypeBase';

export const AppActionType = {
  CLEAR_REDUCER: 'APP/CLEAR_REDUCER',
  SET_DOMAIN: 'APP/SET_DOMAIN',
  SET_DEVICE_INFO: 'APP/SET_DEVICE_INFO',
  START_APPLICATION: 'APP/START_APPLICATION',
  SET_APP_CONNECTIVITY: 'APP/SET_APP_CONNECTIVITY',
} as const;

export type AppActionType = (typeof AppActionType)[keyof typeof AppActionType];

export interface IStartAction extends ActionBase<{}> {
  type: typeof AppActionType.START_APPLICATION;
}
export interface IClearStorageAction extends ActionBase<{}> {
  type: typeof AppActionType.CLEAR_REDUCER;
}
export interface ISetDomainAction extends ActionBase<{domain: string}> {
  type: typeof AppActionType.SET_DOMAIN;
}
export interface ISetDeviceInfoAction extends ActionBase<{deviceInfo: object}> {
  type: typeof AppActionType.SET_DEVICE_INFO;
}
export interface ISetAppConnectivityAction
  extends ActionBase<{
    status: string;
  }> {
  type: typeof AppActionType.SET_APP_CONNECTIVITY;
}
export type AppAction =
  | IStartAction
  | IClearStorageAction
  | ISetDomainAction
  | ISetAppConnectivityAction
  | ISetDeviceInfoAction;
