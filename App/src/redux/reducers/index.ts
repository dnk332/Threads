import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {actionTypes} from '@actions';

import authReducer, {IAuthState} from './auth';
import applicationReducer from './app';
import userReducer, {IUserState} from './user';

const {APP} = actionTypes;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['application', 'auth'],
  timeout: 10000,
};

export interface IGlobalState {
  user: IUserState;
  app: any;
  auth: IAuthState;
}

const appReducer = combineReducers({
  auth: authReducer,
  app: applicationReducer,
  user: userReducer,
});
const rootReducer = (state, action) => {
  if (action.type === APP.CLEAR_REDUCER) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
