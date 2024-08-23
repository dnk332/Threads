import {Callback} from '@appRedux/actions/types/actionTypeBase';
import {
  IToggleLikePostAction,
  LikeActionType,
} from '@appRedux/actions/types/likeActionTypes';

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
