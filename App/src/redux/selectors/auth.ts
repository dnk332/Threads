import {createSelector} from 'reselect';
import {IGlobalState} from '@reducers';

const getAuth = (state: IGlobalState) => state.auth;

export const listAccountSelector = createSelector(
  [getAuth],
  auth => auth.listAccount,
);
export const currentAccountSelector = createSelector(
  [getAuth],
  auth => auth.currentAccount,
);
export const refreshTokenSelector = createSelector(
  [getAuth],
  auth => auth.refreshToken,
);
export const accessTokenSelector = createSelector(
  [getAuth],
  auth => auth.token,
);
export const tokenDurationSelector = createSelector(
  [getAuth],
  auth => auth.tokenDuration,
);
