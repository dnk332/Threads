import {actionTypes} from '@actions';

const {USER} = actionTypes;

export const updateUserInfo = payload => {
  return {
    type: USER.UPDATE_INFO,
    payload,
  };
};
