/*
 *
 * BookingOfferPage actions
 *
 */

import { DEFAULT_ACTION, CHANGE_STORE_DATA } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key, value
  };
}