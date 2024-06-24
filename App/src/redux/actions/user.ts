import {actionTypes} from '@actions';

const {USER} = actionTypes;

export const updateUserInfoAction = payload => {
  return {
    type: USER.UPDATE_INFO,
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
