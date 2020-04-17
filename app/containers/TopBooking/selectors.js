import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the topBooking state domain
 */

const selectTopBookingDomain = state => state.get("topBooking", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopBooking
 */

const makeSelectTopBooking = () =>
  createSelector(selectTopBookingDomain, substate => substate.toJS());

export default makeSelectTopBooking;
export { selectTopBookingDomain };
