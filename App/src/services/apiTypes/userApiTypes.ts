import {IUserProfile} from '@src/types/user';
import {ApiResponse} from './apiTypeBase';

export type ResponseGetUserInfoApi = ApiResponse<{user_profile: IUserProfile}>;
export type ResponseUpdateUserInfoApi = ApiResponse<{
  user_profile: IUserProfile;
}>;
