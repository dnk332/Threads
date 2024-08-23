import * as requestActions from '@appRedux/actions/types/pendingActionType';
import {IListAllAction} from '@appRedux/actions/types/pendingActionType';

export interface IPendingState {
  pendingAction: IListAllAction;
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
