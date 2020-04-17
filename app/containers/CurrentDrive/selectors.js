import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the currentDrive state domain
 */

const selectCurrentDriveDomain = state =>
  state.get("currentDrive", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CurrentDrive
 */

const makeSelectCurrentDrive = () =>
  createSelector(selectCurrentDriveDomain, substate => substate.toJS());

export default makeSelectCurrentDrive;
export { selectCurrentDriveDomain };
