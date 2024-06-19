import http from '@src/apis/http';

export const loginApi = params => {
  return http.post('/auth/login', {params});
};
export const registerApi = params => {
  return http.post('/auth/register', {params});
};
export const refreshAccessTokenApi = params => {
  return http.post('/tokens/renew_access', {params});
};
export const verifyAccessTokenApi = params => {
  return http.post('/tokens/verify', {params});
};
