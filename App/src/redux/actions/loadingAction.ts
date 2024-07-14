import {actionTypes} from '@actions';

const {LOADING: LoadingAction} = actionTypes;

export const showLoadingAction = payload => ({
  type: LoadingAction.DIALOG.SHOW,
  payload,
});

export const hideLoadingAction = payload => ({
  type: LoadingAction.DIALOG.HIDE,
  payload,
});

export const onFetchingAction = payload => ({
  type: LoadingAction.FETCH.FETCHING,
  payload,
});

export const nonFetchingAction = payload => ({
  type: LoadingAction.FETCH.NON_FETCHING,
  payload,
});
