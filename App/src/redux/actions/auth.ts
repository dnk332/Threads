import {actionTypes} from '@actions';

const {AUTH} = actionTypes;

export const onLoginSubmit = payload => {
  return {
    type: AUTH.LOGIN.HANDLER,
    payload,
  };
};

export const onLoginSuccess = payload => {
  return {
    type: AUTH.LOGIN.SUCCESS,
    payload,
  };
};

export const onRegisterSubmit = payload => {
  return {
    type: AUTH.REGISTER.HANDLER,
    payload,
  };
};

export const onRegisterSuccess = payload => {
  return {
    type: AUTH.REGISTER.SUCCESS,
    payload,
  };
};
