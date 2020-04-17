import { put, takeLatest } from "redux-saga/effects";
import { push } from "react-router-redux";
import config from "config";
import axios from "axios";
import {
  ACCEPT_JOB_REQUEST,
  ACT_ACTIVITY,
  BOOKING_REQUEST,
  DELETE_JOB_REQUEST,
  DELETE_NOTIFICATIONS,
  ESTIMATE_PRICE,
  GET_BLOG_DETAIL,
  GET_BLOG_LIST,
  GET_CATEGORY,
  GET_CREDIT_CARD_CONFIRM,
  GET_CURRENT_BOOKINGS,
  GET_DRIVE_BIDDING_LIST,
  GET_DRIVE_CURRENT_LIST,
  GET_DRIVE_HISTORY_LIST,
  GET_DRIVER_LICENSE,
  GET_DRIVER_VEHICLE_LIST,
  GET_FEATURED_DETAIL,
  GET_FEATURED_LIST,
  GET_HISTORY_BOOKINGS,
  GET_JOB_DETAIL,
  GET_JOB_RECOMMEND_RIDE_LIST,
  GET_JOB_REQUEST_DETAIL,
  GET_JOB_REQUEST_LIST,
  GET_NOTIFICATION_LIST,
  GET_OFFER_LIST,
  GET_OTHER_PAGE_DETAIL,
  GET_OTHER_PAGE_LIST,
  GET_PAYOUT_ACCOUNT,
  GET_PAYOUT_CITY,
  GET_PAYOUT_COUNTRY,
  GET_PAYOUT_STATE,
  GET_PROMOTION_DETAIL,
  GET_PROMOTION_LIST,
  GET_RACE_COURSE,
  GET_RELATE_BLOG_LIST,
  GET_REVENUE_CHART,
  GET_STATISTIC_EARNING,
  GET_SUB_CATEGORY,
  GET_TOP_BOOKING_LIST,
  GET_TOP_PROMOTION_LIST,
  GET_TRANSACTION_EARNING_LIST,
  GET_VEHICLE,
  LOGOUT_APP,
  POST_TRANSACTION,
  RATING_REVIEW,
  READ_NOTIFICATIONS,
  REQUEST_HELP,
  REQUEST_OFFER,
  REQUEST_PAYPAL_CAPTURE,
  REQUEST_PAYPAL_ORDER
} from "./constants";

