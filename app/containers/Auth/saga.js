import config from "config";
import axios from "axios";
import _ from "lodash";
// Individual exports for testing
import { put, takeLatest } from "redux-saga/effects";
import { CURRENT_USER } from "./constants";
import localStoreService from "local-storage";
import { getCurrentUserError, getCurrentUserSuccess } from "./actions";
import { getCurrentUser, saveCurrentUser } from "../App/actions";

export function* apiGetCurrentUser(payload) {

  const {
    payload: data = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;

  const requestUrl = config.serverUrl + config.api.auth.currentUser;

  try {
    const response = yield axios.get(requestUrl, data);
    const { data: user = {} } = response.data;

    yield localStoreService.set("user", user);
    yield put(saveCurrentUser(user));//!need save to App Component
    yield put(getCurrentUserSuccess(user));

    if (_.isFunction(resolve)) {
      resolve(user);
    }
  } catch (error) {
    console.log("apiGetCurrentUser", error);

    if (_.isFunction(reject)) {
      reject(error);
    }

    yield put(getCurrentUserError(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CURRENT_USER, apiGetCurrentUser);
}
