import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the historyBookings state domain
 */

const selectHistoryBookingsDomain = state =>
  state.get("historyBookings", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryBookings
 */

const makeSelectHistoryBookings = () =>
  createSelector(selectHistoryBookingsDomain, substate => substate.toJS());

export default makeSelectHistoryBookings;
export { selectHistoryBookingsDomain };
