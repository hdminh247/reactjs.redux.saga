import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the payout state domain
 */

const selectPayoutDomain = state => state.get("payout", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Payout
 */

const makeSelectPayout = () =>
  createSelector(selectPayoutDomain, substate => substate.toJS());

export default makeSelectPayout;
export { selectPayoutDomain };
