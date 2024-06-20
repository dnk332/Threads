export const refreshTokenSelector = state => state.auth.refreshToken;
export const accessTokenSelector = state => state.auth.token;
export const currentAccountIndexSelector = state =>
  state.auth.currentAccountIndex;
