import {Callback} from '@appRedux/actions/types/actionTypeBase';
import {
  ICreatePostAction,
  ICreatingPostAction,
  IGetListAllPostAction,
  ISaveListAllPostAction,
  PostActionType,
} from '@appRedux/actions/types/postActionTypes';
import {IPostType} from '@src/types/post';
import {IImage} from '@src/types/other';

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
  text_content: string,
  images: IImage[],
  callback: Callback,
): ICreatePostAction => ({
  type: PostActionType.CREATE_POST,
  payload: {
    params: {
      text_content,
      images,
    },
    callback,
  },
});

export const creatingPostAction = (status: boolean): ICreatingPostAction => ({
  type: PostActionType.CREATING_POST,
  payload: {
    params: {
      status,
    },
  },
});
