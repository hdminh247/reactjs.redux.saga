import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectChangePasswordPageDomain = state =>
  state.get("changePasswordPage", initialState);
/**
 * Other specific selectors
 */
/**
 * Default selector used by ChangePasswordPage
 */

const makeSelectChangePasswordPage = () =>
  createSelector(selectChangePasswordPageDomain, substate => substate.toJS());
const makeSelectErrors = () =>
  createSelector(selectChangePasswordPageDomain, changePasswordPage => changePasswordPage.get("errors").toJS());
const makeSelectErrorsForgot = () =>
  createSelector(selectChangePasswordPageDomain, changePasswordPage => changePasswordPage.get("errorsForgot"));
const makeSelectIsSent = () =>
  createSelector(selectChangePasswordPageDomain, changePasswordPage => changePasswordPage.get("isSent"));
export { makeSelectChangePasswordPage, makeSelectErrors, makeSelectErrorsForgot, makeSelectIsSent };
export { selectChangePasswordPageDomain };
