import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the SetupPasswordPage state domain
 */

const selectResetPasswordPageDomain = state =>
  state.get("SetupPasswordPage", initialState);
/**
 * Other specific selectors
 */
/**
 * Default selector used by SetupPasswordPage
 */

const makeSelectResetPasswordPage = () =>
  createSelector(selectResetPasswordPageDomain, substate => substate.toJS());
const makeSelectErrors = () =>
  createSelector(selectResetPasswordPageDomain, SetupPasswordPage => SetupPasswordPage.get("errors"));
export { makeSelectResetPasswordPage, makeSelectErrors };
export { selectResetPasswordPageDomain };
