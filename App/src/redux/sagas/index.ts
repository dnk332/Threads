import {all} from 'redux-saga/effects';
import authSagas from './authSagas';
import appSagas from './appSagas';

export default function* rootSaga() {
  yield all([appSagas(), authSagas()]);
}
