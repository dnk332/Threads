import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '@reducers';
import rootSagas from '@sagas';

// Middleware binding function
const bindMiddleware = middleware => applyMiddleware(...middleware);

/**
 * Redux Persist Configuration
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'auth'],
  version: 1,
  stateReconciler: autoMergeLevel1,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Store configuration with Redux DevTools support in development mode
const store = createStore(
  persistedReducer,
  __DEV__
    ? composeWithDevTools(bindMiddleware(middlewares))
    : bindMiddleware(middlewares),
);

// Persistor instance
const persistor = persistStore(store);

// Run root sagas
sagaMiddleware.run(rootSagas);

export {store, persistor};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
