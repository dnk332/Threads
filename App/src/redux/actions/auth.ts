import {actionTypes} from '@actions';

const {AUTH} = actionTypes;

export const onLoginAction = (
  username: string,
  password: string,
  callback: any,
) => {
  return {
    type: AUTH.LOGIN,
    payload: {params: {username, password}, callback},
  };
};

export const onLogoutAction = () => {
  return {
    type: AUTH.LOGOUT,
    payload: {},
  };
};

export const onRegisterAction = (
  username: string,
  password: string,
  callback: any,
) => {
  return {
    type: AUTH.REGISTER,
    payload: {params: {username, password}, callback},
  };
};

export const saveTokenAction = (token: string) => {
  return {
    type: AUTH.SAVE_TOKEN,
    token,
  };
};

export const saveRefreshTokenAction = (refreshToken: string) => {
  return {
    type: AUTH.SAVE_REFRESH_TOKEN,
    refreshToken,
  };
};

export const addAccountInfoAction = (accountInfo: any) => {
  return {
    type: AUTH.ADD_ACCOUNT_INFO,
    accountInfo,
  };
};

export const authCheckAction = (callback: any) => {
  return {
    type: AUTH.AUTH_CHECK,
    payload: {callback},
  };
};

export const setCurrentAccountIndexAction = index => {
  return {
    type: AUTH.CURRENT_ACCOUNT_INDEX,
    index,
  };
};

export const updateCurrentAccountAction = currentAccount => {
  return {
    type: AUTH.UPDATE_CURRENT_ACCOUNT,
    currentAccount,
  };
};
