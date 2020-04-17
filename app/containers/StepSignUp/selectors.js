import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the stepSignUp state domain
 */

const selectStepSignUpDomain = state => state.get("stepSignUp", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StepSignUp
 */

const makeSelectStepSignUp = () =>
  createSelector(selectStepSignUpDomain, substate => substate.toJS());

export default makeSelectStepSignUp;
export { selectStepSignUpDomain };
