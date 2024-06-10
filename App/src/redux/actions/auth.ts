import {actionTypes} from '@action';

const {USER} = actionTypes;
export const onLogin = (params: any, callback = () => {}) => {
  return {
    type: USER.LOGIN,
    params,
    callback,
  };
};

export const onRegister = (params: any, callback = () => {}) => {
  return {
    type: USER.REGISTER,
    params,
    callback,
  };
};

export const onForgot = (params: any, callback = () => {}) => {
  return {
    type: USER.FORGOT,
    params,
    callback,
  };
};

export const onLogout = (callback = () => {}) => {
  return {
    type: USER.LOGOUT,
    callback,
  };
};

export const onDeactivate = (callback = () => {}) => {
  return {
    type: USER.DEACTIVATE,
    callback,
  };
};

export const onExpire = (callback = () => {}) => {
  return {
    type: USER.EXPIRE_TOKEN,
    callback,
  };
};

export const onEditProfile = (params: any, callback = () => {}) => {
  return {
    type: USER.EDIT_PROFILE,
    params,
    callback,
  };
};

export const onChangePassword = (params: any, callback = () => {}) => {
  return {
    type: USER.CHANGE_PASSWORD,
    params,
    callback,
  };
};
