import {
  ResponseLikePostApi,
  ResponseUnlikePostApi,
} from '../apiTypes/likeApiTypes';
import http from '../http';

export const likePostApi = (post_id: number): Promise<ResponseLikePostApi> => {
  return http.post('/posts/like', {params: {post_id}});
};

export const unlikePostApi = (
  post_id: number,
): Promise<ResponseUnlikePostApi> => {
  return http.post('/posts/unlike', {params: {post_id}});
};
