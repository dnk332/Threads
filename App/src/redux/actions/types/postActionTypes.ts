import {IPostType} from '@src/types/post';
import {ActionBase} from './actionTypeBase';
import {IImage} from '@src/types/other';

export const PostActionType = {
  GET_LIST_ALL_POST: 'POST/GET_LIST_ALL_POST',
  SAVE_LIST_ALL_POST: 'POST/SAVE_LIST_ALL_POST',
  CREATE_POST: 'POST/CREATE_POST',
  CREATING_POST: 'POST/CREATING_POST',
} as const;

export type PostActionType =
  (typeof PostActionType)[keyof typeof PostActionType];

export interface IGetListAllPostAction
  extends ActionBase<{
    pageId: number;
    pageSize: number;
  }> {
  type: typeof PostActionType.GET_LIST_ALL_POST;
}

export interface ISaveListAllPostAction
  extends ActionBase<{
    posts: IPostType[];
  }> {
  type: typeof PostActionType.SAVE_LIST_ALL_POST;
}

export interface ICreatePostAction
  extends ActionBase<{
    text_content: string;
    images: IImage[];
  }> {
  type: typeof PostActionType.CREATE_POST;
}

export interface ICreatingPostAction
  extends ActionBase<{
    status: boolean;
  }> {
  type: typeof PostActionType.CREATING_POST;
}

export type IPostAction =
  | IGetListAllPostAction
  | ISaveListAllPostAction
  | ICreatePostAction
  | ICreatingPostAction;
