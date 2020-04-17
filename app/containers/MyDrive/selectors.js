import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the myDrive state domain
 */

const selectMyDriveDomain = state => state.get("myDrive", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyDrive
 */

const makeSelectMyDrive = () =>
  createSelector(selectMyDriveDomain, substate => substate.toJS());

export default makeSelectMyDrive;
export { selectMyDriveDomain };
