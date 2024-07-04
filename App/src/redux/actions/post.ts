import {Callback} from '@actionTypes/actionTypeBase';
import {
  IGetListAllPostAction,
  ISaveListAllPostAction,
  PostActionType,
} from '../actionTypes/postActionTypes';
import {IPostText} from '@src/types/post';

export const getListAllPostAction = (
  pageId: number,
  pageSize: number,
  callback: Callback,
): IGetListAllPostAction => ({
  type: PostActionType.GET_LIST_ALL_POST,
  payload: {
    params: {
      pageId,
      pageSize,
    },
    callback,
  },
});

export const saveListAllPostAction = (
  posts: IPostText[],
  loadMore?: boolean,
): ISaveListAllPostAction => ({
  type: PostActionType.SAVE_LIST_ALL_POST,
  payload: {
    params: {
      posts,
    },
    loadMore,
  },
});
