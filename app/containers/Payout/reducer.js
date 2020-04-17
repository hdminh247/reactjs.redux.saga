/*
 *
 * Payout reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import _ from "lodash";
import {
  GET_PAYOUT_ACCOUNT_ERROR,
  GET_PAYOUT_ACCOUNT_SUCCESS,
  GET_PAYOUT_CITY_ERROR,
  GET_PAYOUT_CITY_SUCCESS,
  GET_PAYOUT_COUNTRY_ERROR,
  GET_PAYOUT_COUNTRY_SUCCESS,
  GET_PAYOUT_STATE_ERROR,
  GET_PAYOUT_STATE_SUCCESS
} from "../HomePage/constants";

export const initialState = fromJS({
  accountBank: {}
});

function payoutReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));
    // PAYOUT
    case GET_PAYOUT_ACCOUNT_SUCCESS:
      return state.set("accountBank", fromJS(action.response));
    case GET_PAYOUT_ACCOUNT_ERROR:
      return state.set("accountBank", fromJS(initialState.get("accountBank")));

    case GET_PAYOUT_COUNTRY_SUCCESS:
      return state.set("payoutCountryList", fromJS(action.response));
    case GET_PAYOUT_COUNTRY_ERROR:
      return state.set("payoutCountryList", fromJS([]));

    case GET_PAYOUT_STATE_SUCCESS:
      return state.set("payoutStateList", fromJS(action.response));
    case GET_PAYOUT_STATE_ERROR:
      return state.set("payoutStateList", fromJS([]));

    case GET_PAYOUT_CITY_SUCCESS:
      return state.set("payoutCityList", fromJS(action.response));
    case GET_PAYOUT_CITY_ERROR:
      return state.set("payoutCityList", fromJS([]));
    default:
      return state;
  }
}

export default payoutReducer;
