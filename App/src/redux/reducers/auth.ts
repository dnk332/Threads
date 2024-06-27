import {IUser} from '@src/types/user';
import _ from 'lodash';
import * as actions from '@actionTypes/authActionTypes';

export interface IAuthState {
  token: string | null;
  tokenDuration: string | null;
  listAccount: IUser[];
  refreshToken: string | null;
  currentAccount: IUser;
}

const initialState: IAuthState = {
  token: null,
  listAccount: [],
  refreshToken: null,
  currentAccount: null,
  tokenDuration: null,
};

export default function authReducer(
  state: IAuthState = initialState,
  action: actions.AuthAction,
): IAuthState {
  const actionType = actions.AuthActionType;
  switch (action.type) {
    case actionType.SET_TOKEN:
      return {
        ...state,
        token: action.payload.params.token,
        tokenDuration: action.payload.params.duration,
      };
    case actionType.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload.params.refreshToken,
      };
    case actionType.SET_ACCOUNT_INFO:
      return {
        ...state,
        listAccount: !_.isArray(state.listAccount)
          ? [action.payload.params.accountInfo]
          : [...state.listAccount, action.payload.params.accountInfo],
      };
    default:
      return state;
  }
}
