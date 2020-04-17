import { put, takeLatest } from "redux-saga/effects";
import { SETUP_PASSWORD } from "./constants";
import { resetError, setupSuccess } from "./actions";
import config from "config";
import axios from "axios";
import { push } from "react-router-redux";
import { urlLink } from "../../helper/route";
import _ from "lodash";
import localStoreService from "local-storage";
import { saveCurrentUser } from "../App/actions";

// Individual exports for testing
export function* apiSetupPassword(data) {
  const { code = "", password = "" } = data;
  const requestUrl = `${config.serverUrl}${config.api.auth.setup_password}?code=${code}`;

  try {
    const response = yield axios.post(requestUrl, {
      password: password,
      confirmPassword: password
    });
    yield put(setupSuccess(response.data));
    console.log("apiSetupPassword----------", response.data);
    const { token = "" } = response.data.data;

    if (_.isEmpty(token)) {
      yield put(push(urlLink.resetPasswordSuccess));
    } else {
      yield localStoreService.set("token", token);
      yield saveCurrentUser(response.data);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      yield put(push(urlLink.stepSignUp));
    }
  } catch (error) {
    yield put(resetError(error.response.data));
  }

}

export default function* getPassword() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SETUP_PASSWORD, apiSetupPassword);
}
