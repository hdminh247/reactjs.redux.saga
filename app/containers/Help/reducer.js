/*
 *
 * Help reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import { REQUEST_HELP_ERROR, REQUEST_HELP_SUCCESS } from "../HomePage/constants";
import _ from "lodash";

export const initialState = fromJS({
  apiError: [],
  helpRequest: {
    name: "",
    email: "",
    message: "",
    images: []
  }
});

function helpReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set("apiError", fromJS([]))
        .set("helpRequest", fromJS(initialState.get("helpRequest")));

    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));

    case REQUEST_HELP_SUCCESS:
      return state.set("apiError", fromJS([]))
        .set("helpRequest", fromJS(initialState.get("helpRequest")));
    case REQUEST_HELP_ERROR:
      return state.set("apiError", fromJS(action.error));

    default:
      return state;
  }
}

export default helpReducer;
