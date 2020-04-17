// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from "redux-saga/effects";
import config from "config";
import axios from "axios";
import _ from "lodash";
import localStore from "local-storage";
import { GET_CURRENT_USER, POST_DRIVER_LICENSE, PUT_CURRENT_USER, PUT_DRIVER_LICENSE } from "./constants";
import { GET_COUNTRY_LIST } from "../StepSignUp/constants";
import {
  getCurrentUser,
  getCurrentUserFail,
  getCurrentUserSuccess,
  putCurrentUserFail,
  putCurrentUserSuccess,
  putDriverLicenseFail,
  putDriverLicenseSuccess
} from "./actions";
import { apiGetCountryList } from "../StepSignUp/saga";
import { loadRepos, reposLoaded, saveCurrentUser, updateError } from "../App/actions";

export function* apiGetCurrentUser() {
  const requestUrl = config.serverUrl + config.api.auth.currentUser;
  try {
    const response = yield axios.get(requestUrl);
    const { data: dataUser } = response.data;
    yield localStore.set("user", dataUser);
    yield put(getCurrentUserSuccess(dataUser));
    yield put(saveCurrentUser(dataUser)); //!need save to App Component
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getCurrentUserFail(error.response.data.errors));
    }
  }
}

export function* apiPutCurrentUser(payload) {
  const {
    dataUser: dataForm = "", resolve = () => {
    }, reject = () => {
    }
  } = payload;
  const requestUrl = config.serverUrl + config.api.auth.currentUser;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, dataForm);
    const { data: dataUser = {} } = response.data;
    yield localStore.set("user", dataUser);
    yield put(putCurrentUserSuccess(dataUser));
    yield put(saveCurrentUser(dataUser)); //!need save to App Component
    if (_.isFunction(resolve))
      resolve(dataUser);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(putCurrentUserFail(error.response.data.errors));
      if (_.isFunction(reject))
        reject(error.response.data.errors);
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostDriverLisence(payload) {
  const { dataUser: dataForm = "" } = payload;
  const requestUrl = config.serverUrl + config.api.auth.currentUser;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, dataForm);
    const { data: dataUser } = response.data;
    yield localStore.set("user", dataUser);
    yield put(putCurrentUserSuccess(dataUser));
    yield put(saveCurrentUser(dataUser)); //!need save to App Component
  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(putCurrentUserFail(error.response.data.errors));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutDriverLisence(payload) {
  const {
    companyLicenseId = "", dataForm
  } = payload;

  const requestUrl = `${config.serverUrl}${config.api.driver.put}/${companyLicenseId}`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, dataForm);

    const { data = {} } = response.data;
    yield put(putDriverLicenseSuccess(data));
    yield put(getCurrentUser());
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(putDriverLicenseFail(error.response.data.errors));
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    }
  } finally {
    yield put(reposLoaded());
  }
}

export default function* profileInforSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_CURRENT_USER, apiGetCurrentUser);
  yield takeLatest(PUT_CURRENT_USER, apiPutCurrentUser);
  yield takeLatest(GET_COUNTRY_LIST, apiGetCountryList);
  yield takeLatest(POST_DRIVER_LICENSE, apiPostDriverLisence);
  yield takeLatest(PUT_DRIVER_LICENSE, apiPutDriverLisence);
}
