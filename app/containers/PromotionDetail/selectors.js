import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the promotionDetail state domain
 */

const selectPromotionDetailDomain = state =>
  state.get("promotionDetail", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PromotionDetail
 */

const makeSelectPromotionDetail = () =>
  createSelector(selectPromotionDetailDomain, substate => substate.toJS());

export default makeSelectPromotionDetail;
export { selectPromotionDetailDomain };
