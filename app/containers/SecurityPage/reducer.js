import { fromJS } from "immutable";
import { CLEAR_ERRORS, SECURITY_RESEND_ERROR, SECURITY_RESEND_SUCCESS, SECURITY_SEND_ERROR, SECURITY_SEND_SUCCESS, SET_TOKEN } from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";

export const initialState = fromJS({
  apiErrors: [],
  token: ""
});

function securityPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialState;
    case SECURITY_SEND_SUCCESS:
    case SECURITY_SEND_ERROR:
    case SECURITY_RESEND_SUCCESS:
    case SECURITY_RESEND_ERROR:
      return state
        .set("apiErrors", action.response.errors);
    case SET_TOKEN:
      return state
        .set("token", action.token);
    case CLEAR_ERRORS:
      return state
        .set("apiErrors", fromJS([]));
    default:
      return state;
  }
}

export default securityPageReducer;
