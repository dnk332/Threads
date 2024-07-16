import {ActionBase} from './actionTypeBase';
import {IImage} from '@src/types/other';

export const OtherActionType = {
  UPLOAD_IMAGE: 'OTHER/UPLOAD_IMAGE',
} as const;

export type OtherActionType =
  (typeof OtherActionType)[keyof typeof OtherActionType];

export interface IUploadImageAction extends ActionBase<IImage> {
  type: typeof OtherActionType.UPLOAD_IMAGE;
}

export type IOtherAction = IUploadImageAction;
