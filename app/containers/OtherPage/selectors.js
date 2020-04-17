import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the otherPage state domain
 */

const selectOtherPageDomain = state => state.get("otherPage", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OtherPage
 */

const makeSelectOtherPage = () =>
  createSelector(selectOtherPageDomain, substate => substate.toJS());

export default makeSelectOtherPage;
export { selectOtherPageDomain };
