import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the currentBookingsDetail state domain
 */

const selectBookingsDetailDomain = state =>
  state.get("bookingsDetail", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingsDetail
 */

const makeSelectBookingsDetail = () =>
  createSelector(selectBookingsDetailDomain, substate =>
    substate.toJS()
  );

export default makeSelectBookingsDetail;
export { selectBookingsDetailDomain };
