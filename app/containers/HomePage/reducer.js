/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from "immutable";
import {
  BOOKING_REQUEST,
  BOOKING_REQUEST_ERROR,
  BOOKING_REQUEST_SUCCESS,
  CHANGE_STORE_DATA,
  DEFAULT_ACTION,
  ESTIMATE_PRICE,
  ESTIMATE_PRICE_ERROR,
  ESTIMATE_PRICE_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_SUCCESS,
  GET_DRIVER_LICENSE_ERROR,
  GET_DRIVER_LICENSE_SUCCESS,
  GET_FEATURED_LIST_ERROR,
  GET_FEATURED_LIST_SUCCESS,
  GET_JOB_DETAIL_ERROR,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_RECOMMEND_RIDE_LIST_ERROR,
  GET_JOB_RECOMMEND_RIDE_LIST_SUCCESS,
  GET_NOTIFICATION_LIST_ERROR,
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_OTHER_PAGE_LIST_ERROR,
  GET_OTHER_PAGE_LIST_SUCCESS,
  GET_RACE_COURSE,
  GET_RACE_COURSE_ERROR,
  GET_RACE_COURSE_SUCCESS,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_ERROR,
  GET_SUB_CATEGORY_SUCCESS,
  GET_TOP_BOOKING_LIST_ERROR,
  GET_TOP_BOOKING_LIST_SUCCESS,
  GET_VEHICLE,
  GET_VEHICLE_ERROR,
  GET_VEHICLE_SUCCESS,
  RESET_BOOKING_DATA,
  SAVE_BOOKING_DATA
} from "./constants";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../LoginPage/constants";
import _ from "lodash";
import { urlLink } from "../../helper/route";
import { contentImprint, contentProtect } from "./content";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import React from "react";

