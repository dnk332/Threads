import {actionTypes} from '@actions';

const {USER} = actionTypes;

export const updateUserInfoAction = payload => {
  return {
    type: USER.UPDATE_INFO,
    payload,
  };
};
