import {tokenDurationSelector} from '@src/redux/selectors';
import {store} from '@src/redux/store';

const isTokenExpired = async () => {
  let accessTokenDuration = tokenDurationSelector(store.getState());
  try {
    if (accessTokenDuration) {
      const expiryTime = parseInt(accessTokenDuration, 10);
      const currentTime = Date.now();
      return currentTime > expiryTime;
    }
    return true;
  } catch (error) {
    console.error('Error checking token expiry', error);
    return true;
  }
};

export default isTokenExpired;
