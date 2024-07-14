import * as requestActions from '@actionTypes/pendingActionType';
import {IUserAction} from '@actionTypes/userActionTypes';
import {IPostAction} from '@actionTypes/postActionTypes';
import {ILikeAction} from '@actionTypes/likeActionTypes';
import {IAuthAction} from '@actionTypes/authActionTypes';

export interface IPendingState {
  pendingAction: IUserAction | IPostAction | ILikeAction | IAuthAction;
}

const initialState: IPendingState = {
  pendingAction: null,
};

export default function pendingReducer(
  state: IPendingState = initialState,
  action: requestActions.PendingAction,
) {
  switch (action.type) {
    case requestActions.PendingActionType.ADD_PENDING:
      return {
        ...state,
        pendingAction: action.payload.params,
      };
    case requestActions.PendingActionType.CLEAR_ALL_PENDING:
      return {
        state: initialState,
      };
    default:
      return state;
  }
}
