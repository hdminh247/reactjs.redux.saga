import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the biddingDrive state domain
 */

const selectBiddingDriveDomain = state =>
  state.get("biddingDrive", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BiddingDrive
 */

const makeSelectBiddingDrive = () =>
  createSelector(selectBiddingDriveDomain, substate => substate.toJS());

export default makeSelectBiddingDrive;
export { selectBiddingDriveDomain };
