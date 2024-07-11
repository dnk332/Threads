import {actionTypes} from '@actions';

const {LOADING} = actionTypes;

export const showLoadingAction = payload => ({
  type: LOADING.DIALOG.SHOW,
  payload,
});

export const hideLoadingAction = payload => ({
  type: LOADING.DIALOG.HIDE,
  payload,
});

export const onFetchingAction = payload => ({
  type: LOADING.FETCH.FETCHING,
  payload,
});

export const nonFetchingAction = payload => ({
  type: LOADING.FETCH.NON_FETCHING,
  payload,
});
