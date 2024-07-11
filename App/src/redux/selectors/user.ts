import {createSelector} from 'reselect';
import {IGlobalState} from '@reducers';

const getUser = (state: IGlobalState) => state.user;

export const currentUserProfileSelector = createSelector(
  [getUser],
  auth => auth.userProfile,
);
