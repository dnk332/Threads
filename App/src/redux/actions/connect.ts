import {actionTypes} from '@actions';

const {CONNECTIVITY} = actionTypes;

export const onAppConnectivityChange = payload => ({
  type: CONNECTIVITY.APP_CONNECTIVITY_CHANGE,
  payload,
});
