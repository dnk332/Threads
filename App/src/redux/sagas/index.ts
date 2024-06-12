import {all} from 'redux-saga/effects';
import authSagas from './authSagas';
// import applicationSagas from './appSagas';

export default function* rootSaga() {
  yield all([authSagas()]);
}
