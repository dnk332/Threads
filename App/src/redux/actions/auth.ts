import {IUser} from '@src/types/user';
import {Callback} from '@actionTypes/actionTypeBase';
import {
  ILoginAction,
  ILogoutAction,
  IRegisterAction,
  ISetTokenAction,
  ISetRefreshTokenAction,
  AuthActionType,
  ISetAccountInfoAction,
  IAuthCheckAction,
} from '@actionTypes/authActionTypes';

export const loginAction = (
  username: string,
  password: string,
  callback: Callback,
): ILoginAction => {
  return {
    type: AuthActionType.LOGIN,
    payload: {params: {username, password}, callback},
  };
};

export const logoutAction = (): ILogoutAction => ({
  type: AuthActionType.LOGOUT,
});

export const registerAction = (
  username: string,
  password: string,
  callback: Callback,
): IRegisterAction => ({
  type: AuthActionType.REGISTER,
  payload: {params: {username, password}, callback},
});

export const setTokenAction = (
  token: string,
  duration: string,
): ISetTokenAction => ({
  type: AuthActionType.SET_TOKEN,
  payload: {params: {token, duration}},
});

export const setRefreshTokenAction = (
  refreshToken: string,
): ISetRefreshTokenAction => ({
  type: AuthActionType.SET_REFRESH_TOKEN,
  payload: {params: {refreshToken}},
});

export const setAccountInfoAction = (
  accountInfo: IUser,
): ISetAccountInfoAction => ({
  type: AuthActionType.SET_ACCOUNT_INFO,
  payload: {params: {accountInfo}},
});

export const authCheckAction = (callback: Callback): IAuthCheckAction => ({
  type: AuthActionType.AUTH_CHECK,
  payload: {callback},
});
