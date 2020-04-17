/*
 *
 * LoginPage reducer
 *
 */
import { fromJS } from "immutable";
import { DEFAULT_ACTION, GET_LOGIN_DATA, LOGIN_FAIL, LOGIN_SOCIAL, LOGIN_SOCIAL_FAIL, LOGIN_SOCIAL_SUCCESS, LOGIN_SUCCESS, SET_ERRORS } from "./constants";

export const initialState = fromJS({
  apiError: "",
  email: ""
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SET_ERRORS:
      return state
        .set("apiError", action.data);
    case GET_LOGIN_DATA:
      return state.set("apiError", []);
    case LOGIN_SUCCESS:
      return state
        .set("apiError", action.response.errors)
        .set("email", action.email);
    case LOGIN_FAIL:
      return state
        .set("apiError", action.response.errors);

    case LOGIN_SOCIAL:
      return state.set("apiError", []);
    case LOGIN_SOCIAL_SUCCESS:
      return state
        .set("apiError", action.response.errors)
        .set("email", action.email);
    case LOGIN_SOCIAL_FAIL:
      return state
        .set("apiError", action.response.errors);
    default:
      return state;
  }
}

export default loginPageReducer;
