import http from '@src/apis/http';

export const loginApi = params => {
  return http.post('/users/login', {params});
};
export const logoutApi = params => {
  return http.get('/users/logout', {params});
};
export const registerApi = params => {
  return http.post('/users', {params});
};
export const refreshAccessTokenApi = params => {
  return http.post('/tokens/refresh', {params});
};
export const verifyAccessTokenApi = params => {
  return http.post('/tokens/verify', {params});
};
