/*
 *
 * OfferDetail reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import { GET_DRIVER_VEHICLE_LIST_ERROR, GET_DRIVER_VEHICLE_LIST_SUCCESS, GET_JOB_DETAIL_ERROR, GET_JOB_DETAIL_SUCCESS } from "../HomePage/constants";
import _ from "lodash";

export const initialState = fromJS({
  jobDetail: {
    jobId: "",
    promotion: ""
  },
  jobRequestList: [],
  paramsJobRequestList: {
    jobId: ""
  },
  driverVehicleList: [],
  paramsDriverVehicleList: {
    rating: "all",
    page: 0
  },
  showOfferSuccess: false,
  showConfirm: false
});

function offerDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key)) {
        return state.setIn(action.key, fromJS(action.value));
      } else
        return state.set(action.key, fromJS(action.value));
    case GET_JOB_DETAIL_SUCCESS:
      const { _id = "" } = action.response;

      return state
        .set("jobDetail", fromJS(action.response))
        .set("showOfferSuccess", true)
        .setIn(["paramsJobRequestList", "jobId"], _id)
        .set("jobRequestList", fromJS([]));

    case GET_JOB_DETAIL_ERROR:
      return state.set("jobDetail", initialState.get("jobDetail"));

    case GET_DRIVER_VEHICLE_LIST_SUCCESS:
      const { data = [] } = action.response;
      return state
        .set("driverVehicleList", fromJS(data));

    case GET_DRIVER_VEHICLE_LIST_ERROR:
      return state.set("driverVehicleList", initialState.get("driverVehicleList"));

    default:
      return state;
  }
}

export default offerDetailReducer;
