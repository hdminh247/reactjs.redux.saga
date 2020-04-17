/*
 *
 * BookingsDetail reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import { GET_JOB_DETAIL_ERROR, GET_JOB_DETAIL_SUCCESS, GET_JOB_REQUEST_LIST_ERROR, GET_JOB_REQUEST_LIST_SUCCESS } from "../HomePage/constants";
import _ from "lodash";

export const initialState = fromJS({
  currentStatusJob: "",
  jobDetail: {
    jobId: ""
  },
  jobRequestList: [],
  paramsJobRequestList: {
    jobId: ""
  },
  ratingList: [
    { title: "Driver skill", value: 0, key: "driverSkill" },
    { title: "Car Conditions", value: 0, key: "car" },
    { title: "Characteristic", value: 0, key: "charateristic" },
    { title: "Pricing", value: 0, key: "pricing" }
  ],
  confirmDriver: false,
  jobRequestSelected: {
    _id: "",
    fromUser: { firstName: "", lastName: "" },
    pickupLocation: {
      name: ""
    },
    destination: [{}]
  }
});

function currentBookingsDetailReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_JOB_DETAIL_SUCCESS:
      const { _id = "" } = action.response;
      return state
        .set("jobDetail", fromJS(action.response))
        .setIn(["paramsJobRequestList", "jobId"], _id)
        .set("jobRequestList", fromJS([]));

    case GET_JOB_DETAIL_ERROR:
      return state.set("jobDetail", initialState.get("jobDetail"));

    //  JOB REQUEST LIST
    case GET_JOB_REQUEST_LIST_SUCCESS:
      const { data = [] } = action.response;

      return state
        .set("jobRequestList", fromJS(data));
    case GET_JOB_REQUEST_LIST_ERROR:
      return state
        .set("jobRequestList", fromJS([]));

    case CHANGE_STORE_DATA:

      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));

    default:
      return state;
  }
}

export default currentBookingsDetailReducer;
