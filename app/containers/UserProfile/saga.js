import { CONFIRM_OTP, RESEND_OTP } from "../StepSignUp/constants";
import { apiConfirmOTP, apiResendOTP } from "../StepSignUp/saga";
import { takeLatest } from "redux-saga/effects";

// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
export default function* userProfileSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CONFIRM_OTP, apiConfirmOTP);
  yield takeLatest(RESEND_OTP, apiResendOTP);
}
