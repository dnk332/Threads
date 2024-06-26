import {Callback} from '@src/types/global';
import {AuthActionType} from './authActionTypes';

export interface AuthActionBase<T> {
  type: AuthActionType;
  payload: {
    params?: T;
    callback?: Callback;
  };
}
