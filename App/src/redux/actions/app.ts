import {actionTypes} from '@actions';

const {APP} = actionTypes;

export const startAction = (callback: any) => {
  return {
    type: APP.START_APPLICATION,
    callback,
  };
};

export const changeLanguageAction = language => {
  return {
    type: APP.CHANGE_LANGUAGE,
    language,
  };
};

export const clearStorageAction = () => {
  return {
    type: APP.CLEAR_REDUCER,
  };
};
