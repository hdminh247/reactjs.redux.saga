/*
 *
 * ProfileInfo actions
 *
 */
import {
  CHANGE_IMAGE,
  CHANGE_STORE_DATA,
  DEFAULT_ACTION,
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  POST_DRIVER_LICENSE,
  POST_DRIVER_LICENSE_SUCCESS,
  PUT_CURRENT_USER,
  PUT_CURRENT_USER_FAIL,
  PUT_CURRENT_USER_SUCCESS,
  PUT_DRIVER_LICENSE,
  PUT_DRIVER_LICENSE_FAIL,
  PUT_DRIVER_LICENSE_SUCCESS
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER
  };
}

export function getCurrentUserSuccess(dataUser) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    dataUser
  };
}


export function getCurrentUserFail(error) {
  return {
    type: GET_CURRENT_USER_FAIL,
    error
  };
}


export function putCurrentUser(dataUser, resolve, reject) {
  return {
    type: PUT_CURRENT_USER,
    dataUser,
    resolve, reject
  };
}

export function putCurrentUserSuccess(dataUser) {
  return {
    type: PUT_CURRENT_USER_SUCCESS,
    dataUser
  };
}

export function putCurrentUserFail(error) {
  return {
    type: PUT_CURRENT_USER_FAIL,
    error
  };
}

export function changeImage(image, role) {
  return {
    type: CHANGE_IMAGE,
    image,
    role
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value
  };
}

export function postDriverLicense(payload) {
  return {
    type: POST_DRIVER_LICENSE,
    payload
  };
}

export function postDriverLicenseSuccess(response) {
  return {
    type: POST_DRIVER_LICENSE_SUCCESS,
    response
  };
}

export function postDriverLicenseFail(error) {
  return {
    type: POST_DRIVER_LICENSE_FAIL,
    error
  };
}

export function putDriverLicense(companyLicenseId, dataForm) {
  return {
    type: PUT_DRIVER_LICENSE,
    companyLicenseId,
    dataForm
  };
}

export function putDriverLicenseSuccess(response) {
  return {
    type: PUT_DRIVER_LICENSE_SUCCESS,
    response
  };
}

export function putDriverLicenseFail(error) {
  return {
    type: PUT_DRIVER_LICENSE_FAIL,
    error
  };
}
