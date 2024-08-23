import {AppActionType} from './appActionTypes';
import {AuthActionType} from './authActionTypes';
import {LikeActionType} from './likeActionTypes';
import {PostActionType} from './postActionTypes';
import {UserActionType} from './userActionTypes';
import {PendingActionType} from '@appRedux/actions/types/pendingActionType';
import {OtherActionType} from '@appRedux/actions/types/otherActionTypes';

export type Callback = ({
  success,
  data,
  message,
}: {
  success: boolean;
  data?: any;
  message?: string;
  errorCode?: string;
}) => void;

export interface ActionBase<T> {
  type:
    | AppActionType
    | AuthActionType
    | UserActionType
    | PostActionType
    | LikeActionType
    | PendingActionType
    | OtherActionType;
  payload?: {
    params?: T;
    callback?: Callback;
    loadMore?: boolean;
  };
}
