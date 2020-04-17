import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the bookingOffer state domain
 */

const selectBookingOfferDomain = state =>
  state.get("bookingOffer", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingOfferPage
 */

const makeSelectBookingOffer = () =>
  createSelector(selectBookingOfferDomain, substate => substate.toJS());

export default makeSelectBookingOffer;
export { selectBookingOfferDomain };
