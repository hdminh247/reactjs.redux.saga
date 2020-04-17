/*
 *
 * NewOffers reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_OFFER_LIST_SUCCESS } from "../HomePage/constants";

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

function newOffersReducer(state = initialState, action) {
  var GET_OFFER_LIST_SUCCESS_ERROR;
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_OFFER_LIST_SUCCESS:
      const { data: dataList = {} } = action.response;

      return state
        .set("dataList", fromJS(dataList));

    case GET_OFFER_LIST_SUCCESS_ERROR:
      return state
        .set("dataList", fromJS([]));

    default:
      return state;
  }
}

export default newOffersReducer;
