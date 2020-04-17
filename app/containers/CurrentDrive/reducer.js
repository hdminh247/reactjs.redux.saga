/*
 *
 * CurrentDrive reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_DRIVE_CURRENT_LIST_SUCCESS, GET_DRIVE_HISTORY_LIST_ERROR } from "../HomePage/constants";

export const initialState = fromJS({
  params: {
    page: 0,
    size: 10,
    keyword: "",
    sort: "",
    sortType: ""
  },
  currentDrive: {}
});

function currentDriveReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_DRIVE_CURRENT_LIST_SUCCESS:
      return state
        .set("currentDrive", fromJS(action.response));
    case GET_DRIVE_HISTORY_LIST_ERROR:
      return state
        .set("currentDrive", fromJS({}));
    default:
      return state;
  }
}

export default currentDriveReducer;
