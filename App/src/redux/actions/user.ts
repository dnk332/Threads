import {actionTypes} from '@actions';

const {USER} = actionTypes;

export const onChangeUserInfoSubmit = payload => {
  return {
    type: USER.UPDATE_INFO.HANDLER,
    payload,
  };
};

export const onUpdateUserInfoSuccess = payload => {
  return {
    type: USER.UPDATE_INFO.SUCCESS,
    payload,
  };
};
