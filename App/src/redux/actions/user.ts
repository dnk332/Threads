import {actionTypes} from '@actions';

const {USER} = actionTypes;

export const saveUserInfoAction = payload => {
  return {
    type: USER.SAVE_INFO,
    payload,
  };
};

export const getUserInfoAction = (user_id: number, callback: any) => {
  return {
    type: USER.GET_USER_INFO,
    payload: {
      user_id,
      callback,
    },
  };
};

export const updateUserInfoAction = (
  name: string,
  email: string,
  bio: string,
  callback: any,
) => {
  return {
    type: USER.UPDATE_INFO,
    payload: {
      name,
      email,
      bio,
      callback,
    },
  };
};
