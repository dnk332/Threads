import {ResponseUploadImageApi} from '@apiTypes/otherApiTypes';
import http from '../http';
import {IImage} from '@src/types/other';

export const uploadImageApi = (
  props: IImage,
): Promise<ResponseUploadImageApi> => {
  const formData = new FormData();
  formData.append('url', props.url);
  formData.append('name', props.name);
  formData.append('type', props.type);
  formData.append('type', props.size.toString());
  return http.post('uploads', {
    params: formData,
  });
};
