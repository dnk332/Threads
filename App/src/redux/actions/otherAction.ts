import {
  IUploadImageAction,
  OtherActionType,
} from '@appRedux/actions/types/otherActionTypes';
import {IImage} from '@src/types/other';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

export const uploadImageAction = (
  props: IImage,
  callback: Callback,
): IUploadImageAction => ({
  type: OtherActionType.UPLOAD_IMAGE,
  payload: {
    params: props,
    callback,
  },
});
