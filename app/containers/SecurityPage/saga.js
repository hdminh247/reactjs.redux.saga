import { put, takeLatest } from "redux-saga/effects";
import { SECURITY_RESEND_CODE, SECURITY_SEND_CODE, SEND_CODE_SETUP_PASSWORD } from "./constants";
import { resendError, resendSuccess, sendError, sendSuccess } from "./actions";

import config from "config";
import axios from "axios";
import { push } from "react-router-redux";
import { urlLink } from "helper/route";

// Individual exports for testing
export function* apiSendCode(data) {
  if (data.email && data.code) {

    const requestUrl = config.serverUrl + config.api.auth.verify_code;
    try {
      const response = yield axios.post(requestUrl, {
        email: data.email,
        code: data.code
      });
      yield put(sendSuccess(response.data));
      if (sessionStorage.getItem("isRemember")) {
        localStorage.setItem("isRemember", true);
      }
      localStorage.setItem("token", response.data.data.token.accessToken);

      //set default for all request after login success
      yield axios.defaults.headers.common["x-auth-token"] = "Bearer " + response.data.data.token.accessToken;

      yield put(push(urlLink.statistics));

    } catch (error) {

      yield put(sendError(error.response.data));
    }
  }
}

export function* apiResendCode(data) {
  const email = data.email;
  if (email) {

    const requestUrl = config.serverUrl + config.api.auth.resend_code;
    try {
      const response = yield axios.post(requestUrl, {
        email: email
      });

      yield put(resendSuccess(response.data));
    } catch (error) {

      yield put(resendError(error.response.data));
    }
  }
}

export function* apiSendCodeSetUpPassword(data) {
  if (data.token && data.code) {

    const requestUrl = config.serverUrl + config.api.auth.verify_code_with_token;
    try {
      yield axios.post(requestUrl, {
        token: data.token,
        code: data.code
      });
      // yield put(sendSuccess(response.data));
      // if(sessionStorage.getItem('isRemember')) {
      //   localStorage.setItem('isRemember', true);
      // }
      // localStorage.setItem('token', response.data.data.token.accessToken);

      yield put(push(urlLink.login));
    } catch (error) {

      yield put(sendError(error.response.data));
    }
  }
}

export default function* getEmail() {
  yield takeLatest(SECURITY_RESEND_CODE, apiResendCode);
  yield takeLatest(SECURITY_SEND_CODE, apiSendCode);
  yield takeLatest(SEND_CODE_SETUP_PASSWORD, apiSendCodeSetUpPassword);
}
