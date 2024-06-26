import {UserI} from '@src/types/user';
import {AuthActionBase} from './actionTypeBase';

export const AuthActionType = {
  LOGIN: 'AUTH/LOGIN',
  REGISTER: 'AUTH/REGISTER',
  LOGOUT: 'AUTH/LOGOUT',
  SET_TOKEN: 'AUTH/SET_TOKEN',
  SET_REFRESH_TOKEN: 'AUTH/SET_REFRESH_TOKEN',
  SET_ACCOUNT_INFO: 'AUTH/SET_ACCOUNT_INFO',
  AUTH_CHECK: 'AUTH/AUTH_CHECK',
  CURRENT_ACCOUNT_INDEX: 'AUTH/CURRENT_ACCOUNT_INDEX',
  UPDATE_CURRENT_ACCOUNT: 'AUTH/UPDATE_CURRENT_ACCOUNT',
} as const;

export type AuthActionType =
  (typeof AuthActionType)[keyof typeof AuthActionType];

export interface LoginActionI
  extends AuthActionBase<{
    username: string;
    password: string;
  }> {
  type: typeof AuthActionType.LOGIN;
}

export interface LogoutActionI extends AuthActionBase<{}> {
  type: typeof AuthActionType.LOGOUT;
}

export interface RegisterActionI
  extends AuthActionBase<{
    username: string;
    password: string;
  }> {
  type: typeof AuthActionType.REGISTER;
}

export interface SetTokenActionI
  extends AuthActionBase<{
    token: string;
    duration: string;
  }> {
  type: typeof AuthActionType.SET_TOKEN;
}

export interface SetRefreshTokenActionI
  extends AuthActionBase<{
    refreshToken: string;
  }> {
  type: typeof AuthActionType.SET_REFRESH_TOKEN;
}

export interface SetAccountInfoActionI
  extends AuthActionBase<{
    accountInfo: UserI;
  }> {
  type: typeof AuthActionType.SET_ACCOUNT_INFO;
}

export interface AuthCheckActionI extends AuthActionBase<{}> {
  type: typeof AuthActionType.AUTH_CHECK;
}

export type AuthAction =
  | LoginActionI
  | LogoutActionI
  | RegisterActionI
  | SetTokenActionI
  | SetRefreshTokenActionI
  | SetAccountInfoActionI
  | AuthCheckActionI;
