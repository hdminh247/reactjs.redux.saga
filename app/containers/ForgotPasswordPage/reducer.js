/*
 *
 * ResetPasswordPage reducer
 *
 */
import { fromJS } from "immutable";
import { DEFAULT_ACTION, FORGOT_PASSWORD_EMAIL_ERROR, FORGOT_PASSWORD_EMAIL_SUSCCESS, RESEND_ERROR, RESEND_SUSCCESS, SET_ISSENT } from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";

export const initialState = fromJS({
  isSent: false,
  errors: []
});

function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set("errors", []);
    case LOCATION_CHANGE:
      return initialState;
    case FORGOT_PASSWORD_EMAIL_SUSCCESS:
      return state.set("isSent", true).set("errors", action.response.errors);
    case FORGOT_PASSWORD_EMAIL_ERROR:
      return state.set("isSent", false).set("errors", action.response.errors);
    case RESEND_SUSCCESS:
      return state.set("isSent", true).set("errors", action.response.errors);
    case RESEND_ERROR:
      return state.set("errors", action.response.errors);
    case SET_ISSENT:
      return state.set("isSent", false);
    default:
      return state;
  }
}

export default resetPasswordPageReducer;
