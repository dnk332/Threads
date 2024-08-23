import {ResponseUploadImageApi} from '@apiTypes/otherApiTypes';
import http from '../http';
import {IImage} from '@src/types/other';

export const uploadImageApi = (
  images: IImage[],
): Promise<ResponseUploadImageApi> => {
  const formData = new FormData();
  images.forEach(image => {
    formData.append('file', image.data);
    formData.append('type', image.type);
    formData.append('name', image.name);
    formData.append('size', image.size.toString());
    formData.append('index', image.index.toString());
  });
  return http.post('uploads', {
    params: formData,
  });
};
