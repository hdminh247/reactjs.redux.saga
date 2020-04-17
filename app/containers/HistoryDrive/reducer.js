/*
 *
 * HistoryDrive reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_DRIVE_HISTORY_LIST_ERROR, GET_DRIVE_HISTORY_LIST_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  params: {
    page: 0,
    size: 10,
    keyword: "",
    sortBy: "",
    sortType: ""
  },
  dataList: []
});

function historyDriveReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_DRIVE_HISTORY_LIST_SUCCESS:
      const { data: dataList = {} } = action.response;

      return state
        .set("dataList", fromJS(dataList));

    case GET_DRIVE_HISTORY_LIST_ERROR:
      return state
        .set("dataList", fromJS([]));

    default:
      return state;
  }
}

export default historyDriveReducer;
