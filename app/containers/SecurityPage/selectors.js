import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the securityPage state domain
 */

const selectSecurityPageDomain = state => state.get("securityPage", initialState);
const selectLoginPageDomain = state => state.get("loginPage", initialState);
/**
 * Other specific selectors
 */
/**
 * Default selector used by SecurityPage
 */

const makeSelectSecurityPage = () =>
  createSelector(selectSecurityPageDomain, substate => substate.toJS());
const makeSelectErrors = () =>
  createSelector(selectSecurityPageDomain, securityPage => securityPage.get("errors"));
const makeSelectEmail = () =>
  createSelector(selectLoginPageDomain, loginPage => loginPage.get("email"));
export { makeSelectSecurityPage, makeSelectErrors, makeSelectEmail };
export { selectSecurityPageDomain };
