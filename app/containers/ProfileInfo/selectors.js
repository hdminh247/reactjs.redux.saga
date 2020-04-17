import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the profileInfor state domain
 */

const selectProfileInforDomain = state =>
  state.get("profileInfor", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfileInfo
 */

const makeSelectProfileInfor = () =>
  createSelector(selectProfileInforDomain, substate => substate.toJS());

export default makeSelectProfileInfor;
export { selectProfileInforDomain };
