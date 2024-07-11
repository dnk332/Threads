import http from '../http';
import {
  ResponseGetUserProfileApi,
  ResponseUpdateUserProfileApi,
} from '@apiTypes/userApiTypes';
export const getUserProfileApi = (
  user_id: number,
): Promise<ResponseGetUserProfileApi> => {
  return http.get(`/user-profiles/${user_id}`);
};
export const updateUserInfoApi = (
  user_id: number,
  name: string,
  email: string,
  bio: string,
): Promise<ResponseUpdateUserProfileApi> => {
  return http.post('/user-profiles', {
    params: {
      user_id,
      name,
      email,
      bio,
    },
  });
};
