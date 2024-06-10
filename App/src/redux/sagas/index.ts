import {all} from 'redux-saga/effects';
import authSagas from './appSagas';
import applicationSagas from './appSagas';

export default function* rootSaga() {
  yield all([applicationSagas(), authSagas()]);
}
