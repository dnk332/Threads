import http from '../http';
import {
  ResponseGetUserInfoApi,
  ResponseUpdateUserInfoApi,
} from '@apiTypes/userApiTypes';
export const getUserInfoApi = (
  user_id: number,
): Promise<ResponseGetUserInfoApi> => {
  return http.get(`/user-profiles/${user_id}`);
};
export const updateUserInfoApi = (
  user_id: number,
  name: string,
  email: string,
  bio: string,
): Promise<ResponseUpdateUserInfoApi> => {
  return http.post('/user-profiles', {
    params: {
      user_id,
      name,
      email,
      bio,
    },
  });
};
