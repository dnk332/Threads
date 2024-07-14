import {Callback} from '@actionTypes/actionTypeBase';
import {
  IToggleLikePostAction,
  LikeActionType,
} from '@actionTypes/likeActionTypes';

export const toggleLikePostAction = (
  status: 'like' | 'unlike',
  postId: number,
  callback: Callback,
): IToggleLikePostAction => ({
  type: LikeActionType.TOGGLE_LIKE,
  payload: {
    params: {
      postId,
      status,
    },
    callback,
  },
});
