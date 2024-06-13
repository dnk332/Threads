import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '@reducers';
import rootSagas from '@sagas';

const bindMiddleware = middleware => applyMiddleware(...middleware);

/**
 * Redux Setting
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'auth'],
  version: 1.0,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

let store;
if (__DEV__) {
  store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
} else {
  store = createStore(persistedReducer, bindMiddleware(middlewares));
}

const persist = persistStore(store);
export {store, persist};

sagaMiddleware.run(rootSagas);
