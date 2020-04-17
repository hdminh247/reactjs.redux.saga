import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the forgotPasswordPage state domain
 */

const selectForgotPasswordPageDomain = state =>
  state.get("forgotPasswordPage", initialState);
/**
 * Other specific selectors
 */
/**
 * Default selector used by ResetPasswordPage
 */

const makeSelectForgotPasswordPage = () =>
  createSelector(selectForgotPasswordPageDomain, substate => substate.toJS());
const makeSelectErrors = () =>
  createSelector(selectForgotPasswordPageDomain, forgotPassword => forgotPassword.get("errors"));
const makeSelectStatus = () =>
  createSelector(selectForgotPasswordPageDomain, forgotPassword => forgotPassword.get("isSent"));
export { makeSelectForgotPasswordPage, makeSelectErrors, makeSelectStatus };
export { selectForgotPasswordPageDomain };
