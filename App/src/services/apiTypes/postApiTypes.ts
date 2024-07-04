import {ApiResponse} from './apiTypeBase';
import {IPostText} from '@src/types/post';

export interface ResponseGetListAllPostApi extends ApiResponse<IPostText[]> {
  data: IPostText[] | [];
}
