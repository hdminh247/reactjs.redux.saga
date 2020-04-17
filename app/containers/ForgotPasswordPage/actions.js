/*
 *
 * ResetPasswordPage actions
 *
 */
import { DEFAULT_ACTION, FORGOT_PASSWORD_EMAIL_ERROR, FORGOT_PASSWORD_EMAIL_SUSCCESS, FORGOT_PASSWORD_SEND_EMAIL, RESEND_EMAIL, RESEND_ERROR, RESEND_SUSCCESS, SET_ISSENT } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function sendEmail(email, role = "customer") {
  return {
    type: FORGOT_PASSWORD_SEND_EMAIL,
    email,
    role
  };
}

export function sendSuccess(response) {
  return {
    type: FORGOT_PASSWORD_EMAIL_SUSCCESS,
    response: response
  };
}

export function sendError(response) {
  return {
    type: FORGOT_PASSWORD_EMAIL_ERROR,
    response: response
  };
}


export function resendEmail(email, role = "customer") {
  return {
    type: RESEND_EMAIL,
    email,
    role
  };
}

export function resendSuccess(response) {
  return {
    type: RESEND_SUSCCESS,
    response: response
  };
}

export function resendError(response) {
  return {
    type: RESEND_ERROR,
    response: response
  };
}


export function setIsSent() {
  return {
    type: SET_ISSENT
  };
}
