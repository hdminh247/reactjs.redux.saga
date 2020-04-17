/*
 *
 * PromotionList reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_PROMOTION_LIST_ERROR, GET_PROMOTION_LIST_SUCCESS, GET_TOP_PROMOTION_LIST, GET_TOP_PROMOTION_LIST_ERROR, GET_TOP_PROMOTION_LIST_SUCCESS } from "../HomePage/constants";
import _ from "lodash";

export const initialState = fromJS({
  dataList: [],
  hotList: [],
  topPromotion: {}
});

function promotionListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_PROMOTION_LIST_SUCCESS:
      const { data: dataList = {} } = action.response;

      return state
        .set("dataList", fromJS(dataList));


    case GET_PROMOTION_LIST_ERROR:
      return state
        .set("dataList", fromJS([]));

    case GET_TOP_PROMOTION_LIST_SUCCESS:
      let temp = [];
      let topPromotion = {};
      if (_.isArray(action.response)) {
        temp = action.response.map(promotion => {
          const { data = {} } = promotion;
          const { image = "", title = "", content = "" } = data;
          let temp = { ...data, image, title, content };
          // console.log(temp);
          return temp;
        });

        if (temp.length > 0) {
          topPromotion = temp[0];
        }
      }

      return state
        .set("hotList", fromJS(temp))
        .set("topPromotion", fromJS(topPromotion));

    case GET_TOP_PROMOTION_LIST:
    case GET_TOP_PROMOTION_LIST_ERROR:
      return state
        .set("hotList", fromJS([]));
    default:
      return state;
  }
}

export default promotionListReducer;
