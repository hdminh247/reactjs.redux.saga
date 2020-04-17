import { put, takeLatest } from "redux-saga/effects";
import { GET_LOGIN_DATA, LOGIN_SOCIAL } from "./constants";
import { loginFail, loginSocialFail, loginSocialSuccess, loginSuccess } from "./actions";
import config from "config";
import axios from "axios";
import { push } from "react-router-redux";

import { urlLink } from "../../helper/route";
import localStoreService from "local-storage";
import { loadRepos, reposLoaded, saveCurrentUser, updateError } from "../App/actions";
import _ from "lodash";
import socket from "../../utils/socket";

// Individual exports for testing
export function* loginForUser(data) {
  // See example in containers/HomePage/saga.js

  const { email: userEmail = "", password: userPassword = "", linkToGo = "" } = data;
  const requestUrl = config.serverUrl + config.api.auth.sign_in;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, {
      email: userEmail,
      password: userPassword,
      role: "customer"
    });

    const {
      data: userLogin,
      data: {
        token
      }
    } = response.data;

// --------------------axios setting headers to request API-----------------------------------
    yield axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// -------------------------------------------------------------------------------------------
    yield localStoreService.set("token", userLogin.token);
    yield localStoreService.set("role", userLogin.role);
    yield localStoreService.set("user", userLogin);

    yield put(loginSuccess(userLogin, userEmail));
    yield put(saveCurrentUser(userLogin));

    if (linkToGo)
      yield put(push(linkToGo));
    yield socket.connect();
  } catch (error) {
    if (error.response) {
      const { data = {} } = error.response;

      // yield put(
      //   updateError({
      //     error: true,
      //     title: "System Error",
      //     message: !_.isArray(error.response.data.errors)
      //       ? error.response.data.error
      //       : error.response.data.errors[0].errorMessage
      //   })
      // );
      yield put(loginFail(data));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: "Error: 500 server internal error" }
        ]
      };
      yield put(loginFail(offlineData));
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* loginSocial({ payload }) {

  const { provider = "", accessToken = "", role = "", resolve, reject, linkRedirect = "" } = payload;
  const requestUrl = `${config.serverUrl}${config.api.auth.social}/${provider}/validate`;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, {
      accessToken,
      role
    });

    const {
      data: userLogin,
      data: {
        token = "",
        setupPasswordCode = ""
      }
    } = response.data;
    // --------------------axios setting headers to request API-----------------------------------
    yield axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    // -------------------------------------------------------------------------------------------
    yield localStoreService.set("token", userLogin.token);
    yield localStoreService.set("role", userLogin.role);
    yield localStoreService.set("user", userLogin);

    yield put(loginSocialSuccess(userLogin));
    yield put(saveCurrentUser(userLogin));

    if (_.isFunction(resolve))
      resolve(response);
    // LOGIC AFTER LOGIN SOCIAL
    // IF HAVE CODE SETUP PASSWORD IN RESPONSE WILL GO TO PAGE SETUP PASSWORD
    if (setupPasswordCode) {
      yield put(push(`${urlLink.setupPassword}?code=${setupPasswordCode}`));
    } else {
      if (linkRedirect)
        yield put(push(linkRedirect));
    }
    yield socket.connect();
  } catch (error) {
    if (error.response) {
      const { data = {} } = error.response;

      if (linkRedirect)
        yield put(
          updateError({
            error: true,
            title: "System Error",
            message: !_.isArray(error.response.data.errors)
              ? error.response.data.error
              : error.response.data.errors[0].errorMessage
          })
        );
      else yield put(loginSocialFail(offlineData));

      yield put(loginFail(data));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: "Error: 500 server internal error" }
        ]
      };

    }
    if (_.isFunction(reject))
      reject(error);
  } finally {
    yield put(reposLoaded());
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_LOGIN_DATA, loginForUser);
  yield takeLatest(LOGIN_SOCIAL, loginSocial);
}
