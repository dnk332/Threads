import {Callback} from '@actionTypes/actionTypeBase';
import {
  IGetListAllPostAction,
  ISaveListAllPostAction,
  PostActionType,
} from '../actionTypes/postActionTypes';
import {IPostText} from '@src/types/post';

export const getListAllPostAction = (
  limit: number,
  offset: number,
  callback: Callback,
): IGetListAllPostAction => ({
  type: PostActionType.GET_LIST_ALL_POST,
  payload: {
    params: {
      limit,
      offset,
    },
    callback,
  },
});

export const saveListAllPostAction = (
  posts: IPostText[],
): ISaveListAllPostAction => ({
  type: PostActionType.SAVE_LIST_ALL_POST,
  payload: {
    params: {
      posts,
    },
  },
});
