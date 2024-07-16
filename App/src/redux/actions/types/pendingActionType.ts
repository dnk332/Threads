import {ActionBase} from './actionTypeBase';
import {IUserAction} from '@appRedux/actions/types/userActionTypes';
import {IPostAction} from '@appRedux/actions/types/postActionTypes';
import {ILikeAction} from '@appRedux/actions/types/likeActionTypes';
import {IAuthAction} from '@appRedux/actions/types/authActionTypes';
import {IOtherAction} from '@appRedux/actions/types/otherActionTypes';

export type IListAllAction =
  | IUserAction
  | IPostAction
  | ILikeAction
  | IAuthAction
  | IOtherAction;

export const PendingActionType = {
  ADD_PENDING: 'PENDING/ADD_PENDING',
  CLEAR_ALL_PENDING: 'PENDING/CLEAR_ALL_PENDING',
  TRY_RECALL: 'PENDING/TRY_RECALL',
} as const;

export type PendingActionType =
  (typeof PendingActionType)[keyof typeof PendingActionType];

export interface ITryRecallAction extends ActionBase<{}> {
  type: typeof PendingActionType.TRY_RECALL;
}

export interface IAddPendingAction extends ActionBase<IListAllAction> {
  type: typeof PendingActionType.ADD_PENDING;
}

export interface IClearPendingAction extends ActionBase<{}> {
  type: typeof PendingActionType.CLEAR_ALL_PENDING;
}

export type PendingAction =
  | ITryRecallAction
  | IAddPendingAction
  | IClearPendingAction;
