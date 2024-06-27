import {
  IGetUserProfileAction,
  ISetUserProfileAction,
  IUpdateUserProfileAction,
  UserActionType,
} from '@actionTypes/userActionTypes';
import {Callback} from '@actionTypes/actionTypeBase';
import {IUserProfile} from '@src/types/user';

export const saveUserInfoAction = (
  user_profile: IUserProfile,
): ISetUserProfileAction => ({
  type: UserActionType.SET_PROFILE,
  payload: {
    params: {
      user_profile,
    },
  },
});

export const getUserProfileAction = (
  user_id: number,
  callback: Callback,
): IGetUserProfileAction => ({
  type: UserActionType.GET_USER_PROFILE,
  payload: {
    params: {
      user_id,
    },
    callback,
  },
});

export const updateUserProfileAction = (
  name: string,
  email: string,
  bio: string,
  callback: Callback,
): IUpdateUserProfileAction => ({
  type: UserActionType.UPDATE_PROFILE,
  payload: {
    params: {
      name,
      email,
      bio,
    },
    callback,
  },
});
