import http from '../http';
import {
  ResponseGetAllUserProfileApi,
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
  avatar_url: string,
): Promise<ResponseUpdateUserProfileApi> => {
  return http.post('/user-profiles', {
    params: {
      user_id,
      name,
      email,
      bio,
      avatar_url,
    },
  });
};
export const getAllUserProfileApi = (
  pageId: number,
  pageSize: number,
): Promise<ResponseGetAllUserProfileApi> => {
  return http.get(`/user-profiles?page_id=${pageId}&page_size=${pageSize}`);
};
