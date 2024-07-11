import {IUserProfile} from '@src/types/user';
import * as actions from '@actionTypes/userActionTypes';

export interface IUserState {
  userProfile: IUserProfile;
}

const initialState: IUserState = {
  userProfile: null,
};

export default function userReducer(
  state: IUserState = initialState,
  action: actions.UserAction,
) {
  switch (action.type) {
    case actions.UserActionType.SET_PROFILE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...action.payload.params.user_profile,
        },
      };
    default:
      return state;
  }
}
