/*
 *
 * SetupPasswordPage reducer
 *
 */
import { fromJS } from "immutable";
import { DEFAULT_ACTION, SETUP_ERROR } from "./constants";
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
    case SETUP_ERROR:
      return state
        .set("errors", action.response.errors);
    default:
      return state;
  }
}

export default resetPasswordPageReducer;
