import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the earningPayout state domain
 */

const selectEarningPayoutDomain = state =>
  state.get("earningPayout", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EarningPayout
 */

const makeSelectEarningPayout = () =>
  createSelector(selectEarningPayoutDomain, substate => substate.toJS());

export default makeSelectEarningPayout;
export { selectEarningPayoutDomain };
