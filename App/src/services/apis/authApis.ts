import http from '../http';
import {
  ResponseLoginApi,
  ResponseRefreshTokenApi,
  ResponseRegisterApi,
  ResponseVerifyTokenApi,
} from '@apiTypes/authApiTypes';

export const loginApi = (
  username: string,
  password: string,
): Promise<ResponseLoginApi> => {
  return http.post('/users/login', {params: {username, password}});
};

export const logoutApi = () => {
  return http.get('/users/logout');
};

export const registerApi = (
  username: string,
  password: string,
): Promise<ResponseRegisterApi> => {
  return http.post('/users', {params: {username, password}});
};

export const refreshAccessTokenApi = (
  refresh_token: string,
): Promise<ResponseRefreshTokenApi> => {
  return http.post('/tokens/refresh', {params: {refresh_token}});
};

export const verifyAccessTokenApi = (
  access_token: string,
): Promise<ResponseVerifyTokenApi> => {
  return http.post('/tokens/verify', {params: {access_token}});
};
