import {actionTypes} from '@actions';

const {APP} = actionTypes;

export const start = (callback = () => {}) => {
  return {
    type: APP.START_APPLICATION,
    callback,
  };
};

export const changeLanguage = language => {
  return {
    type: APP.CHANGE_LANGUAGE,
    language,
  };
};

export const clearStorage = () => {
  return {
    type: APP.CLEAR_REDUCER,
  };
};
