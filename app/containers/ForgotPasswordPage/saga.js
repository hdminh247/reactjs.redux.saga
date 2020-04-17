// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from "redux-saga/effects";
import { FORGOT_PASSWORD_SEND_EMAIL, RESEND_EMAIL } from "./constants";
import { resendError, resendSuccess, sendError, sendSuccess } from "./actions";

import config from "config";
import axios from "axios";
import { loadRepos, reposLoaded } from "../App/actions";

// Individual exports for testing
export function* apiSendEmail(data) {
  // See example in containers/HomePage/saga.js
  const { email = "", role = "customer" } = data;
  const requestUrl = config.serverUrl + config.api.auth.forgot_password;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, {
      email: email,
      role: role
    });

    yield put(sendSuccess(response.data));
  } catch (error) {

    if (error) {
      yield put(sendError(error.response.data));
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiReSendEmail(data) {
  // See example in containers/HomePage/saga.js
  const { email = "", role = "customer" } = data;

  const requestUrl = config.serverUrl + config.api.auth.resend_reset_password;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, {
      email,
      role
    });

    yield put(resendSuccess(response.data));
  } catch (error) {

    if (error) {
      yield put(resendError(error.response.data));
    }
  } finally {
    yield put(reposLoaded());
  }

}

export default function* getEmail() {
  yield takeLatest(FORGOT_PASSWORD_SEND_EMAIL, apiSendEmail);
  yield takeLatest(RESEND_EMAIL, apiReSendEmail);
}
