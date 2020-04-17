import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the help state domain
 */

const selectHelpDomain = state => state.get("help", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Help
 */

const makeSelectHelp = () =>
  createSelector(selectHelpDomain, substate => substate.toJS());

export default makeSelectHelp;
export { selectHelpDomain };
