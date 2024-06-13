import {actionTypes} from '@actions';

const {AUTH} = actionTypes;

export const onLogin = (username: string, password: string, callback: any) => {
  return {
    type: AUTH.LOGIN,
    payload: {params: {username, password}, callback},
  };
};

export const onLogout = (callback: any) => {
  return {
    type: AUTH.LOGIN,
    payload: {callback},
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

export const saveToken = token => {
  return {
    type: AUTH.SAVE_TOKEN,
    token,
  };
};
