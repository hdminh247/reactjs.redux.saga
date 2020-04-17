import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the offerDetail state domain
 */

const selectOfferDetailDomain = state => state.get("offerDetail", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OfferDetail
 */

const makeSelectOfferDetail = () =>
  createSelector(selectOfferDetailDomain, substate => substate.toJS());

export default makeSelectOfferDetail;
export { selectOfferDetailDomain };
