import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the auth state domain
 */

const selectAuthDomain = state => state.get("auth", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const makeSelectAuth = () =>
  createSelector(selectAuthDomain, substate => substate.toJS());

const makeSelectCurrentUserAuth = () =>
  createSelector(selectAuthDomain, substate => substate.get("user"));

export default makeSelectAuth;
export { selectAuthDomain };