import _ from "lodash";
import {
  acceptJobRequestError,
  acceptJobRequestSuccess,
  actActivityBookingError,
  actActivityBookingSuccess,
  bookingRequestError,
  bookingRequestSuccess,
  deleteJobRequestError,
  deleteJobRequestSuccess,
  deleteNotificationsError,
  deleteNotificationsSuccess,
  estimatePriceError,
  estimatePriceSuccess,
  getBlogDetailError,
  getBlogDetailSuccess,
  getBlogListError,
  getBlogListSuccess,
  getCategory,
  getCategoryError,
  getCategorySuccess,
  getCreditCardConfirmError,
  getCreditCardConfirmSuccess,
  getCurrentBookingError,
  getCurrentBookingSuccess,
  getDriveBiddingListError,
  getDriveBiddingListSuccess,
  getDriveCurrentListError,
  getDriveCurrentListSuccess,
  getDriveHistoryListError,
  getDriveHistoryListSuccess,
  getDriverLicenseError,
  getDriverLicenseSuccess,
  getDriverVehicleListError,
  getDriverVehicleListSuccess,
  getFeaturedDestinationDetailError,
  getFeaturedDestinationDetailSuccess,
  getFeaturedDestinationListError,
  getFeaturedDestinationListSuccess,
  getHistoryBookingError,
  getHistoryBookingSuccess,
  getJobDetail,
  getJobDetailError,
  getJobDetailSuccess,
  getJobRecommendRideListError,
  getJobRecommendRideListSuccess,
  getJobRequestDetailError,
  getJobRequestDetailSuccess,
  getJobRequestListError,
  getJobRequestListSuccess,
  getNotificationListError,
  getNotificationListSuccess,
  getOffersListError,
  getOffersListSuccess,
  getOtherPageDetailError,
  getOtherPageDetailSuccess,
  getOtherPageListError,
  getOtherPageListSuccess,
  getPayoutAccountError,
  getPayoutAccountSuccess,
  getPayoutCityError,
  getPayoutCitySuccess,
  getPayoutCountryError,
  getPayoutCountrySuccess,
  getPayoutStateError,
  getPayoutStateSuccess,
  getPromotionDetailError,
  getPromotionDetailSuccess,
  getPromotionListError,
  getPromotionListSuccess,
  getRaceCourseError,
  getRaceCourseSuccess,
  getRelateBlogListError,
  getRelateBlogListSuccess,
  getRevenueChartError,
  getRevenueChartSuccess,
  getStatisticEarningError,
  getStatisticEarningSuccess,
  getSubCategoryError,
  getSubCategorySuccess,
  getTopBookingListError,
  getTopBookingListSuccess,
  getTopPromotionListError,
  getTopPromotionListSuccess,
  getTransactionListError,
  getTransactionListSuccess,
  getVehicleError,
  getVehicleSuccess,
  logoutError,
  logoutSuccess,
  postTransactionError,
  postTransactionSuccess,
  ratingAndReviewError,
  ratingAndReviewSuccess,
  readNotificationsError,
  readNotificationsSuccess,
  requestHelpError,
  requestHelpSuccess,
  requestOfferError,
  requestOfferSuccess,
  requestPaypalCaptureError,
  requestPaypalCaptureSuccess,
  requestPaypalOrderError,
  requestPaypalOrderSuccess
} from "./actions";
import { loadRepos, reposLoaded, saveCurrentUser, updateError, updateSuccess } from "../App/actions";
import { GET_LOGIN_DATA, LOGIN_SOCIAL } from "../LoginPage/constants";
import { loginForUser, loginSocial } from "../LoginPage/saga";
import { urlLink } from "../../helper/route";

const categoryDriver = {
  allowSubCategory: false,
  createdAt: "",
  description: "",
  icon: "",
  key: "driver",
  name: "Driver",
  path: "",
  updatedAt: "",
  _id: "driver_id"
};

// Individual exports for testing
export function* apiLogout() {
  const requestUrl = config.serverUrl + config.api.auth.log_out;

  try {
    yield axios.put(requestUrl);
    //clear header axios
    yield axios.defaults.headers.common["Authorization"] = "";
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError());
  } finally {
    yield socketInstance.disconnect();
    yield put(saveCurrentUser(""));
    yield window.localStorage.clear();
    yield window.sessionStorage.clear();
    yield put(push(urlLink.root));


  }
}

export function* apiGetCategory() {
  const requestUrl = config.serverUrl + config.api.category.list;

  try {
    const response = yield axios.get(requestUrl);
    const { data: dataList = {} } = response.data;
    // if (_.isArray(dataList.data)) {
    //   dataList.data.push(categoryDriver);
    // }
    yield put(getCategorySuccess(dataList.data));
  } catch (error) {
    yield put(getCategoryError(error));
  }
}

export function* apiGetSubCategory(payload) {
  const { category = "" } = payload;
  const requestUrl = config.serverUrl + config.api.subCategory.list + "?category=" + category;

  try {
    const response = yield axios.get(requestUrl);
    let temp = response.data.data.data.map(item => {
      const { name = "", _id = "", image = "" } = item;
        return {
          label: name,
          value: _id,
          image
        };
      }
    );
    yield put(getSubCategorySuccess(temp));
  } catch (error) {
    yield put(getSubCategoryError(error));
  }
}

export function* apiGetVehicle(payload) {

  const { category = "", subCategory = "" } = payload;
  const requestUrl = `${config.serverUrl}${config.api.vehicle.list}?category=${category}&subCategory=${subCategory}`;

  try {
    const response = yield axios.get(requestUrl);
    let temp = response.data.data.data.map(item => {
        const {
          name: label = "",
          _id: value = "",
          images: [image = ""], //get first image, in array images
          description1 = ""
        } = item;
        return {
          label,
          value,
          image,
          description1
        };
      }
    );
    yield put(getVehicleSuccess(temp));
  } catch (error) {
    yield put(getVehicleError(error));
  }
}

