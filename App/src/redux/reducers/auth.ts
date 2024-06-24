import {actionTypes} from '@actions';
import _ from 'lodash';

const initialState = {
  token: null,
  listAccountInfo: [],
  refreshToken: null,
  currentAccount: null,
};

const {AUTH} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action?.type) {
    case AUTH.SAVE_TOKEN:
      return {
        ...state,
        token: action?.token,
      };
    case AUTH.SAVE_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action?.refreshToken,
      };
    case AUTH.ADD_ACCOUNT_INFO:
      return {
        ...state,
        listAccountInfo: !_.isArray(state.listAccountInfo)
          ? [action?.accountInfo]
          : [...state.listAccountInfo, action?.accountInfo],
      };
    case AUTH.UPDATE_CURRENT_ACCOUNT:
      return {
        ...state,
        currentAccount: action?.currentAccount,
      };
    default:
      return state;
  }
};
