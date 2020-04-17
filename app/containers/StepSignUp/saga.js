import { put, takeLatest } from "redux-saga/effects";
import {
  BANK_SETUP,
  CONFIRM_OTP,
  GET_COUNTRY_LIST,
  GET_DRIVER_INFO_QUESTION,
  LICENSE_SETUP,
  PAYMENT_SETUP,
  QUESTION_SETUP,
  RESEND_OTP,
  SECURITY_RESEND_CODE,
  SECURITY_SEND_CODE,
  SEND_CODE_SETUP_PASSWORD,
  VERIFY_USER
} from "./constants";
import {
  getCountryListError,
  getCountryListSuccess,
  getDriverInfoQuestionError,
  getDriverInfoQuestionSuccess,
  getError,
  getSuccess,
  resendError,
  resendSuccess,
  sendError,
  sendSuccess
} from "./actions";

import config from "config";
import axios from "axios";
import { getCurrentUser } from "../Auth/actions";
import { loadRepos, reposLoaded, updateError, updateSuccess } from "../App/actions";
import { GET_DRIVER_LICENSE, GET_PAYOUT_CITY, GET_PAYOUT_COUNTRY, GET_PAYOUT_STATE } from "../HomePage/constants";
import { apiGetDriverLicense, apiGetPayoutCity, apiGetPayoutCountry, apiGetPayoutState } from "../HomePage/saga";
import _ from "lodash";
import { urlLink } from "../../helper/route";

// Individual exports for testing

export function* apiVerifyUser(payload) {
  const { data } = payload;

  const requestUrl = config.serverUrl + config.api.auth.verifyUser;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
    yield window.location.reload();
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getError(errors));
  }
}

export function* apiConfirmOTP(payload) {
  const { data } = payload;
  const requestUrl = config.serverUrl + config.api.auth.confirmOTP;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
    yield window.location.reload();
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getError(errors));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiResendOTP(payload) {
  const { data = {} } = payload;
  const requestUrl = config.serverUrl + config.api.auth.resendOTP;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getError(errors));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPaymentSetup(payload) {
  const {
    data = {},
    resolve = () => {
    },
    reject = () => {
    },
    isReload = true
  } = payload;
  const requestUrl = config.serverUrl + config.api.auth.setup_payment;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
    yield window.location.reload();
  } catch (error) {
    const { errors = [] } = error.response.data;
    if (error.response)
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    yield put(getError(errors));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiBankSetup(payload) {
  const {
    data = {},
    resolve = () => {
    },
    reject = () => {
    },
    isReload = true
  } = payload;
  const requestUrl = config.serverUrl + config.api.auth.setup_bank;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
    if (_.isFunction(resolve))
      resolve(response.data);
    if (isReload)
      yield window.location.reload();
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getError(errors));

    if (error.response)
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    if (_.isFunction(reject))
      reject(error);
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiLicenseSetup(payload) {
  const { data = {} } = payload;
  const requestUrl = config.serverUrl + config.api.auth.setup_license;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
    yield window.location.reload();
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getError(errors));
  }
}

export function* apiQuestionSetup(payload) {
  const { data = {} } = payload;
  const requestUrl = config.serverUrl + config.api.auth.driverInfo;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(getSuccess(response.data));
    yield put(getCurrentUser());
    yield put(
      updateSuccess({
        visible: true,
        title: "Successfully Register!",
        content: "Thank you for registering as a driver for our company. Please check the inbox of receive calendar to the company and sign the official contract!",
        link: urlLink.root
      })
    );
    // !last step will not reload page, show popup success, and click ok will go to url root
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getError(errors));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetCountryList() {
  const requestUrl = config.serverUrl + config.api.auth.country_list;
  try {
    const response = yield axios.get(requestUrl);
    yield put(getCountryListSuccess(response.data.data));

  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getCountryListError(errors));
  }
}

export function* apiGetDriverInfoQuestion() {
  const requestUrl = config.serverUrl + config.api.auth.driverInfoQuestion;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDriverInfoQuestionSuccess(response.data.data));
  } catch (error) {
    const { errors = [] } = error.response.data;
    yield put(getDriverInfoQuestionError(errors));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* defaultSaga() {
  yield takeLatest(VERIFY_USER, apiVerifyUser);
  yield takeLatest(CONFIRM_OTP, apiConfirmOTP);
  yield takeLatest(RESEND_OTP, apiResendOTP);
  yield takeLatest(PAYMENT_SETUP, apiPaymentSetup);
  yield takeLatest(BANK_SETUP, apiBankSetup);
  yield takeLatest(LICENSE_SETUP, apiLicenseSetup);
  yield takeLatest(QUESTION_SETUP, apiQuestionSetup);
  yield takeLatest(GET_COUNTRY_LIST, apiGetCountryList);
  yield takeLatest(GET_DRIVER_INFO_QUESTION, apiGetDriverInfoQuestion);
  yield takeLatest(GET_DRIVER_LICENSE, apiGetDriverLicense);

  //  PAYOUT
  yield takeLatest(GET_PAYOUT_COUNTRY, apiGetPayoutCountry);
  yield takeLatest(GET_PAYOUT_STATE, apiGetPayoutState);
  yield takeLatest(GET_PAYOUT_CITY, apiGetPayoutCity);
}
