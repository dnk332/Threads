export const asyncTypes = action => ({
  ORIGIN: action,
  HANDLER: `${action}_HANDLER`,
  PENDING: `${action}_PENDING`,
  START: `${action}_START`,
  MORE: `${action}_MORE`,
  SUCCESS: `${action}_SUCCESS`,
  FAILURE: `${action}_FAILURE`,
  ERROR: `${action}_ERROR`,
  CLEAR: `${action}_CLEAR`,
  END: `${action}_END`,
});
// Actions
export const APP = {
  CLEAR_REDUCER: asyncTypes('APP/CLEAR_REDUCER'),
  CHANGE_THEME: asyncTypes('APP/CHANGE_THEME'),
  CHANGE_FONT: asyncTypes('APP/CHANGE_FONT'),
  FORCE_APPEARANCE: asyncTypes('APP/FORCE_APPEARANCE'),
  CHANGE_LANGUAGE: asyncTypes('APP/CHANGE_LANGUAGE'),
  SAVE_DOMAIN: asyncTypes('APP/SAVE_DOMAIN'),
  SAVE_DEVICE_INFO: asyncTypes('APP/SAVE_DEVICE_INFO'),
  SAVE_SETTING: asyncTypes('APP/SAVE_SETTING'),
  SAVE_ONBOARD: asyncTypes('APP/SAVE_ONBOARD'),
  CHANGE_LISTING_STYLE: asyncTypes('APP/CHANGE_LISTING_STYLE'),
};
export const USER = {
  LOGIN: asyncTypes('USER/LOGIN'),
  REGISTER: asyncTypes('USER/REGISTER'),
  FORGOT: asyncTypes('USER/FORGOT'),
  DEACTIVATE: asyncTypes('USER/DEACTIVATE'),
  EXPIRE_TOKEN: asyncTypes('USER/EXPIRE_TOKEN'),
  EDIT_PROFILE: asyncTypes('USER/EDIT_PROFILE'),
  CHANGE_PASSWORD: asyncTypes('USER/CHANGE_PASSWORD'),
  LOGIN_BY_OTHER_ACCOUNT: asyncTypes('USER/LOGIN_BY_OTHER_ACCOUNT'),
  SIGN_UP: asyncTypes('USER/SIGN_UP'),
  GET_USER_INFO: asyncTypes('USER/GET_USER_INFO'),
  LOGOUT: asyncTypes('USER/LOGOUT'),
  UPDATE_INFO: asyncTypes('USER/UPDATE_INFO'),
};

export const LOADING = {
  FETCH: {
    FETCHING: 'LOADING/FETCH_FETCHING',
    NON_FETCHING: 'LOADING/FETCH_NON_FETCHING',
  },
  DIALOG: {
    SHOW: 'LOADING/DIALOG_SHOW',
    HIDE: 'LOADING/DIALOG_HIDE',
  },
};

export const ERROR = {
  DIALOG: {
    SHOW: 'ERROR/DIALOG_SHOW',
    HIDE: 'ERROR/DIALOG_HIDE',
  },
};
