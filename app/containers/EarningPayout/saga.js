// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest } from "redux-saga/effects";
import { BANK_SETUP } from "../StepSignUp/constants";
import { apiBankSetup } from "../StepSignUp/saga";

export default function* earningPayoutSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(BANK_SETUP, apiBankSetup);
}
