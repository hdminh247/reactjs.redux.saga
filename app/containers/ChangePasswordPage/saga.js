import { put, takeLatest } from "redux-saga/effects";
import { CHANGE_PASSWORD, CHANGE_PASSWORD_SEND_EMAIL } from "./constants";
import { changeError, changeSuccess, sendError, sendSuccess } from "./actions";
import config from "config";
import axios from "axios";
import _ from "lodash";


// Individual exports for testing
export function* apiChangePassword(data) {
  if (data) {
    const requestUrl = config.serverUrl + config.api.auth.change_password;
    const { recentPassword, newPassword, confirmPassword } = data.data;

    try {
      const response = yield axios.put(requestUrl, {
        currentPassword: recentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      });
      yield put(changeSuccess(response.data));

    } catch (error) {

      yield put(changeError(error.response.data));
    }
  }
}

export function* apiSendEmail(data) {
  // See example in containers/HomePage/saga.js
  const { email } = data;
  if (!_.isUndefined(email)) {
    const requestUrl = config.serverUrl + config.api.auth.forgot_password;

    try {
      const response = yield axios.post(requestUrl, {
        email: email
      });

      yield put(sendSuccess(response.data));
    } catch (error) {

      if (error) {
        yield put(sendError(error.response.data));
      }
    }
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CHANGE_PASSWORD, apiChangePassword);
  yield takeLatest(CHANGE_PASSWORD_SEND_EMAIL, apiSendEmail);
}
