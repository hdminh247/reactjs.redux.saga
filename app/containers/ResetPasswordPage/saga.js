import { put, takeLatest } from "redux-saga/effects";
import { RESET_PASSWORD } from "./constants";
import { resetError, resetSuccess } from "./actions";
import config from "config";
import axios from "axios";
import { push } from "react-router-redux";

import { urlLink } from "../../helper/route";

// Individual exports for testing
export function* apiResetPassword(data) {
  const { code = "", password = "" } = data;

  const requestUrl = `${config.serverUrl}${config.api.auth.reset_password}/?code=${code}`;

  try {
    const response = yield axios.post(requestUrl, {
      password: password,
      confirmPassword: password
    });

    yield put(resetSuccess(response.data));
    yield put(push(urlLink.resetPasswordSuccess));
  } catch (error) {

    yield put(resetError(error.response.data));
  }

}

export default function* getPassword() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(RESET_PASSWORD, apiResetPassword);
}
