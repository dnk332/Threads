import {ApiResponse} from './apiTypeBase';
import {IImage} from '@src/types/other';

export interface ResponseUploadImageApi extends ApiResponse<IImage> {
  data: IImage;
}
