import {ApiResponse} from './apiTypeBase';
import {IPostText} from '@src/types/post';

export type ResponseGetListAllPostApi = ApiResponse<{
  posts: IPostText[] | [];
}>;
