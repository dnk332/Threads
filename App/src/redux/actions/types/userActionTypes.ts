import {IUserProfile} from '@src/types/user';
import {ActionBase} from './actionTypeBase';

export const UserActionType = {
  GET_USER_PROFILE: 'USER/GET_USER_PROFILE',
  UPDATE_PROFILE: 'USER/UPDATE_PROFILE',
  SET_PROFILE: 'USER/SET_PROFILE',
} as const;

export type UserActionType =
  (typeof UserActionType)[keyof typeof UserActionType];

export interface IGetUserProfileAction
  extends ActionBase<{
    user_id: number;
  }> {
  type: typeof UserActionType.GET_USER_PROFILE;
}

export interface IUpdateUserProfileAction
  extends ActionBase<{
    name: string;
    email: string;
    bio: string;
    avatar_url: string;
  }> {
  type: typeof UserActionType.UPDATE_PROFILE;
}

export interface ISetUserProfileAction
  extends ActionBase<{
    user_profile: IUserProfile;
  }> {
  type: typeof UserActionType.SET_PROFILE;
}

export type IUserAction =
  | IGetUserProfileAction
  | IUpdateUserProfileAction
  | ISetUserProfileAction;
