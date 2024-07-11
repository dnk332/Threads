import {ApiResponse} from './apiTypeBase';
import {IPostText, IPostType} from '@src/types/post';

export interface ResponseGetListAllPostApi extends ApiResponse<IPostType[]> {
  data: IPostType[] | [];
}
export interface ResponseCreatePostApi extends ApiResponse<IPostText> {
  data: IPostText;
}
