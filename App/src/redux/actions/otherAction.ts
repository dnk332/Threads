import {
  IUploadImageAction,
  OtherActionType,
} from '@appRedux/actions/types/otherActionTypes';
import {IImageFile} from '@src/types/other';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

export const uploadImageAction = (
  props: IImageFile,
  callback: Callback,
): IUploadImageAction => ({
  type: OtherActionType.UPLOAD_IMAGE,
  payload: {
    params: props,
    callback,
  },
});
