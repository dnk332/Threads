import http from '@src/apis/http';

export const getUserInfoApi = user_id => {
  return http.get(`/user-profiles/${user_id}`, {});
};
