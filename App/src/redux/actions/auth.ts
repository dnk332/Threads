import {UserI} from '@src/types/user';
import {
  LoginActionI,
  LogoutActionI,
  RegisterActionI,
  SetTokenActionI,
  SetRefreshTokenActionI,
  AuthActionType,
  SetAccountInfoActionI,
  AuthCheckActionI,
} from '@actionTypes/authActionTypes';
import {Callback} from '@src/types/global';

export const loginAction = (
  username: string,
  password: string,
  callback: Callback,
): LoginActionI => {
  return {
    type: AuthActionType.LOGIN,
    payload: {params: {username, password}, callback},
  };
};

export const logoutAction = (): LogoutActionI => {
  return {
    type: AuthActionType.LOGOUT,
    payload: {},
  };
};

export const registerAction = (
  username: string,
  password: string,
  callback: Callback,
): RegisterActionI => {
  return {
    type: AuthActionType.REGISTER,
    payload: {params: {username, password}, callback},
  };
};

export const setTokenAction = (
  token: string,
  duration: string,
): SetTokenActionI => {
  return {
    type: AuthActionType.SET_TOKEN,
    payload: {params: {token, duration}},
  };
};

export const setRefreshTokenAction = (
  refreshToken: string,
): SetRefreshTokenActionI => {
  return {
    type: AuthActionType.SET_REFRESH_TOKEN,
    payload: {params: {refreshToken}},
  };
};

export const setAccountInfoAction = (
  accountInfo: UserI,
): SetAccountInfoActionI => {
  return {
    type: AuthActionType.SET_ACCOUNT_INFO,
    payload: {params: {accountInfo}},
  };
};

export const authCheckAction = (callback: Callback): AuthCheckActionI => {
  return {
    type: AuthActionType.AUTH_CHECK,
    payload: {callback},
  };
};
