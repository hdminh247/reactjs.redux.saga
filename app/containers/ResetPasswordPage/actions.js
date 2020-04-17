/*
 *
 * ResetPasswordPage actions
 *
 */
import { CLEAR_ERROR, DEFAULT_ACTION, RESET_ERROR, RESET_PASSWORD, RESET_SUCCESS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function resetPassword(code, password) {
  return {
    type: RESET_PASSWORD,
    code,
    password
  };
}

export function resetSuccess(response) {
  return {
    type: RESET_SUCCESS,
    response: response
  };
}

export function resetError(response) {
  return {
    type: RESET_ERROR,
    response: response
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
