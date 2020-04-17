/*
 *
 * StepSignUp actions
 *
 */

import {
  BANK_SETUP,
  CHANGE_STORE_DATA,
  CONFIRM_OTP,
  DEFAULT_ACTION,
  GET_COUNTRY_LIST,
  GET_COUNTRY_LIST_FAIL,
  GET_COUNTRY_LIST_SUCCESS,
  GET_DRIVER_INFO_QUESTION,
  GET_DRIVER_INFO_QUESTION_FAIL,
  GET_DRIVER_INFO_QUESTION_SUCCESS,
  GET_ERROR,
  GET_SUCCESS,
  LICENSE_SETUP,
  PAYMENT_SETUP,
  QUESTION_SETUP,
  RESEND_OTP,
  VERIFY_USER
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value
  };
}

export function verifyUser(data) {
  return {
    type: VERIFY_USER,
    data
  };
}

export function confirmOTP(data) {
  return {
    type: CONFIRM_OTP,
    data
  };
}

export function resendOTP() {
  return {
    type: RESEND_OTP
  };
}

export function paymentSetup(data, resolve, reject) {
  return {
    type: PAYMENT_SETUP,
    data,
    resolve, reject
  };
}

export function bankSetup(data, resolve, reject, isReload) {
  return {
    type: BANK_SETUP,
    data,
    resolve, reject,
    isReload
  };
}

export function questionSetup(data) {
  return {
    type: QUESTION_SETUP,
    data
  };
}

export function licenseSetup(data) {
  return {
    type: LICENSE_SETUP,
    data
  };
}

export function getCountryList(resolve, reject) {
  return {
    type: GET_COUNTRY_LIST,
    resolve, reject
  };
}

export function getCountryListSuccess(response) {
  return {
    type: GET_COUNTRY_LIST_SUCCESS,
    response
  };
}

export function getCountryListError(err) {
  return {
    type: GET_COUNTRY_LIST_FAIL,
    err
  };
}

export function getDriverInfoQuestion(resolve, reject) {
  return {
    type: GET_DRIVER_INFO_QUESTION,
    resolve, reject
  };
}

export function getDriverInfoQuestionSuccess(response) {
  return {
    type: GET_DRIVER_INFO_QUESTION_SUCCESS,
    response
  };
}

export function getDriverInfoQuestionError(err) {
  return {
    type: GET_DRIVER_INFO_QUESTION_FAIL,
    err
  };
}

export function getSuccess(response) {
  return {
    type: GET_SUCCESS,
    response
  };
}

export function getError(err) {
  return {
    type: GET_ERROR,
    err
  };
}
