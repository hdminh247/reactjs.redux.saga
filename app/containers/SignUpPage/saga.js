// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { put, takeLatest } from "redux-saga/effects";
import { SIGN_UP, SIGN_UP_AS_DRIVER } from "./constants";

import config from "config";
import axios from "axios";
import { push } from "react-router-redux";
import localStoreService from "local-storage";
import { signUpAsDriverFail, signUpAsDriverSuccess, signUpFail, signUpSuccess } from "./actions";
import { LOGIN_SOCIAL } from "../LoginPage/constants";
import { loginSocial } from "../LoginPage/saga";
import { loadRepos, reposLoaded, saveCurrentUser, updateError } from "../App/actions";
import { urlLink } from "../../helper/route";

export function* signUp(payload) {
  const { payload: data = {} } = payload;
  const requestUrl = config.serverUrl + config.api.auth.sign_up;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    const {
      data: userSignUp = {
        token: ""
      }
    } = response.data;
    axios.defaults.headers.common["Authorization"] = "Bearer " + userSignUp.token;
    yield localStoreService.set("token", userSignUp.token);
    yield localStoreService.set("user", userSignUp);

    yield put(signUpSuccess(userSignUp));
    yield put(saveCurrentUser(userSignUp));
    yield put(push(urlLink.stepSignUp));
  } catch (error) {
    if (error.response) {
      const { data: errors = {} } = error.response;

      yield put(signUpFail(errors));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: "Error: 500 server internal error" }
        ]
      };
      yield put(signUpFail(offlineData));
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* signUpAsDriver(payload) {

  const {
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.auth.sign_up_as_driver}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    const {
      data: userSignUp = {
        token: ""
      }
    } = yield response.data;

    yield localStoreService.set("user", userSignUp);
    yield localStoreService.set("role", ["customer", "company"]);

    yield put(signUpAsDriverSuccess(userSignUp));
    yield put(saveCurrentUser(userSignUp));

    if (_.isFunction(resolve))
      resolve(userSignUp);

  } catch (error) {
    if (error.response) {
      const { data: errors = {} } = error.response;
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
      yield put(signUpAsDriverFail(errors));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: "Error: 500 server internal error" }
        ]
      };
      yield put(signUpFail(offlineData));
    }
    if (_.isFunction(reject))
      reject(error);
  } finally {
    yield put(reposLoaded());
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGN_UP, signUp);
  yield takeLatest(SIGN_UP_AS_DRIVER, signUpAsDriver);
  yield takeLatest(LOGIN_SOCIAL, loginSocial);
}
