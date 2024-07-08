import {ILike} from '@src/types/like';
import {ApiResponse} from './apiTypeBase';

export interface ResponseLikePostApi extends ApiResponse<ILike> {
  data: ILike;
}
export interface ResponseUnlikePostApi extends ApiResponse<{message: string}> {
  message: string;
}
