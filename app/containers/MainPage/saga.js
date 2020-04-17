// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest } from "redux-saga/effects";
import { SIGN_UP_AS_DRIVER } from "../SignUpPage/constants";
import { signUpAsDriver } from "../SignUpPage/saga";
import { CURRENT_USER } from "../Auth/constants";
import { apiGetCurrentUser } from "../Auth/saga";

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGN_UP_AS_DRIVER, signUpAsDriver);
  yield takeLatest(CURRENT_USER, apiGetCurrentUser);
}
