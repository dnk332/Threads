import http from '@src/apis/http';

export const register = params => {
  return http.post('/auth/register', {params});
};
