import {actionTypes} from '@actions';

const {AUTH} = actionTypes;

export const onLogin = (username: string, password: string, callback: any) => {
  return {
    type: AUTH.LOGIN,
    payload: {params: {username, password}, callback},
  };
};

export const onLogout = () => {
  return {
    type: AUTH.LOGOUT,
    payload: {},
  };
};

export const onRegister = (
  username: string,
  password: string,
  callback: any,
) => {
  return {
    type: AUTH.REGISTER,
    payload: {params: {username, password}, callback},
  };
};

export const saveToken = (token: string) => {
  return {
    type: AUTH.SAVE_TOKEN,
    token,
  };
};

export const addAccountInfo = (accountInfo: any) => {
  return {
    type: AUTH.ADD_ACCOUNT_INFO,
    accountInfo,
  };
};
