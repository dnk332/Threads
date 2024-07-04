import {ResponseGetListAllPostApi} from '../apiTypes/postApiTypes';
import http from '../http';

export const getListAllPostApi = (
  pageId: number,
  pageSize: number,
): Promise<ResponseGetListAllPostApi> => {
  return http.get(`/posts?page_id=${pageId}&page_size=${pageSize}`);
};
