import {createSelector} from 'reselect';
import {IGlobalState} from '@reducers';

const getApp = (state: IGlobalState) => state.app;

export const deviceInfoSelector = createSelector(
  [getApp],
  app => app.deviceInfo,
);
export const domainSelector = createSelector([getApp], app => app.domain);
