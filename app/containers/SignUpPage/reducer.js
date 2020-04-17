/*
 *
 * SignUpPage reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "./constants";

export const initialState = fromJS({
  apiError: []
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SIGN_UP:
      return state.set("apiError", []);
    case SIGN_UP_SUCCESS:
      return state
        .set("apiError", action.response.errors)
        .set("email", action.email);
    case SIGN_UP_FAIL:

      return state
        .set("apiError", action.response.errors);
    default:
      return state;
  }
}

export default signUpPageReducer;
