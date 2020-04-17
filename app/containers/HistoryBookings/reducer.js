/*
 *
 * HistoryBookings reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_CURRENT_BOOKINGS_ERROR, GET_HISTORY_BOOKINGS_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  params: {
    page: 0,
    size: 10,
    keyword: "",
    sortBy: "bookingId",
    sortType: "descending"
  },
  dataList: []
});

function historyBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_HISTORY_BOOKINGS_SUCCESS:
      const { data: dataList = {} } = action.response;

      return state
        .set("dataList", fromJS(dataList));

    case GET_CURRENT_BOOKINGS_ERROR:
      return state
        .set("dataList", fromJS([]));
    default:
      return state;
  }
}

export default historyBookingsReducer;
