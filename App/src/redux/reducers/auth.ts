import {actionTypes} from '@actions';
import _ from 'lodash';

const initialState = {
  token: null,
  listAccountInfo: [],
  currentAccountIndex: 0,
  refreshToken: null,
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
    case AUTH.CURRENT_ACCOUNT_INDEX:
      console.log('action?.index', action?.index);
      return {
        ...state,
        currentAccountIndex: action?.index,
      };
    case AUTH.ADD_ACCOUNT_INFO:
      return {
        ...state,
        listAccountInfo: !_.isArray(state.listAccountInfo)
          ? [action?.accountInfo]
          : [...state.listAccountInfo, action?.accountInfo],
      };
    default:
      return state;
  }
};
