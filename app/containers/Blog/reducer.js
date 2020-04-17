/*
 *
 * Blog reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_BLOG_LIST_ERROR, GET_BLOG_LIST_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  blogList: [],
  params: {
    page: 0,
    size: 10,
    keyword: "",
    sortBy: "priority",
    sortType: "ascending"
  }
});

function blogReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_BLOG_LIST_SUCCESS:
      const { data = [] } = action.response;
      return state.set("blogList", fromJS(data));

    case GET_BLOG_LIST_ERROR:
      return state.set("blogList", fromJS([]));

    default:
      return state;
  }
}

export default blogReducer;
