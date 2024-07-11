import {actionTypes} from '@actions';

const {CONNECTIVITY} = actionTypes;

export const onAppConnectivityChangeAction = payload => ({
  type: CONNECTIVITY.APP_CONNECTIVITY_CHANGE,
  payload,
});
