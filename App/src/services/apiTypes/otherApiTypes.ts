import {ApiResponse} from './apiTypeBase';
import {IImageFile} from '@src/types/other';

export interface ResponseUploadImageApi extends ApiResponse<IImageFile> {
  data: IImageFile;
}
