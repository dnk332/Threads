import {
  ResponseCreatePostApi,
  ResponseGetListAllPostApi,
} from '@apiTypes/postApiTypes';
import http from '../http';
import {IImageFile} from '@src/types/other';

export const getListAllPostApi = (
  pageId: number,
  pageSize: number,
): Promise<ResponseGetListAllPostApi> => {
  return http.get(`/posts?page_id=${pageId}&page_size=${pageSize}`);
};

export const createPostApi = (
  author_id: number,
  text_content: string,
  images: IImageFile[],
): Promise<ResponseCreatePostApi> => {
  return http.post('/posts', {params: {author_id, text_content, images}});
};
