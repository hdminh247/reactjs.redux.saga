/*
 *
 * ChangePasswordPage reducer
 *
 */
import { fromJS } from "immutable";
import _ from "lodash";
import { CHANGE_ERROR, CHANGE_PASSWORD_EMAIL_ERROR, CHANGE_PASSWORD_EMAIL_SUSCCESS, CHANGE_SUCCESS, DEFAULT_ACTION, RESET, SET_ISSENT, SHOW_SUCCESS } from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";

export const initialState = fromJS({
  errors: [],
  errorsForgot: [],
  showSuccessModal: false,
  isSent: false
});

function changePasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET:
    case LOCATION_CHANGE:
      return initialState;
    case CHANGE_SUCCESS:
      return state
        .set("showSuccessModal", true);
    case CHANGE_ERROR:
      return state
        .set("errors", fromJS(_.isEmpty(action.response.errors) ? [] : action.response.errors));
    case CHANGE_PASSWORD_EMAIL_SUSCCESS:
      return state
        .set("isSent", true)
        .set("errorsForgot", fromJS(action.response.errors));
    case CHANGE_PASSWORD_EMAIL_ERROR:
      return state
        .set("isSent", false)
        .set("errorsForgot", fromJS(action.response.errors));
    case SET_ISSENT:
      return state
        .set("isSent", false);
    case SHOW_SUCCESS:
      return state
        .set("showSuccessModal", action.value);
    default:
      return state;
  }
}

export default changePasswordPageReducer;
