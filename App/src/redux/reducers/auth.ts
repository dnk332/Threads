import {actionTypes} from '@actions';
import {User} from '@src/types/user';
import _ from 'lodash';

const initialState: {
  token: string | null;
  tokenDuration: string | null;
  listAccountInfo: User[];
  refreshToken: string | null;
  currentAccount: User;
} = {
  token: null,
  listAccountInfo: [],
  refreshToken: null,
  currentAccount: null,
  tokenDuration: null,
};

const {AUTH} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action?.type) {
    case AUTH.SAVE_TOKEN:
      return {
        ...state,
        token: action?.token,
        tokenDuration: action?.duration,
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
