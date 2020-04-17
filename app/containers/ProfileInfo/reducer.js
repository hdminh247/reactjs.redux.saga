/*
 *
 * ProfileInfo reducer
 *
 */

import { fromJS } from "immutable";
import {
  CHANGE_IMAGE,
  CHANGE_STORE_DATA,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  PUT_CURRENT_USER,
  PUT_CURRENT_USER_FAIL,
  PUT_CURRENT_USER_SUCCESS
} from "./constants";
import { GET_COUNTRY_LIST_SUCCESS } from "../StepSignUp/constants";
import { GET_DRIVER_LICENSE_ERROR, GET_DRIVER_LICENSE_SUCCESS } from "../HomePage/constants";

export const initialState = fromJS({
  isEdit: false,
  errorAPI: [],
  dataUser: {},
  countryList: [],
  showSuccessModal: false,
  showPopupError: false,
  driverLicenseList: [],
  licenseImage: ""
});

function profileInforReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return state.set("isEdit", false);

    case GET_CURRENT_USER_SUCCESS:
      return state
        .set("dataUser", fromJS(action.dataUser));
    case PUT_CURRENT_USER:
      return state.set("errorAPI", []);
    case PUT_CURRENT_USER_SUCCESS:
      const { changePhoneNumber = false } = action.dataUser;
      if (!changePhoneNumber) {//is change phone don't show image
        return state
          .set("dataUser", fromJS(action.dataUser));
      }

      return state.set("dataUser", fromJS(action.dataUser));

    case PUT_CURRENT_USER_FAIL:
      return state
        .set("showPopupError", true)
        .set("errorAPI", fromJS(action.error));
    case GET_COUNTRY_LIST_SUCCESS:
      return state.set("countryList", fromJS(action.response));
    case CHANGE_IMAGE:
      if (action.role === "customer") {
        return state.setIn(["dataUser", "avatar"], action.image);
      } else {
        return state.set("licenseImage", action.image);
      }
    case CHANGE_STORE_DATA:
      if (_.isArray(action.key)) {
        return state.setIn(action.key, fromJS(action.value));
      } else
        return state.set(action.key, fromJS(action.value));
    case GET_DRIVER_LICENSE_SUCCESS:
      return state.set("driverLicenseList", fromJS(action.response))
        .set("licenseImage", fromJS(""));
    case GET_DRIVER_LICENSE_ERROR:
      return state.set("driverLicenseList", fromJS([]));
    default:
      return state;
  }
}

export default profileInforReducer;
