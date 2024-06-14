import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {actionTypes} from '@actions';

import authReducer from './auth';
import applicationReducer from './app';
import userReducer from './user';

const {APP} = actionTypes;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['application', 'auth'],
  timeout: 10000,
};

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
