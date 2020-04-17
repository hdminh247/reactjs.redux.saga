/*
 *
 * PromotionDetail reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_PROMOTION_DETAIL, GET_PROMOTION_DETAIL_ERROR, GET_PROMOTION_DETAIL_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  promotionDetail: {
    coupons: [{ code: "" }]
  }
});

function promotionDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_PROMOTION_DETAIL_SUCCESS:
      return state
        .set("promotionDetail", fromJS(action.response));

    case GET_PROMOTION_DETAIL:
    case GET_PROMOTION_DETAIL_ERROR:
      return state.set("promotionDetail", initialState.get("promotionDetail"));

    default:
      return state;
  }
}

export default promotionDetailReducer;
