import {ActionBase} from './actionTypeBase';
import {IUserAction} from '@actionTypes/userActionTypes';
import {IPostAction} from '@actionTypes/postActionTypes';
import {ILikeAction} from '@actionTypes/likeActionTypes';
import {IAuthAction} from '@actionTypes/authActionTypes';

export type IListAllAction =
  | IUserAction
  | IPostAction
  | ILikeAction
  | IAuthAction;

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
