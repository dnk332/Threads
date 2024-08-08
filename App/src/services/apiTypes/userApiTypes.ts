import {IUserProfile} from '@src/types/user';
import {ApiResponse} from './apiTypeBase';

export interface ResponseGetUserProfileApi extends ApiResponse<IUserProfile> {
  data: IUserProfile;
}

export interface ResponseUpdateUserProfileApi
  extends ApiResponse<IUserProfile> {
  data: IUserProfile;
}

export interface ResponseGetAllUserProfileApi
  extends ApiResponse<IUserProfile[]> {
  data: IUserProfile[];
}
