import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the promotionList state domain
 */

const selectPromotionListDomain = state =>
  state.get("promotionList", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PromotionList
 */

const makeSelectPromotionList = () =>
  createSelector(selectPromotionListDomain, substate => substate.toJS());

export default makeSelectPromotionList;
export { selectPromotionListDomain };
