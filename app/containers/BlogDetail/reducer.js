/*
 *
 * BlogDetail reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_BLOG_DETAIL, GET_BLOG_DETAIL_ERROR, GET_BLOG_DETAIL_SUCCESS, GET_RELATE_BLOG_LIST_ERROR, GET_RELATE_BLOG_LIST_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  blogDetail: {
    createdBy: { firstName: "", lastName: "" }
  },
  relatedBlogList: []
});

function blogDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_BLOG_DETAIL_SUCCESS:
      return state
        .set("blogDetail", fromJS(action.response));

    case GET_BLOG_DETAIL:
    case GET_BLOG_DETAIL_ERROR:
      return state.set("blogDetail", initialState.get("blogDetail"));

    case GET_RELATE_BLOG_LIST_SUCCESS:
      return state
        .set("relatedBlogList", fromJS(action.response));

    case GET_RELATE_BLOG_LIST_ERROR:
      return state.set("relatedBlogList", fromJS([]));
    default:
      return state;
  }
}

export default blogDetailReducer;
