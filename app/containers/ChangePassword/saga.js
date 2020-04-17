import { PUT_CHANGE_PASSWORD } from "./constants";
import config from "config";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { putChangePasswordFail, putChangePasswordSuccess } from "./actions";
import { loadRepos, reposLoaded } from "../App/actions";

// import { take, call, put, select } from 'redux-saga/effects';
export function* apiPutChangePassword(data) {
  if (data) {
    const requestUrl = config.serverUrl + config.api.auth.change_password;
    const { currentPassword, newPassword, confirmNewPassword } = data.data;
    yield put(loadRepos());
    try {
      const response = yield axios.put(requestUrl, {
        currentPassword,
        newPassword,
        confirmNewPassword
      });
      yield put(putChangePasswordSuccess(response.data));
    } catch (error) {
      yield put(putChangePasswordFail(error.response.data.errors.length >= 1 ? error.response.data.errors[0].errorMessage : ""));
    } finally {
      yield put(reposLoaded());
    }
  }
}

// Individual exports for testing
export default function* changePasswordSaga() {
  //
  // See example in containers/HomePage/saga.js
  yield takeLatest(PUT_CHANGE_PASSWORD, apiPutChangePassword);
}
