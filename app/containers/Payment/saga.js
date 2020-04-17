// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest } from "redux-saga/effects";
import config from "config";
import axios from "axios";

import { DELETE_CARD, GET_CARD_LIST, GET_CURRENT_USER, POST_PAYMENT_SETUP } from "./constants";
import {
  deleteCardFail,
  deleteCardSuccess,
  getCardList,
  getCardListFail,
  getCardListSuccess,
  getCurrentUser,
  getCurrentUserFail,
  getCurrentUserSuccess,
  postPaymentSetupFail,
  postPaymentSetupSuccess
} from "./actions";
import { loadRepos, reposLoaded, saveCurrentUser, updateError } from "../App/actions";
import _ from "lodash";

// Individual exports for testing
export function* apiPostPaymentSetup(payload) {
  const { resolve, reject } = payload;
  const requestUrl = config.serverUrl + config.api.auth.setup_payment;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, payload.payload);
    yield put(postPaymentSetupSuccess(response.data.data));
    yield put(getCardList());
    yield put(getCurrentUser());
    if (_.isFunction(resolve)) resolve(response);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(postPaymentSetupFail(error.response.data.errors));
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
    if (_.isFunction(reject)) reject(error);
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetCurrentUser(payload) {
  let {
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = config.serverUrl + config.api.auth.currentUser;
  try {
    const response = yield axios.get(requestUrl);
    const { paymentAccount = {} } = response.data.data;
    yield put(saveCurrentUser(response.data.data));
    yield put(getCurrentUserSuccess(paymentAccount));
    if (_.isFunction(resolve)) resolve(response);
  } catch (error) {
    if (_.isFunction(reject)) reject(error);
    if (error.response.data && error.response.data.errors)
      yield put(getCurrentUserFail(error.response.data.errors));
  }
}

export function* apiGetCardList() {
  const requestUrl = config.serverUrl + config.api.auth.card_list;
  try {
    const response = yield axios.get(requestUrl);
    yield put(getCardListSuccess(response.data.data));
  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getCardListFail(error.response.data.errors));
  }
}

export function* apiDeleteCard(payload) {
  const requestUrl = config.serverUrl + config.api.auth.card_delete + payload.cardId;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteCardSuccess(response.data.data));
    yield apiGetCardList();
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(deleteCardFail(error.response.data.errors));
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

export default function* paymentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(POST_PAYMENT_SETUP, apiPostPaymentSetup);
  yield takeLatest(GET_CARD_LIST, apiGetCardList);
  yield takeLatest(DELETE_CARD, apiDeleteCard);
  yield takeLatest(GET_CURRENT_USER, apiGetCurrentUser);
}
