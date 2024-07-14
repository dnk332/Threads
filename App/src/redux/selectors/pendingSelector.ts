import {createSelector} from 'reselect';
import {IGlobalState} from '@reducers';

const getPending = (state: IGlobalState) => state.pending;

export const pendingActionSelector = createSelector(
  [getPending],
  request => request.pendingAction,
);
