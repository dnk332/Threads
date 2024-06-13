export const authSelector = state => state.auth;
export const connectSelector = state => state.connect;
export const userSelector = state => state.user;
export const domainSelector = state => state.app.domain;
export const userInfoSelector = state => state.user.user;
export const settingSelector = state => state.app.setting;
export const languageSelector = state => state.app.language;

export const listAccountInfoSelector = state => state.auth.listAccountInfo;
export const currentAccountIndexSelector = state =>
  state.auth.currentAccountIndex;

//Temp
// export const deviceSelector = state => state.app.device;
export const homeSelector = state => state.home;
export const discoverySelector = state => state.discovery;
export const wishlistSelector = state => state.wishlist;
export const searchSelector = state => state.search;
export const listingSelector = state => state.listing;
export const reviewSelector = state => state.review;
export const bookingSelector = state => state.booking;
export const bookingRequestSelector = state => state.booking.request;
export const tokenSelector = state => state.auth.token;
