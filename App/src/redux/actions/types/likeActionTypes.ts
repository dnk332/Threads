import {ActionBase} from './actionTypeBase';

export const LikeActionType = {
  TOGGLE_LIKE: 'LIKE/TOGGLE_LIKE',
} as const;

export type LikeActionType =
  (typeof LikeActionType)[keyof typeof LikeActionType];

export interface IToggleLikePostAction
  extends ActionBase<{
    status: 'like' | 'unlike';
    postId: number;
  }> {
  type: typeof LikeActionType.TOGGLE_LIKE;
}

export type ILikeAction = IToggleLikePostAction;
