import {ResponseGetListAllPostApi} from '../apiTypes/postApiTypes';
import http from '../http';

export const getListAllPostApi = (
  limit: number,
  offset: number,
): Promise<ResponseGetListAllPostApi> => {
  return http.get(`/posts/page_id=${limit}&page_size=${offset}`);
};
