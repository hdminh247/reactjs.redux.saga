import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the newOffers state domain
 */

const selectNewOffersDomain = state => state.get("newOffers", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewOffers
 */

const makeSelectNewOffers = () =>
  createSelector(selectNewOffersDomain, substate => substate.toJS());

export default makeSelectNewOffers;
export { selectNewOffersDomain };
