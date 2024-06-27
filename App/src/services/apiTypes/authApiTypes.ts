import {IUser} from '@src/types/user';
import {ApiResponse} from './apiTypeBase';

export type ResponseLoginApi = ApiResponse<{
  session_id: number;
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  user: IUser;
}>;
export type ResponseRegisterApi = ApiResponse<{user: IUser}>;
export type ResponseVerifyTokenApi = ApiResponse<{code: string}>;
export type ResponseRefreshTokenApi = ApiResponse<{
  access_token: string;
  access_token_expires_at: string;
}>;
