/*
 *
 * ChangePassword actions
 *
 */

import { CHANGE_STORE_DATA, DEFAULT_ACTION, PUT_CHANGE_PASSWORD, PUT_CHANGE_PASSWORD_FAIL, PUT_CHANGE_PASSWORD_SUCCESS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function putChangePassword(data) {
  return {
    type: PUT_CHANGE_PASSWORD,
    data
  };
}

export function putChangePasswordSuccess(response) {
  return {
    type: PUT_CHANGE_PASSWORD_SUCCESS,
    response
  };
}

export function putChangePasswordFail(error) {
  return {
    type: PUT_CHANGE_PASSWORD_FAIL,
    error
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value
  };
}
