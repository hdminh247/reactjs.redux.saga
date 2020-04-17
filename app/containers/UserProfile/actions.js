/*
 *
 * UserProfile actions
 *
 */

import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value
  };
}
