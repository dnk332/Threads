import {Callback} from '../actionTypes/actionTypeBase';
import {
  IToggleLikePostAction,
  LikeActionType,
} from '../actionTypes/likeActionTypes';

export const toggleLikePostAction = (
  action: 'like' | 'unlike',
  postId: number,
  callback: Callback,
): IToggleLikePostAction => ({
  type: LikeActionType.TOGGLE_LIKE,
  payload: {
    params: {
      postId,
      action,
    },
    callback,
  },
});
