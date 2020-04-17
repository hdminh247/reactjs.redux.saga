import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the historyDrive state domain
 */

const selectHistoryDriveDomain = state =>
  state.get("historyDrive", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryDrive
 */

const makeSelectHistoryDrive = () =>
  createSelector(selectHistoryDriveDomain, substate => substate.toJS());

export default makeSelectHistoryDrive;
export { selectHistoryDriveDomain };