export function* apiGetRaceCourse() {
  const requestUrl = `${config.serverUrl}${config.api.job.race_course}`;

  try {
    const response = yield axios.get(requestUrl);
    yield put(getRaceCourseSuccess(response.data.data));
  } catch (error) {
    console.log(error);
    yield put(getRaceCourseError(error));
  }
}

export function* apiBookingRequest(payload) {
  const { data = {} } = payload;
  const requestUrl = config.serverUrl + config.api.job.new;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    //this will reset form but not reset correct list category
    yield put(bookingRequestSuccess(response));

    //  get again category to
    yield put(getCategory());
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors)
      yield put(bookingRequestError(error.response.data.errors));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiEstimatePrice(payload) {
  const { data = {} } = payload;
  const requestUrl = config.serverUrl + config.api.job.estimate;
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(estimatePriceSuccess(response.data.data));

    const { data: { showPopup = "" } } = response.data;
    if (!_.isEmpty(showPopup)) {
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: showPopup
        })
      );
    }
  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(estimatePriceError(error.response.data.errors));

    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  }
}

export function* apiGetDriverLicense() {
  const requestUrl = config.serverUrl + config.api.driver.license;
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDriverLicenseSuccess(response.data.data));
  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getDriverLicenseError(error.response.data.errors));

    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  }
}

