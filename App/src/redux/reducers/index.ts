import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {actionTypes} from '@actions';

import authReducer, {IAuthState} from './auth';
import applicationReducer, {IAppState} from './app';
import userReducer, {IUserState} from './user';
import postReducer, {IPostState} from './post';

const {APP} = actionTypes;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['application', 'auth'],
  timeout: 10000,
};

export interface IGlobalState {
  user: IUserState;
  app: IAppState;
  auth: IAuthState;
  post: IPostState;
}

const appReducer = combineReducers({
  auth: authReducer,
  app: applicationReducer,
  user: userReducer,
  post: postReducer,
});
const rootReducer = (state, action) => {
  if (action.type === APP.CLEAR_REDUCER) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
