/*
 *
 * ChangePasswordPage actions
 *
 */
import {
  CHANGE_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_EMAIL_ERROR,
  CHANGE_PASSWORD_EMAIL_SUSCCESS,
  CHANGE_PASSWORD_SEND_EMAIL,
  CHANGE_SUCCESS,
  DEFAULT_ACTION,
  RESET,
  SET_ISSENT,
  SHOW_SUCCESS
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function changePassword(data) {
  return {
    type: CHANGE_PASSWORD,
    data: data
  };
}

export function changeSuccess(response) {
  return {
    type: CHANGE_SUCCESS,
    response: response
  };
}

export function changeError(response) {
  return {
    type: CHANGE_ERROR,
    response: response
  };
}

export function sendEmail(email) {
  return {
    type: CHANGE_PASSWORD_SEND_EMAIL,
    email: email
  };
}

export function sendSuccess(response) {
  return {
    type: CHANGE_PASSWORD_EMAIL_SUSCCESS,
    response: response
  };
}

export function sendError(response) {
  return {
    type: CHANGE_PASSWORD_EMAIL_ERROR,
    response: response
  };
}

export function setIsSent() {
  return {
    type: SET_ISSENT
  };
}

export function reset() {
  return {
    type: RESET
  };
}

export function showSuccess(value) {
  return {
    type: SHOW_SUCCESS,
    value
  };
}