export function* apiGetCurrentBooking(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.booking.current}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getCurrentBookingSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {

    if (error.response.data && error.response.data.errors) {
      yield put(getCurrentBookingError(error.response.data.errors));

      if (_.isFunction(reject))
        reject(error.response.data.errors);

      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    }

  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetHistoryBooking(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.booking.history}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getHistoryBookingSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getHistoryBookingError(error.response.data.errors));

      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    }
    if (_.isFunction(reject))
      reject(error);
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetJobDetail(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.job.detail}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getJobDetailSuccess(response.data.data));
    const { _id = "" } = response.data.data;

    if (_.isFunction(resolve))
      resolve(response.data.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getJobDetailError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetJobRequestDetail(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.jobRequest.detail}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getJobRequestDetailSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getJobRequestDetailError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiRequestOffer(payload) {
  let {
    params = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.jobRequest.detail}`;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, params);
    yield put(requestOfferSuccess(response.data.data));
    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been request successfully"
      })
    );
    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(requestOfferError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetJobRequestList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.jobRequest.list}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobRequestListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getJobRequestListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetJobRecommendRideList(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.job.recommend}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getJobRecommendRideListSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getJobRecommendRideListError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetPayoutCountry(payload) {
  let {
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.payout.country_list}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getPayoutCountrySuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getPayoutCountryError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetPayoutState(payload) {
  let {
    countryId = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.payout.state_list}/${countryId}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getPayoutStateSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getPayoutStateError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetPayoutCity(payload) {
  let {
    countryId = "",
    stateId = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.payout.city_list}/${countryId}/${stateId}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getPayoutCitySuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getPayoutCityError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetPayoutAccount(payload) {
  let {
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.payout.account}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getPayoutAccountSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getPayoutAccountError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPostTransaction(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.payout.transaction}`;

  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, params);
    yield put(postTransactionSuccess(response.data));
    if (_.isFunction(resolve))
      resolve(response.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(postTransactionError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiActActivityBooking(payload) {
  const {
    activityId = "",
    key = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;

  let requestUrl = `${config.serverUrl}${config.api.v1}${key}`;
  requestUrl = requestUrl.replace("{id}", activityId);

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl);
    yield put(actActivityBookingSuccess(response));
    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been do activity successfully"
      })
    );

    if (_.isFunction(resolve))
      resolve(response);
  } catch (error) {

    if (_.isFunction(reject))
      reject(error);
    yield put(actActivityBookingError(error));
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiRatingAndReview(payload) {
  const {
    idActivity = "",
    link = "",
    formData = null,
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;

  let requestUrl = `${config.serverUrl}${config.api.v1}${link}`;
  requestUrl = requestUrl.replace("{jobId}", idActivity);

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, formData);
    yield put(ratingAndReviewSuccess(response));
    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been do activity successfully"
      })
    );
    if (_.isFunction(resolve))
      resolve(response);
  } catch (error) {
    if (_.isFunction(reject))
      reject(error);
    yield put(ratingAndReviewError(error));
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetCreditCardConfirm(payload) {
  const {
    params,
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const { jobId = "" } = params;
  const requestUrl = `${config.serverUrl}${config.api.customer.paymentCreditCard}`;

  try {
    const response = yield axios.post(requestUrl, params);
    yield put(getCreditCardConfirmSuccess(response));
    yield put(getJobDetail(jobId)); // !get job detail again to update new data
    if (_.isFunction(resolve))
      yield resolve(response);
  } catch (error) {
    if (_.isFunction(reject))
      yield reject(error);
    yield put(getCreditCardConfirmError(error));
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );

  }
}

export function* apiGetDriveCurrentList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.drive.current}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDriveCurrentListSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getDriveCurrentListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetDriveBiddingList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.drive.bidding}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDriveBiddingListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getDriveBiddingListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetDriveHistoryList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.drive.history}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDriveHistoryListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getDriveHistoryListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetOffersList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.drive.offers}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getOffersListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getOffersListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetDriverVehicleList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.driver.vehicle}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getDriverVehicleListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getDriverVehicleListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetBlogDetail(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.blog.detail}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getBlogDetailSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getBlogDetailError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetBlogList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");

  const requestUrl = `${config.serverUrl}${config.api.blog.list}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getBlogListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getBlogListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetRelateBlogList(payload) {
  let {
    id = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;

  const requestUrl = `${config.serverUrl}${config.api.blog.relate}?id=${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRelateBlogListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getRelateBlogListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetFeaturedDestinationDetail(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.featuredDestination.detail}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getFeaturedDestinationDetailSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getFeaturedDestinationDetailError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetFeaturedDestinationList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.featuredDestination.list}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getFeaturedDestinationListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getFeaturedDestinationListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetOtherPageDetail(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.otherPage.detail}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getOtherPageDetailSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getOtherPageDetailError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetOtherPageList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.otherPage.list}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getOtherPageListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getOtherPageListError(error.response.data.errors));
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetPromotionDetail(payload) {
  let {
    id = "",
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = `${config.serverUrl}${config.api.promotion.detail}/${id}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);

    yield put(getPromotionDetailSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);

  } catch (error) {
    if (error.response.data && error.response.data.errors)
      yield put(getPromotionDetailError(error.response.data.errors));
    if (_.isFunction(reject))
      reject(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetPromotionList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.promotion.list}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getPromotionListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getPromotionListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetTopPromotionList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");

  const requestUrl = `${config.serverUrl}${config.api.promotion.top}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getTopPromotionListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getTopPromotionListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiAcceptJobRequest(payload) {
  let {
    id = "",
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.jobRequest.accept}/${id}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been accept job request successfully"
      })
    );
    yield put(acceptJobRequestSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {

    if (error.response.data && error.response.data.errors) {
      yield put(acceptJobRequestError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);

      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    }

  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteJobRequest(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.jobRequest.list}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been delete job request successfully"
      })
    );
    yield put(deleteJobRequestSuccess(response.data.data));

    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {

    if (error.response.data && error.response.data.errors) {
      yield put(deleteJobRequestError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);

      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
    }

  } finally {
    yield put(reposLoaded());
  }
}

export function* apiRequestHelp(payload) {
  const {
    data = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = config.serverUrl + config.api.helpRequest.new;
  console.log(requestUrl);
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    yield put(requestHelpSuccess(response));

    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been request successfully"
      })
    );
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors)
      yield put(requestHelpError(error.response.data.errors));

    if (_.isFunction(reject))
      resolve(error);

  } finally {
    yield put(reposLoaded());

  }
}

export function* apiRequestPaypalOrder(payload) {
  debugger;
  const {
    data = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = config.serverUrl + config.api.paypal.order;
  console.log(requestUrl);
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(requestPaypalOrderSuccess(response));

    // yield put(
    //   updateSuccess({
    //     visible: true,
    //     title: "Success!!!",
    //     content: "You has been request successfully"
    //   })
    // );
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors)
      yield put(requestPaypalOrderError(error.response.data.errors));

    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
    if (_.isFunction(reject))
      resolve(error);

  } finally {
    yield put(reposLoaded());

  }
}

