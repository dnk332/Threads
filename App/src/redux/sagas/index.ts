import {all} from 'redux-saga/effects';
import authSagas from './authSagas';
import appSagas from './appSagas';
import userSagas from './userSagas';
import postSagas from './postSagas';

export default function* rootSaga() {
  yield all([appSagas(), authSagas(), userSagas(), postSagas()]);
}
