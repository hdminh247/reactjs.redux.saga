/*
 *
 * StepSignUp reducer
 *
 */

import { fromJS } from "immutable";
import {
  CHANGE_STORE_DATA,
  CONFIRM_OTP,
  DEFAULT_ACTION,
  GET_COUNTRY_LIST_FAIL,
  GET_COUNTRY_LIST_SUCCESS,
  GET_DRIVER_INFO_QUESTION_FAIL,
  GET_DRIVER_INFO_QUESTION_SUCCESS,
  GET_ERROR,
  GET_SUCCESS,
  RESEND_OTP,
  VERIFY_USER
} from "./constants";
import _ from "lodash";
import {
  GET_DRIVER_LICENSE_ERROR,
  GET_DRIVER_LICENSE_SUCCESS,
  GET_PAYOUT_CITY_ERROR,
  GET_PAYOUT_CITY_SUCCESS,
  GET_PAYOUT_COUNTRY_ERROR,
  GET_PAYOUT_COUNTRY_SUCCESS,
  GET_PAYOUT_STATE_ERROR,
  GET_PAYOUT_STATE_SUCCESS
} from "../HomePage/constants";

export const initialState = fromJS({
  user: {},
  currentProgress: 0,
  countryList: [],//country for verify phone step 1
  payoutCountryList: [],
  payoutStateList: [],
  payoutCityList: [],
  driverLicenseList: [],
  driverInfoQuestion: [],
  apiError: []
});

function stepSignUpReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, action.value);
      return state.set(action.key, action.value);

    case GET_ERROR:
      return state.set("apiError", action.err);

    case VERIFY_USER:
    case CONFIRM_OTP:
    case RESEND_OTP:
    case GET_SUCCESS:
      return state.set("apiError", []);


    //  DRIVER INFO QUESTION
    case GET_DRIVER_INFO_QUESTION_SUCCESS:
      return state.set("driverInfoQuestion", fromJS(action.response));
    case GET_DRIVER_INFO_QUESTION_FAIL:
      return state.set("driverInfoQuestion", fromJS([]));

    case GET_DRIVER_LICENSE_SUCCESS:
      return state.set("driverLicenseList", fromJS(action.response));
    case GET_DRIVER_LICENSE_ERROR:
      return state.set("driverLicenseList", fromJS([]));

    //  COUNTRY LIST
    case GET_COUNTRY_LIST_SUCCESS:
      return state.set("countryList", fromJS(action.response));
    case GET_COUNTRY_LIST_FAIL:
      return state.set("countryList", fromJS([]));


    // PAYOUT
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

export default stepSignUpReducer;
