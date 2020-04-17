/*
 *
 * CurrentBookings reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_CURRENT_BOOKINGS_ERROR, GET_CURRENT_BOOKINGS_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  params: {
    page: 0,
    size: 10,
    keyword: "",
    sort: "",
    sortType: ""
  },
  dataPendingList: {
    data: []
  },
  dataConfirmedList: {
    data: []
  }
});

function currentBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_CURRENT_BOOKINGS_SUCCESS:
      const { data: dataRaw = {} } = action.response;
      //API RETURN 2 FIELD IN RESPONSE IS Pending and Confirmed
      const { Pending = {}, Confirmed = {} } = dataRaw;

      return state
        .set("dataPendingList", fromJS(Pending))
        .set("dataConfirmedList", fromJS(Confirmed));

    case GET_CURRENT_BOOKINGS_ERROR:
      return state
        .set("dataList", fromJS([]))
        .set("typeBooking", fromJS(""));
    default:
      return state;
  }
}

export default currentBookingsReducer;
