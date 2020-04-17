import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the carManagement state domain
 */

const selectCarManagementDomain = state =>
  state.get("carManagement", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CarManagement
 */

const makeSelectCarManagement = () =>
  createSelector(selectCarManagementDomain, substate => substate.toJS());

export default makeSelectCarManagement;
export { selectCarManagementDomain };
