/*
 *
 * LoginPage actions
 *
 */
import { DEFAULT_ACTION, GET_LOGIN_DATA, LOGIN_FAIL, LOGIN_SOCIAL, LOGIN_SOCIAL_FAIL, LOGIN_SOCIAL_SUCCESS, LOGIN_SUCCESS, SET_ERRORS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getLoginData(email, password, remember, linkToGo = "") {
  return {
    type: GET_LOGIN_DATA,
    email: email,
    password: password,
    remember: remember,
    linkToGo
  };
}

export function loginSuccess(response, email) {
  return {
    type: LOGIN_SUCCESS,
    response,
    email
  };
}

export function loginFail(response) {
  return {
    type: LOGIN_FAIL,
    response
  };
}

export function loginSocial(payload, resolve, reject) {
  return {
    type: LOGIN_SOCIAL,
    payload,
    resolve, reject
  };
}

export function loginSocialSuccess(response, email) {
  return {
    type: LOGIN_SOCIAL_SUCCESS,
    response: response,
    email: email
  };
}

export function loginSocialFail(response) {
  return {
    type: LOGIN_SOCIAL_FAIL,
    response: response
  };
}

export function setErrors(data) {
  return {
    type: SET_ERRORS,
    data
  };
}
