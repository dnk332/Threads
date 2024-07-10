import {IUser} from '@src/types/user';
import {ActionBase} from './actionTypeBase';

export const AuthActionType = {
  LOGIN: 'AUTH/LOGIN',
  REGISTER: 'AUTH/REGISTER',
  LOGOUT: 'AUTH/LOGOUT',
  SET_TOKEN: 'AUTH/SET_TOKEN',
  SET_REFRESH_TOKEN: 'AUTH/SET_REFRESH_TOKEN',
  SET_ACCOUNT_INFO: 'AUTH/SET_ACCOUNT_INFO',
  SET_LIST_ACCOUNT_INFO: 'AUTH/SET_LIST_ACCOUNT_INFO',
  AUTH_CHECK: 'AUTH/AUTH_CHECK',
  CURRENT_ACCOUNT_INDEX: 'AUTH/CURRENT_ACCOUNT_INDEX',
  UPDATE_CURRENT_ACCOUNT: 'AUTH/UPDATE_CURRENT_ACCOUNT',
  REFRESH_TOKEN: 'AUTH/REFRESH_TOKEN',
} as const;

export type AuthActionType =
  (typeof AuthActionType)[keyof typeof AuthActionType];

export interface ILoginAction
  extends ActionBase<{
    username: string;
    password: string;
  }> {
  type: typeof AuthActionType.LOGIN;
}

export interface ILogoutAction extends ActionBase<{}> {
  type: typeof AuthActionType.LOGOUT;
}

export interface IRegisterAction
  extends ActionBase<{
    username: string;
    password: string;
  }> {
  type: typeof AuthActionType.REGISTER;
}

export interface ISetTokenAction
  extends ActionBase<{
    token: string;
    duration: string;
  }> {
  type: typeof AuthActionType.SET_TOKEN;
}

export interface ISetRefreshTokenAction
  extends ActionBase<{
    refreshToken: string;
  }> {
  type: typeof AuthActionType.SET_REFRESH_TOKEN;
}

export interface ISetAccountInfoAction
  extends ActionBase<{
    accountInfo: IUser;
  }> {
  type: typeof AuthActionType.SET_ACCOUNT_INFO;
}

export interface ISetListAccountInfoAction
  extends ActionBase<{
    accountInfo: IUser;
  }> {
  type: typeof AuthActionType.SET_LIST_ACCOUNT_INFO;
}

export interface IAuthCheckAction extends ActionBase<{}> {
  type: typeof AuthActionType.AUTH_CHECK;
}

export interface IRefreshTokenAction extends ActionBase<{}> {
  type: typeof AuthActionType.REFRESH_TOKEN;
}

export type AuthAction =
  | ILoginAction
  | ILogoutAction
  | IRegisterAction
  | ISetTokenAction
  | ISetRefreshTokenAction
  | ISetAccountInfoAction
  | ISetListAccountInfoAction
  | IAuthCheckAction
  | IRefreshTokenAction;
