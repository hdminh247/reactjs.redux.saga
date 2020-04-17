/*
 *
 * Payment reducer
 *
 */

import { fromJS } from "immutable";
import {
  CHANGE_STORE_DATA,
  DEFAULT_ACTION,
  DELETE_CARD_FAIL,
  DELETE_CARD_SUCCESS,
  GET_CARD_LIST_FAIL,
  GET_CARD_LIST_SUCCESS,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  POST_PAYMENT_SETUP_FAIL,
  POST_PAYMENT_SETUP_SUCCESS
} from "./constants";

export const initialState = fromJS({
  paymentError: [],
  paymentAccount: {},
  paymentAccountError: {},
  cardList: [],
  cardListError: [],
  deleteCardSuccess: {},
  deleteCardError: {},
  showSuccessModal: false,
  showPopupError: false
});

function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case POST_PAYMENT_SETUP_SUCCESS:
      return state
        .set("showSuccessModal", true)
        .set("deleteCardSuccess", {})
        .set("paymentAccount", fromJS(action.response));
    case POST_PAYMENT_SETUP_FAIL:
      return state
        .set("deleteCardError", true)
        .set("paymentError", fromJS(action.error));
    case GET_CARD_LIST_SUCCESS:
      return state
        .set("cardList", fromJS(action.response));
    case GET_CARD_LIST_FAIL:
      return state
        .set("cardListError", fromJS(action.error));
    case GET_CURRENT_USER_SUCCESS:
      return state
        .set("paymentAccount", fromJS(action.response));
    case GET_CURRENT_USER_FAIL:
      return state
        .set("paymentAccountError", fromJS(action.error));
    case DELETE_CARD_SUCCESS:
      console.log(action.response);
      return state
        .set("showSuccessModal", true)
        .set("deleteCardSuccess", fromJS(action.response));
    case DELETE_CARD_FAIL:
      return state
        .set("deleteCardError", fromJS(action.error));
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));
    default:
      return state;
  }
}

export default paymentReducer;