export function* apiRequestPaypalCapture(payload) {
  const {
    data = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const requestUrl = config.serverUrl + config.api.paypal.capture;
  console.log(requestUrl);
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);

    yield put(requestPaypalCaptureSuccess(response));

    yield put(
      updateSuccess({
        visible: true,
        title: "Success!!!",
        content: "You has been accept job request successfully"
      })
    );
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors)
      yield put(requestPaypalCaptureError(error.response.data.errors));
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
    if (_.isFunction(reject))
      resolve(error);

  } finally {
    yield put(reposLoaded());

  }
}

export function* apiGetNotificationList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.notification.list}?${query}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getNotificationListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getNotificationListError(error.response.data.errors));
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }

  } finally {
    yield put(reposLoaded());
  }
}

export function* apiReadNotifications(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;

  const query = Object.keys(params)
    .map(k => k + "=" + params[k])
    .join("&");

  const requestUrl = `${config.serverUrl}${config.api.notification.read}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl);
    yield put(readNotificationsSuccess(response));
    if (_.isFunction(resolve))
      resolve(response);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      yield put(readNotificationsError(error.response.data.errors));
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiDeleteNotifications(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.notification.delete}?${query}`;

  yield put(loadRepos());

  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteNotificationsSuccess(response));
    if (_.isFunction(resolve))
      resolve(response);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(deleteNotificationsError(error.response.data.errors));
    }
    if (_.isFunction(reject))
      resolve(error);
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetTopBookingList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.booking.top}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getTopBookingListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getTopBookingListError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiStatisticEarning(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.earning.statistic}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getStatisticEarningSuccess(response.data.data));
    if (_.isFunction(resolve)) {
      resolve(response.data.data);
    }
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getStatisticEarningError(error.response.data.errors));

      if (_.isFunction(reject))
        resolve(error.response.data.errors);
    }
    yield put(
      updateError({
        error: true,
        title: "System Error",
        message: !_.isArray(error.response.data.errors)
          ? error.response.data.error
          : error.response.data.errors[0].errorMessage
      })
    );
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiTransactionEarningList(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.earning.transaction}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getTransactionListSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getTransactionListError(error.response.data.errors));
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
      if (_.isFunction(reject))
        reject(error.response.data.errors);
    }

  } finally {
    yield put(reposLoaded());
  }
}

export function* apiRevenueChart(payload) {
  let {
    params = {},
    resolve = () => {
    },
    reject = () => {
    }
  } = payload;
  const query = Object.keys(params)
    .map(k => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  const requestUrl = `${config.serverUrl}${config.api.earning.revenueChart}?${query}`;

  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRevenueChartSuccess(response.data.data));
    if (_.isFunction(resolve))
      resolve(response.data.data);
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      yield put(getRevenueChartError(error.response.data.errors));
      yield put(
        updateError({
          error: true,
          title: "System Error",
          message: !_.isArray(error.response.data.errors)
            ? error.response.data.error
            : error.response.data.errors[0].errorMessage
        })
      );
      if (_.isFunction(reject))
        reject(error.response.data.errors);
    }

  } finally {
    yield put(reposLoaded());
  }
}

