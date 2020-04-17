/*
 *
 * SignUpPage actions
 *
 */

import { DEFAULT_ACTION, SIGN_UP, SIGN_UP_AS_DRIVER, SIGN_UP_AS_DRIVER_ERROR, SIGN_UP_AS_DRIVER_SUCCESS, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function signUp(payload) {
  return {
    type: SIGN_UP,
    payload
  };
}

export function signUpSuccess(response, email) {
  return {
    type: SIGN_UP_SUCCESS,
    response: response,
    email: email
  };
}

export function signUpFail(response) {
  return {
    type: SIGN_UP_FAIL,
    response: response
  };
}

export function signUpAsDriver(resolve, reject) {
  return {
    type: SIGN_UP_AS_DRIVER,
    resolve, reject
  };
}

export function signUpAsDriverSuccess(response) {
  return {
    type: SIGN_UP_AS_DRIVER_SUCCESS,
    response
  };
}

export function signUpAsDriverFail(error) {
  return {
    type: SIGN_UP_AS_DRIVER_ERROR,
    error
  };
}
