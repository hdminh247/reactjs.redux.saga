import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the blogDetail state domain
 */

const selectBlogDetailDomain = state => state.get("blogDetail", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlogDetail
 */

const makeSelectBlogDetail = () =>
  createSelector(selectBlogDetailDomain, substate => substate.toJS());

export default makeSelectBlogDetail;
export { selectBlogDetailDomain };
