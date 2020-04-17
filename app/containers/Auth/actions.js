/*
 *
 * Auth actions
 *
 */

import { CURRENT_USER, CURRENT_USER_ERROR, CURRENT_USER_SUCCESS, DEFAULT_ACTION } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getCurrentUser(resolve, reject) {
  return {
    type: CURRENT_USER,
    resolve,
    reject
  };
}

export function getCurrentUserSuccess(user) {
  return {
    type: CURRENT_USER_SUCCESS,
    user
  };
}

export function getCurrentUserError(err) {
  return {
    type: CURRENT_USER_ERROR,
    err
  };
}
