/*
 *
 * CarManagement reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import { GET_DRIVER_VEHICLE_LIST_ERROR, GET_DRIVER_VEHICLE_LIST_SUCCESS } from "../HomePage/constants";
import _ from "lodash";

export const initialState = fromJS({
  listVehicle: [],
  params: {
    rating: "all"
  },
  carSelected: {
    _id: ""
  }
});

function carManagementReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));

    case GET_DRIVER_VEHICLE_LIST_SUCCESS:
      const { data: dataList = [] } = action.response;

      if (dataList.length > 0) {
        return state.set("carSelected", dataList[0])
          .set("listVehicle", fromJS(dataList));
      }
      return state
        .set("listVehicle", fromJS(dataList));

    case GET_DRIVER_VEHICLE_LIST_ERROR:
      return state
        .set("listVehicle", fromJS([]));
    default:
      return state;
  }
}

export default carManagementReducer;
