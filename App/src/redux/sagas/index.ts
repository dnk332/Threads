import {all} from 'redux-saga/effects';
import authSagas from './authSagas';
import appSagas from './appSagas';
import userSagas from './userSagas';
import postSagas from './postSagas';
import likeSagas from './likeSagas';
import pendingSagas from './pendingSaga';

export default function* rootSaga() {
  yield all([
    appSagas(),
    authSagas(),
    userSagas(),
    postSagas(),
    likeSagas(),
    pendingSagas(),
  ]);
}
