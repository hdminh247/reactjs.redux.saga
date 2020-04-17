import {
  CLEAR_ERRORS,
  SECURITY_RESEND_CODE,
  SECURITY_RESEND_ERROR,
  SECURITY_RESEND_SUCCESS,
  SECURITY_SEND_CODE,
  SECURITY_SEND_ERROR,
  SECURITY_SEND_SUCCESS,
  SEND_CODE_SETUP_PASSWORD,
  SET_TOKEN
} from "./constants";

export function sendCode(email, code) {
  return {
    type: SECURITY_SEND_CODE,
    email: email,
    code: code
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token
  };
}

export function sendSuccess(response) {
  return {
    type: SECURITY_SEND_SUCCESS,
    response: response
  };
}

export function sendError(response) {
  return {
    type: SECURITY_SEND_ERROR,
    response: response
  };
}

export function resendCode(email) {
  return {
    type: SECURITY_RESEND_CODE,
    email: email
  };
}

export function sendCodeCreateNewMember(token, code) {
  return {
    type: SEND_CODE_SETUP_PASSWORD,
    token,
    code
  };
}

export function resendSuccess(response) {
  return {
    type: SECURITY_RESEND_SUCCESS,
    response: response
  };
}

export function resendError(response) {
  return {
    type: SECURITY_RESEND_ERROR,
    response: response
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
