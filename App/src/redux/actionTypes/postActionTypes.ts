import {IPostText} from '@src/types/post';
import {ActionBase} from './actionTypeBase';

export const PostActionType = {
  GET_LIST_ALL_POST: 'USER/GET_LIST_ALL_POST',
  SAVE_LIST_ALL_POST: 'USER/SAVE_LIST_ALL_POST',
} as const;

export type PostActionType =
  (typeof PostActionType)[keyof typeof PostActionType];

export interface IGetListAllPostAction
  extends ActionBase<{
    limit: number;
    offset: number;
  }> {
  type: typeof PostActionType.GET_LIST_ALL_POST;
}

export interface ISaveListAllPostAction
  extends ActionBase<{
    posts: IPostText[];
  }> {
  type: typeof PostActionType.SAVE_LIST_ALL_POST;
}

export type PostAction = IGetListAllPostAction | ISaveListAllPostAction;
