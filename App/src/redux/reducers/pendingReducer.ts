import * as requestActions from '@appRedux/actions/types/pendingActionType';
import {IUserAction} from '@appRedux/actions/types/userActionTypes';
import {IPostAction} from '@appRedux/actions/types/postActionTypes';
import {ILikeAction} from '@appRedux/actions/types/likeActionTypes';
import {IAuthAction} from '@appRedux/actions/types/authActionTypes';

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
