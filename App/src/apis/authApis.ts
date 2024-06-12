import http from '@src/apis/http';

export const login = params => {
  return http.post('/auth/login', {params});
};
export const register = params => {
  return http.post('/auth/register', {params});
};
