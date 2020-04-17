/*
 *
 * BookingOfferPage reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, CHANGE_STORE_DATA } from "./constants";

export const initialState = fromJS({
  showErrorBookingForm: false
});

function bookingOfferReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));
    default:
      return state;
  }
}

export default bookingOfferReducer;