export default function* defaultSaga() {
  // BOOKING
  yield takeLatest(GET_CATEGORY, apiGetCategory);
  yield takeLatest(GET_SUB_CATEGORY, apiGetSubCategory);
  yield takeLatest(GET_VEHICLE, apiGetVehicle);
  yield takeLatest(GET_RACE_COURSE, apiGetRaceCourse);
  yield takeLatest(BOOKING_REQUEST, apiBookingRequest);
  yield takeLatest(ESTIMATE_PRICE, apiEstimatePrice);
  yield takeLatest(GET_DRIVER_LICENSE, apiGetDriverLicense);
  yield takeLatest(GET_CURRENT_BOOKINGS, apiGetCurrentBooking);
  yield takeLatest(GET_HISTORY_BOOKINGS, apiGetHistoryBooking);
  yield takeLatest(GET_JOB_DETAIL, apiGetJobDetail);
  yield takeLatest(GET_JOB_REQUEST_LIST, apiGetJobRequestList);
  yield takeLatest(GET_JOB_REQUEST_DETAIL, apiGetJobRequestDetail);
  yield takeLatest(GET_JOB_RECOMMEND_RIDE_LIST, apiGetJobRecommendRideList);
  yield takeLatest(REQUEST_OFFER, apiRequestOffer);
  yield takeLatest(ACCEPT_JOB_REQUEST, apiAcceptJobRequest);
  yield takeLatest(DELETE_JOB_REQUEST, apiDeleteJobRequest);
  yield takeLatest(ACT_ACTIVITY, apiActActivityBooking);
  yield takeLatest(RATING_REVIEW, apiRatingAndReview);
  yield takeLatest(GET_CREDIT_CARD_CONFIRM, apiGetCreditCardConfirm);

  // BLOG
  yield takeLatest(GET_BLOG_LIST, apiGetBlogList);
  yield takeLatest(GET_RELATE_BLOG_LIST, apiGetRelateBlogList);
  yield takeLatest(GET_BLOG_DETAIL, apiGetBlogDetail);

  // OTHER PAGES
  yield takeLatest(GET_OTHER_PAGE_LIST, apiGetOtherPageList);
  yield takeLatest(GET_OTHER_PAGE_DETAIL, apiGetOtherPageDetail);

  // PROMOTION
  yield takeLatest(GET_PROMOTION_LIST, apiGetPromotionList);
  yield takeLatest(GET_TOP_PROMOTION_LIST, apiGetTopPromotionList);
  yield takeLatest(GET_PROMOTION_DETAIL, apiGetPromotionDetail);

  // FEATURED DESTINATION
  yield takeLatest(GET_FEATURED_LIST, apiGetFeaturedDestinationList);
  yield takeLatest(GET_FEATURED_DETAIL, apiGetFeaturedDestinationDetail);

  // DRIVE
  yield takeLatest(GET_DRIVE_CURRENT_LIST, apiGetDriveCurrentList);
  yield takeLatest(GET_DRIVE_BIDDING_LIST, apiGetDriveBiddingList);
  yield takeLatest(GET_DRIVE_HISTORY_LIST, apiGetDriveHistoryList);
  yield takeLatest(GET_OFFER_LIST, apiGetOffersList);
  yield takeLatest(GET_DRIVER_VEHICLE_LIST, apiGetDriverVehicleList);

  // AUTHENTICATE
  yield takeLatest(GET_LOGIN_DATA, loginForUser);
  yield takeLatest(LOGIN_SOCIAL, loginSocial);
  yield takeLatest(LOGOUT_APP, apiLogout);

  //  PAYOUT
  yield takeLatest(GET_PAYOUT_COUNTRY, apiGetPayoutCountry);
  yield takeLatest(GET_PAYOUT_STATE, apiGetPayoutState);
  yield takeLatest(GET_PAYOUT_CITY, apiGetPayoutCity);
  yield takeLatest(GET_PAYOUT_ACCOUNT, apiGetPayoutAccount);
  yield takeLatest(POST_TRANSACTION, apiPostTransaction);

  // PAYPAL
  yield takeLatest(REQUEST_PAYPAL_ORDER, apiRequestPaypalOrder);
  yield takeLatest(REQUEST_PAYPAL_CAPTURE, apiRequestPaypalCapture);

  //Help
  yield takeLatest(REQUEST_HELP, apiRequestHelp);

  // NOTIFICATION
  yield takeLatest(GET_NOTIFICATION_LIST, apiGetNotificationList);
  yield takeLatest(READ_NOTIFICATIONS, apiReadNotifications);
  yield takeLatest(DELETE_NOTIFICATIONS, apiDeleteNotifications);

  // TOP BOOKING
  yield takeLatest(GET_TOP_BOOKING_LIST, apiGetTopBookingList);

  // Earning
  yield takeLatest(GET_STATISTIC_EARNING, apiStatisticEarning);
  yield takeLatest(GET_TRANSACTION_EARNING_LIST, apiTransactionEarningList);
  yield takeLatest(GET_REVENUE_CHART, apiRevenueChart);
}
