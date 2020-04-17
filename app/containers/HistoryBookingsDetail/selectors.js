import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the historyBookingsDetail state domain
 */

const selectHistoryBookingsDetailDomain = state =>
  state.get("historyBookingsDetail", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryBookingsDetail
 */

const makeSelectHistoryBookingsDetail = () =>
  createSelector(selectHistoryBookingsDetailDomain, substate =>
    substate.toJS()
  );

export default makeSelectHistoryBookingsDetail;
export { selectHistoryBookingsDetailDomain };
