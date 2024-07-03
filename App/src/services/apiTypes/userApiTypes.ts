import {IUserProfile} from '@src/types/user';
import {ApiResponse} from './apiTypeBase';

export type ResponseGetUserProfileApi = ApiResponse<{
  user_profile: IUserProfile;
}>;
export type ResponseUpdateUserProfileApi = ApiResponse<{
  user_profile: IUserProfile;
}>;