export const initialState = fromJS({
  currentJobId: "",
  hideBlueMenu: false,
  navMenu: [
    {
      title: <FormattedMessage {...messages.promotion} />,
      link: urlLink.promotion
    },
    // {
    //   title: "Package",
    //   link: "#"
    // }
    // ,
    {
      title: <FormattedMessage {...messages.blog} />,
      link: urlLink.blog
    }
    ,
    {
      title: <FormattedMessage {...messages.help} />,
      link: urlLink.help
    }
  ],
  footerMenu: [
    {
      title: "Data protection",
      content: contentProtect(),
      link: "/home/data-protection"
    },
    {
      title: "Imprint",
      content: contentImprint(),
      link: "/home/imprint"
    }
  ],
  notificationList: [],
  paramsNotification: {},
  jobDetail: {},
  recommendRideList: [],
  categoryList: [],
  subCategoryList: [],
  apiErrorBooking: [],
  vehicleList: [],
  raceCourseList: [],
  driverLicenseList: [],
  bookingData: {
    key: "",//key is keyword in category
    allowSubCategory: false,
    indexSelectedCategory: 0,
    addOption: false,
    pickupLocation: "",
    objPickupLocation: {},
    destinationArr: [{
      id: "",
      name: "",
      address: "",
      action: "add",
      type: "address",
      error: true,
      lat: 0,
      lng: 0
    }],
    partySize: "",
    luggage: "",
    vanSize: null,
    listVanSizes: [],
    rentalPeriodValue: null,
    checkIn: undefined,
    category: "",
    objCategory: "",
    subCategory: "",
    objSubCategory: "",
    vehicle: "",
    description: "",
    promotion: "",
    includeDriver: false,
    isOnlyDriver: false,
    rentalPeriod: {
      label: "days",
      value: ""
    },
    driverLicense: "",
    raceCourse: ""
  },
  // loading when call api each block
  loadingBlock: {
    loadingCategory: true,
    loadingSubCategory: true,
    loadingRaceCourse: true,
    loadingVehicle: true,
    loadingPrice: true
  },
  estimatePrice: {
    value: 0,
    unit: "€"
  },
  // totalDistance unit m (met)
  // totalDuration unit s (second)
  estimateDistance: { totalDistance: 0, totalDuration: 0 },
  modalList: ["showLogin", "showForgotPassword", "showSignUp"],
  showLogin: false,
  showBookingSuccess: false,
  showLogout: false,
  showForgotPassword: false,
  showSignUp: false,
  directions: {},
  apiError: [],
  featuredDestinationsList: [
    {
      destination: "Austria",
      image: "./austria.png"
    },
    {
      destination: "Korea",
      image: "./korea.png"
    },
    {
      destination: "Viet Nam",
      image: "./vietnam.png"
    },
    {
      destination: "Austria",
      image: "./austria.png"
    },
    {
      destination: "Korea",
      image: "./korea.png"
    },
    {
      destination: "Viet Nam",
      image: "./vietnam.png"
    }
  ],
  topBookingList: [
    {
      image: "pic.png",
      name: "2017-BMW-7",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 200,
      unit: "$"
    },
    {
      image: "pic1.png",
      name: "2017-BMW-7",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 200,
      unit: "$"
    },
    {
      image: "pic2.png",
      name: "2017-BMW-8",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 800,
      unit: "$"
    },
    {
      image: "pic3.png",
      name: "2017-BMW-8",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 800,
      unit: "$"
    },
    {
      image: "pic.png",
      name: "2017-BMW-8",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 800,
      unit: "$"
    }
  ],
  tabHeader: "customer" // TAB IN HEADER TO SWITCH MENU 'customer'|'company'
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case CHANGE_STORE_DATA:
      if (_.isArray(action.key)) {
        return state.setIn(action.key, fromJS(action.value));
      } else
        return state.set(action.key, fromJS(action.value));

    //  CATEGORY
    case GET_CATEGORY:
      return state
        .setIn(["bookingData", "loadingCategory"], true)
        .set("categoryList", fromJS([]));

    case GET_CATEGORY_SUCCESS:
      if (action.response && action.response.length >= 1) {
        const [firstCategory] = action.response;
        let categoryId = state.getIn(["bookingData", "category"]);
        // console.log("CATEGORY categoryId OLD", categoryId);
        let categoryObjectFind = _.find(action.response, { _id: categoryId }) || firstCategory;
        let indexSelectedCategory = _.findIndex(action.response, { _id: categoryId });
        const { _id = "", key = "", listVanSizes = [] } = categoryObjectFind;
        // console.log("CATEGORY OBJECT FIND", categoryObjectFind);
        return state
          .setIn(["bookingData", "category"], _id)
          .setIn(["bookingData", "key"], key)
          .setIn(["bookingData", "listVanSizes"], listVanSizes.map(i => ({ label: i, value: i })))
          .setIn(["bookingData", "indexSelectedCategory"], indexSelectedCategory >= 0 ? indexSelectedCategory : 0)
          .set("categoryList", fromJS(action.response))
          .setIn(["loadingBlock", "loadingCategory"], false);
      }
      return state.setIn(["loadingBlock", "loadingCategory"], false);
    case GET_CATEGORY_ERROR:
      return state.set("categoryList", fromJS([]))
        .setIn(["loadingBlock", "loadingCategory"], false);

    //  SUB CATEGORY
    case GET_SUB_CATEGORY:
      return state.set("subCategoryList", fromJS([]))
        .set("vehicleList", fromJS([]))
        .setIn(["loadingBlock", "loadingSubCategory"], true);
    case GET_SUB_CATEGORY_SUCCESS:
      return state.set("subCategoryList", fromJS(action.response))
        .setIn(["loadingBlock", "loadingSubCategory"], false);
    case GET_SUB_CATEGORY_ERROR:
      return state.set("subCategoryList", fromJS([]))
        .setIn(["loadingBlock", "loadingSubCategory"], false);

    //  VEHICLE LIST
    case GET_VEHICLE:
      return state.set("vehicleList", fromJS([]))
        .setIn(["loadingBlock", "loadingVehicle"], true);
    case GET_VEHICLE_SUCCESS:
      return state.set("vehicleList", fromJS(action.response))
        .setIn(["loadingBlock", "loadingVehicle"], false);

    case GET_VEHICLE_ERROR:
      return state.set("vehicleList", fromJS([]))
        .setIn(["loadingBlock", "loadingVehicle"], true);

    //  RACE COURSE LIST
    case GET_RACE_COURSE:
      return state.setIn(["loadingBlock", "loadingRaceCourse"], true);
    case GET_RACE_COURSE_SUCCESS:
      return state.set("raceCourseList", fromJS(action.response))
        .setIn(["loadingBlock", "loadingRaceCourse"], false);
    case GET_RACE_COURSE_ERROR:
      return state.set("raceCourseList", fromJS([]))
        .setIn(["loadingBlock", "loadingRaceCourse"], false);

    //  BOOKING DATA
    case SAVE_BOOKING_DATA:
      return state
        .set("bookingData", fromJS(action.data))
        .set("apiErrorBooking", fromJS([]));

    case RESET_BOOKING_DATA:
      return state
        .set("bookingData", initialState.get("bookingData"))
        .set("apiErrorBooking", fromJS([]))
        .set("directions", fromJS({}));

    case BOOKING_REQUEST:
      return state
        .set("apiErrorBooking", fromJS([]));

    case BOOKING_REQUEST_SUCCESS:
      //reset all state
      state = initialState;
      return state.set("showBookingSuccess", true);

    case BOOKING_REQUEST_ERROR:
      return state.set("apiErrorBooking", fromJS(action.error));

    case GET_JOB_DETAIL_SUCCESS:
      const { _id = "" } = action.response;
      return state
        .set("jobDetail", fromJS(action.response))
        .setIn(["paramsJobRequestList", "jobId"], _id)
        .set("jobRequestList", fromJS([]));

    case GET_JOB_DETAIL_ERROR:
      return state.set("jobDetail", initialState.get("jobDetail"));

    //  RECOMMEND LIST
    case GET_JOB_RECOMMEND_RIDE_LIST_SUCCESS:
      return state.set("recommendRideList", fromJS(action.response));
    case GET_JOB_RECOMMEND_RIDE_LIST_ERROR:
      return state.set("recommendRideList", fromJS([]));

    //  ESTIMATE PRICE
    case ESTIMATE_PRICE:
      return state.setIn(["loadingBlock", "loadingPrice"], true);
    case ESTIMATE_PRICE_SUCCESS:
      const { price = { unit: "€", value: 0 }, distance = { totalDistance: 0, totalDuration: 0 } } = action.response;
      return state.set("estimatePrice", fromJS(price))
        .set("estimateDistance", fromJS(distance))
        .setIn(["loadingBlock", "loadingPrice"], false);

    case ESTIMATE_PRICE_ERROR:
      return state.set("estimatePrice", fromJS({ value: 0, unit: "€" }))
        .setIn(["loadingBlock", "loadingPrice"], false);

    //  DRIVER LICENSE
    case GET_DRIVER_LICENSE_SUCCESS:
      return state.set("driverLicenseList", fromJS(action.response));
    case GET_DRIVER_LICENSE_ERROR:
      return state.set("driverLicenseList", fromJS([]));

    //  LOGIN
    case LOGIN_SUCCESS:
      return state
        .set("showLogin", false)
        .set("apiError", []);
    case LOGIN_FAIL:
      return state.set("apiError", action.response.errors);

    //  FEATURED DESTINATION
    case GET_FEATURED_LIST_SUCCESS: {
      const { data: dataList = [] } = action.response;
      return state.set("featuredDestinationsList", fromJS(dataList));
    }
    case GET_FEATURED_LIST_ERROR:
      return state.set("featuredDestinationsList", fromJS([]));

    //  OTHER PAGE
    case GET_OTHER_PAGE_LIST_SUCCESS: {
      const { data: dataList = [] } = action.response;
      let temp = dataList.map(item => {
        const { type = "" } = item;

        return {
          ...item,
          link: "/home/" + type.replace(/_/g, "-")
        };
      });

      // console.log(temp)

      let arrayOtherPage = initialState.get("navMenu").toJS();
      arrayOtherPage.unshift(...temp);

      return state.set("navMenu", fromJS(arrayOtherPage));
    }
    case GET_OTHER_PAGE_LIST_ERROR:
      return state.set("navMenu", fromJS(initialState.get("navMenu")));

    //  TOP BOOKING
    case GET_TOP_BOOKING_LIST_SUCCESS: {
      return state.set("topBookingList", fromJS(action.response));
    }
    case GET_TOP_BOOKING_LIST_ERROR:
      return state.set("topBookingList", fromJS([]));

    //  FEATURED DESTINATION
    case GET_NOTIFICATION_LIST_SUCCESS: {
      const { data = [] } = action.response;
      return state.set("notificationList", fromJS(data));
    }
    case GET_NOTIFICATION_LIST_ERROR:
      return state.set("notificationList", fromJS([]));

    default:
      return state;
  }
}

export default homePageReducer;
