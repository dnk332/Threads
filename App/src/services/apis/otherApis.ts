import {ResponseUploadImageApi} from '@apiTypes/otherApiTypes';
import http from '../http';
import {IImageFile} from '@src/types/other';

export const uploadImageApi = (
  props: IImageFile,
): Promise<ResponseUploadImageApi> => {
  const formData = new FormData();
  formData.append('file', props.uri);
  formData.append('type', props.type);
  formData.append('name', props.name);
  return http.post('uploads', {
    params: formData,
  });
};
