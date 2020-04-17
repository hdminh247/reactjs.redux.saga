/*
 *
 * UserProfile reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import { GET_ERROR, GET_SUCCESS } from "../StepSignUp/constants";
import { PUT_CURRENT_USER_SUCCESS } from "../ProfileInfo/constants";
import _ from "lodash";

export const initialState = fromJS({
  apiError: [],
  dataUser: {},
  user: {}
});

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));
    case GET_SUCCESS:
      return state.set("apiError", fromJS([]));
    case GET_ERROR:
      return state.set("apiError", fromJS(action.err));
    case PUT_CURRENT_USER_SUCCESS:
      const { dataUser = {} } = action;

      return state
        .set("dataUser", fromJS(dataUser));

    default:
      return state;
  }
}

export default userProfileReducer;
