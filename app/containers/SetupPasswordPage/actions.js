/*
 *
 * SetupPasswordPage actions
 *
 */
import { DEFAULT_ACTION, SETUP_ERROR, SETUP_PASSWORD, SETUP_SUCCESS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function setupPassword(code, password) {
  return {
    type: SETUP_PASSWORD,
    code,
    password
  };
}

export function setupSuccess(response) {
  return {
    type: SETUP_SUCCESS,
    response: response
  };
}

export function resetError(response) {
  return {
    type: SETUP_ERROR,
    response: response
  };
}
