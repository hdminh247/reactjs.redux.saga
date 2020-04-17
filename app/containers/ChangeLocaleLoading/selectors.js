import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the changeLocaleLoading state domain
 */

const selectChangeLocaleLoadingDomain = state =>
  state.get("changeLocaleLoading", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangeLocaleLoading
 */

const makeSelectChangeLocaleLoading = () =>
  createSelector(selectChangeLocaleLoadingDomain, substate => substate.toJS());

export default makeSelectChangeLocaleLoading;
export { selectChangeLocaleLoadingDomain };
