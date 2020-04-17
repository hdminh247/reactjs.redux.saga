import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the currentBookings state domain
 */

const selectCurrentBookingsDomain = state =>
  state.get("currentBookings", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CurrentBookings
 */

const makeSelectCurrentBookings = () =>
  createSelector(selectCurrentBookingsDomain, substate => substate.toJS());

export default makeSelectCurrentBookings;
export { selectCurrentBookingsDomain };
