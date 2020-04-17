/*
 *
 * ChangePassword reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION, PUT_CHANGE_PASSWORD_FAIL, PUT_CHANGE_PASSWORD_SUCCESS } from "./constants";

export const initialState = fromJS({
  errorText: "",
  errorsForgot: [],
  showSuccessModal: false,
  isSent: false,
  showPopupError: false
});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PUT_CHANGE_PASSWORD_SUCCESS:
      return state
        .set("showSuccessModal", true);
    case PUT_CHANGE_PASSWORD_FAIL:
      return state
        .set("showPopupError", true)
        .set("errorText", fromJS(action.error));
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));
    default:
      return state;
  }
}

export default changePasswordReducer;
