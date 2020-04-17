/*
 *
 * ResetPasswordPage reducer
 *
 */
import { fromJS } from "immutable";
import { CLEAR_ERROR, DEFAULT_ACTION, RESET_ERROR } from "./constants";
import { LOCATION_CHANGE } from "react-router-redux";

export const initialState = fromJS({
  errors: []
});

function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOCATION_CHANGE:
      return initialState;
    case RESET_ERROR:
      return state
        .set("errors", fromJS(action.response.errors));
    case CLEAR_ERROR:
      return state
        .set("errors", fromJS([]));
    default:
      return state;
  }
}

export default resetPasswordPageReducer;
