/*
 *
 * Payment actions
 *
 */

import {
  CHANGE_STORE_DATA,
  DEFAULT_ACTION,
  DELETE_CARD,
  DELETE_CARD_FAIL,
  DELETE_CARD_SUCCESS,
  GET_CARD_LIST,
  GET_CARD_LIST_FAIL,
  GET_CARD_LIST_SUCCESS,
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  POST_PAYMENT_SETUP,
  POST_PAYMENT_SETUP_FAIL,
  POST_PAYMENT_SETUP_SUCCESS
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function postPaymentSetup(payload, resolve, reject) {
  return {
    type: POST_PAYMENT_SETUP,
    payload,
    resolve, reject
  };
}

export function postPaymentSetupSuccess(response) {
  return {
    type: POST_PAYMENT_SETUP_SUCCESS,
    response
  };
}

export function postPaymentSetupFail(error) {
  return {
    type: POST_PAYMENT_SETUP_FAIL,
    error
  };
}

export function getCurrentUser(resolve, reject) {
  return {
    type: GET_CURRENT_USER,
    resolve, reject
  };
}

export function getCurrentUserSuccess(response) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    response
  };
}

export function getCurrentUserFail() {
  return {
    type: GET_CURRENT_USER_FAIL
  };
}

export function getCardList() {
  return {
    type: GET_CARD_LIST
  };
}

export function getCardListSuccess(response) {
  return {
    type: GET_CARD_LIST_SUCCESS,
    response
  };
}

export function getCardListFail(error) {
  return {
    type: GET_CARD_LIST_FAIL,
    error
  };
}

export function deleteCard(cardId) {
  return {
    type: DELETE_CARD,
    cardId
  };
}

export function deleteCardSuccess(response) {
  return {
    type: DELETE_CARD_SUCCESS,
    response
  };
}

export function deleteCardFail(error) {
  return {
    type: DELETE_CARD_FAIL,
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
