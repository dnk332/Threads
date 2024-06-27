import {AppActionType} from './appActionTypes';
import {AuthActionType} from './authActionTypes';
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
  type: AppActionType | AuthActionType | UserActionType;
  payload?: {
    params?: T;
    callback?: Callback;
  };
}
