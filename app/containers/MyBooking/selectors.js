import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the myBooking state domain
 */

const selectMyBookingDomain = state => state.get("myBooking", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyBooking
 */

const makeSelectMyBooking = () =>
  createSelector(selectMyBookingDomain, substate => substate.toJS());

export default makeSelectMyBooking;
export { selectMyBookingDomain };
