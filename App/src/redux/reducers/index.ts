import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import authReducer from './auth';
import {actionTypes} from '@action';

const {APP} = actionTypes;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['application', 'auth'],
  timeout: 10000,
};

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (
  state: {auth: {user: any}} | Partial<{auth: {user: any}}>,
  action: {type: any},
) => {
  if (action.type === APP.CLEAR_REDUCER) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
