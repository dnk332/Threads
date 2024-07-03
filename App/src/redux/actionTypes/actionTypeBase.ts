import {AppActionType} from './appActionTypes';
import {AuthActionType} from './authActionTypes';
import {PostActionType} from './postActionTypes';
import {UserActionType} from './userActionTypes';

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
  type: AppActionType | AuthActionType | UserActionType | PostActionType;
  payload?: {
    params?: T;
    callback?: Callback;
    loadMore?: boolean;
  };
}
