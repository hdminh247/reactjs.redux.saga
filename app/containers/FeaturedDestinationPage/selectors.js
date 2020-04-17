import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the featuredDestinationPage state domain
 */

const selectFeaturedDestinationPageDomain = state =>
  state.get("featuredDestinationPage", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeaturedDestinationPage
 */

const makeSelectFeaturedDestinationPage = () =>
  createSelector(selectFeaturedDestinationPageDomain, substate =>
    substate.toJS()
  );

export default makeSelectFeaturedDestinationPage;
export { selectFeaturedDestinationPageDomain };
