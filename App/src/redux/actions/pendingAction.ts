import {
  IAddPendingAction,
  IClearPendingAction,
  IListAllAction,
  ITryRecallAction,
  PendingActionType,
} from '@actionTypes/pendingActionType';

export const tryRecallAction = (): ITryRecallAction => ({
  type: PendingActionType.TRY_RECALL,
});

export const addPendingAction = (data: IListAllAction): IAddPendingAction => ({
  type: PendingActionType.ADD_PENDING,
  payload: {
    params: data,
  },
});

export const clearPendingAction = (): IClearPendingAction => ({
  type: PendingActionType.CLEAR_ALL_PENDING,
  payload: {},
});
