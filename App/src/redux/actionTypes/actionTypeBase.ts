import {AppActionType} from './appActionTypes';
import {AuthActionType} from './authActionTypes';
import {LikeActionType} from './likeActionTypes';
import {PostActionType} from './postActionTypes';
import {UserActionType} from './userActionTypes';
import {PendingActionType} from '@actionTypes/pendingActionType';

export type Callback = ({
  success,
  data,
  message,
}: {
  success: boolean;
  data?: any;
  message?: string;
}) => void;

export interface ActionBase<T> {
  type:
    | AppActionType
    | AuthActionType
    | UserActionType
    | PostActionType
    | LikeActionType
    | PendingActionType;
  payload?: {
    params?: T;
    callback?: Callback;
    loadMore?: boolean;
  };
}
