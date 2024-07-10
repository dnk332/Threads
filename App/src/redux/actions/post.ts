import {Callback} from '@actionTypes/actionTypeBase';
import {
  ICreatePostAction,
  IGetListAllPostAction,
  ISaveListAllPostAction,
  PostActionType,
} from '@actionTypes/postActionTypes';
import {IPostType} from '@src/types/post';

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
  posts: IPostType[],
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

export const createPostAction = (
  author_id: number,
  text_content: string,
  callback: Callback,
): ICreatePostAction => ({
  type: PostActionType.CREATE_POST,
  payload: {
    params: {
      author_id,
      text_content,
    },
    callback,
  },
});
