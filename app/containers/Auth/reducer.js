/*
 *
 * Auth reducer
 *
 */

import { fromJS } from "immutable";
import { CURRENT_USER_ERROR, CURRENT_USER_SUCCESS, DEFAULT_ACTION } from "./constants";

export const initialState = fromJS({
  currentUser: {}
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case CURRENT_USER_SUCCESS:
      return state.set("currentUser", action.user);

    case CURRENT_USER_ERROR:
      return state.set("currentUser", {});

    default:
      return state;
  }
}

export default authReducer;
