/*
 *
 * HomePage actions
 *
 */

import {
  ACCEPT_JOB_REQUEST,
  ACCEPT_JOB_REQUEST_ERROR,
  ACCEPT_JOB_REQUEST_SUCCESS,
  ACT_ACTIVITY,
  ACT_ACTIVITY_ERROR,
  ACT_ACTIVITY_SUCCESS,
  BOOKING_REQUEST,
  BOOKING_REQUEST_ERROR,
  BOOKING_REQUEST_SUCCESS,
  CHANGE_STORE_DATA,
  DEFAULT_ACTION,
  DELETE_JOB_REQUEST,
  DELETE_JOB_REQUEST_ERROR,
  DELETE_JOB_REQUEST_SUCCESS,
  DELETE_NOTIFICATIONS,
  DELETE_NOTIFICATIONS_ERROR,
  DELETE_NOTIFICATIONS_SUCCESS,
  ESTIMATE_PRICE,
  ESTIMATE_PRICE_ERROR,
  ESTIMATE_PRICE_SUCCESS,
  GET_BLOG_DETAIL,
  GET_BLOG_DETAIL_ERROR,
  GET_BLOG_DETAIL_SUCCESS,
  GET_BLOG_LIST,
  GET_BLOG_LIST_ERROR,
  GET_BLOG_LIST_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_SUCCESS,
  GET_CREDIT_CARD_CONFIRM,
  GET_CREDIT_CARD_CONFIRM_ERROR,
  GET_CREDIT_CARD_CONFIRM_SUCCESS,
  GET_CURRENT_BOOKINGS,
  GET_CURRENT_BOOKINGS_ERROR,
  GET_CURRENT_BOOKINGS_SUCCESS,
  GET_DRIVE_BIDDING_LIST,
  GET_DRIVE_BIDDING_LIST_ERROR,
  GET_DRIVE_BIDDING_LIST_SUCCESS,
  GET_DRIVE_CURRENT_LIST,
  GET_DRIVE_CURRENT_LIST_ERROR,
  GET_DRIVE_CURRENT_LIST_SUCCESS,
  GET_DRIVE_HISTORY_LIST,
  GET_DRIVE_HISTORY_LIST_ERROR,
  GET_DRIVE_HISTORY_LIST_SUCCESS,
  GET_DRIVER_LICENSE,
  GET_DRIVER_LICENSE_ERROR,
  GET_DRIVER_LICENSE_SUCCESS,
  GET_DRIVER_VEHICLE_LIST,
  GET_DRIVER_VEHICLE_LIST_ERROR,
  GET_DRIVER_VEHICLE_LIST_SUCCESS,
  GET_FEATURED_DETAIL,
  GET_FEATURED_DETAIL_ERROR,
  GET_FEATURED_DETAIL_SUCCESS,
  GET_FEATURED_LIST,
  GET_FEATURED_LIST_ERROR,
  GET_FEATURED_LIST_SUCCESS,
  GET_HISTORY_BOOKINGS,
  GET_HISTORY_BOOKINGS_ERROR,
  GET_HISTORY_BOOKINGS_SUCCESS,
  GET_JOB_DETAIL,
  GET_JOB_DETAIL_ERROR,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_RECOMMEND_RIDE_LIST,
  GET_JOB_RECOMMEND_RIDE_LIST_ERROR,
  GET_JOB_RECOMMEND_RIDE_LIST_SUCCESS,
  GET_JOB_REQUEST_DETAIL,
  GET_JOB_REQUEST_DETAIL_ERROR,
  GET_JOB_REQUEST_DETAIL_SUCCESS,
  GET_JOB_REQUEST_LIST,
  GET_JOB_REQUEST_LIST_ERROR,
  GET_JOB_REQUEST_LIST_SUCCESS,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_ERROR,
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_OFFER_LIST,
  GET_OFFER_LIST_ERROR,
  GET_OFFER_LIST_SUCCESS,
  GET_OTHER_PAGE_DETAIL,
  GET_OTHER_PAGE_DETAIL_ERROR,
  GET_OTHER_PAGE_DETAIL_SUCCESS,
  GET_OTHER_PAGE_LIST,
  GET_OTHER_PAGE_LIST_ERROR,
  GET_OTHER_PAGE_LIST_SUCCESS,
  GET_PAYOUT_ACCOUNT,
  GET_PAYOUT_ACCOUNT_ERROR,
  GET_PAYOUT_ACCOUNT_SUCCESS,
  GET_PAYOUT_CITY,
  GET_PAYOUT_CITY_ERROR,
  GET_PAYOUT_CITY_SUCCESS,
  GET_PAYOUT_COUNTRY,
  GET_PAYOUT_COUNTRY_ERROR,
  GET_PAYOUT_COUNTRY_SUCCESS,
  GET_PAYOUT_STATE,
  GET_PAYOUT_STATE_ERROR,
  GET_PAYOUT_STATE_SUCCESS,
  GET_PROMOTION_DETAIL,
  GET_PROMOTION_DETAIL_ERROR,
  GET_PROMOTION_DETAIL_SUCCESS,
  GET_PROMOTION_LIST,
  GET_PROMOTION_LIST_ERROR,
  GET_PROMOTION_LIST_SUCCESS,
  GET_RACE_COURSE,
  GET_RACE_COURSE_ERROR,
  GET_RACE_COURSE_SUCCESS,
  GET_RELATE_BLOG_LIST,
  GET_RELATE_BLOG_LIST_ERROR,
  GET_RELATE_BLOG_LIST_SUCCESS,
  GET_REVENUE_CHART,
  GET_REVENUE_CHART_ERROR,
  GET_REVENUE_CHART_SUCCESS,
  GET_STATISTIC_EARNING,
  GET_STATISTIC_EARNING_ERROR,
  GET_STATISTIC_EARNING_SUCCESS,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_ERROR,
  GET_SUB_CATEGORY_SUCCESS,
  GET_TOP_BOOKING_LIST,
  GET_TOP_BOOKING_LIST_ERROR,
  GET_TOP_BOOKING_LIST_SUCCESS,
  GET_TOP_PROMOTION_LIST,
  GET_TOP_PROMOTION_LIST_ERROR,
  GET_TOP_PROMOTION_LIST_SUCCESS,
  GET_TRANSACTION_EARNING_LIST,
  GET_TRANSACTION_EARNING_LIST_ERROR,
  GET_TRANSACTION_EARNING_LIST_SUCCESS,
  GET_VEHICLE,
  GET_VEHICLE_ERROR,
  GET_VEHICLE_SUCCESS,
  LOGOUT_APP,
  LOGOUT_APP_ERROR,
  LOGOUT_APP_SUCCESS,
  POST_TRANSACTION,
  POST_TRANSACTION_ERROR,
  POST_TRANSACTION_SUCCESS,
  RATING_REVIEW,
  RATING_REVIEW_ERROR,
  RATING_REVIEW_SUCCESS,
  READ_NOTIFICATIONS,
  READ_NOTIFICATIONS_ERROR,
  READ_NOTIFICATIONS_SUCCESS,
  REQUEST_HELP,
  REQUEST_HELP_ERROR,
  REQUEST_HELP_SUCCESS,
  REQUEST_OFFER,
  REQUEST_OFFER_ERROR,
  REQUEST_OFFER_SUCCESS,
  REQUEST_PAYPAL_CAPTURE,
  REQUEST_PAYPAL_CAPTURE_ERROR,
  REQUEST_PAYPAL_CAPTURE_SUCCESS,
  REQUEST_PAYPAL_ORDER,
  REQUEST_PAYPAL_ORDER_ERROR,
  REQUEST_PAYPAL_ORDER_SUCCESS,
  RESET_BOOKING_DATA,
  SAVE_BOOKING_DATA
} from "./constants";

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

export function logout() {
  return {
    type: LOGOUT_APP
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_APP_SUCCESS,
    error
  };
}

export function logoutError(error) {
  return {
    type: LOGOUT_APP_ERROR,
    error
  };
}

export function getCategory() {
  return {
    type: GET_CATEGORY
  };
}

export function getCategorySuccess(response) {
  return {
    type: GET_CATEGORY_SUCCESS,
    response
  };
}

export function getCategoryError(err) {
  return {
    type: GET_CATEGORY_ERROR,
    err
  };
}

export function getSubCategory(category) {
  return {
    type: GET_SUB_CATEGORY,
    category
  };
}

export function getSubCategorySuccess(response) {
  return {
    type: GET_SUB_CATEGORY_SUCCESS,
    response
  };
}

export function getSubCategoryError(err) {
  return {
    type: GET_SUB_CATEGORY_ERROR,
    err
  };
}

export function getVehicle(category, subCategory) {
  return {
    type: GET_VEHICLE,
    category,
    subCategory
  };
}

export function getVehicleSuccess(response) {
  return {
    type: GET_VEHICLE_SUCCESS,
    response
  };
}

export function getVehicleError(err) {
  return {
    type: GET_VEHICLE_ERROR,
    err
  };
}

export function getRaceCourse() {
  return {
    type: GET_RACE_COURSE
  };
}

export function getRaceCourseSuccess(response) {
  return {
    type: GET_RACE_COURSE_SUCCESS,
    response
  };
}

export function getRaceCourseError(err) {
  return {
    type: GET_RACE_COURSE_ERROR,
    err
  };
}

export function resetBookingData() {
  return {
    type: RESET_BOOKING_DATA
  };
}

export function saveBookingData(data) {
  return {
    type: SAVE_BOOKING_DATA,
    data
  };
}

export function bookingRequest(data) {
  return {
    type: BOOKING_REQUEST,
    data
  };
}

export function bookingRequestSuccess(response) {

  return {
    type: BOOKING_REQUEST_SUCCESS,
    response
  };
}

export function bookingRequestError(error) {
  return {
    type: BOOKING_REQUEST_ERROR,
    error
  };
}

export function getEstimatePrice(data) {
  return {
    type: ESTIMATE_PRICE,
    data
  };
}

export function estimatePriceSuccess(response) {
  return {
    type: ESTIMATE_PRICE_SUCCESS,
    response
  };
}

export function estimatePriceError(error) {
  return {
    type: ESTIMATE_PRICE_ERROR,
    error
  };
}

export function getDriverLicense() {
  return {
    type: GET_DRIVER_LICENSE
  };
}

export function getDriverLicenseSuccess(response) {
  return {
    type: GET_DRIVER_LICENSE_SUCCESS,
    response
  };
}

export function getDriverLicenseError(error) {
  return {
    type: GET_DRIVER_LICENSE_ERROR,
    error
  };
}

export function getCurrentBookings(params, resolve, reject) {
  return {
    type: GET_CURRENT_BOOKINGS,
    params,
    resolve,
    reject
  };
}

export function getCurrentBookingSuccess(response) {
  return {
    type: GET_CURRENT_BOOKINGS_SUCCESS,
    response
  };
}

export function getCurrentBookingError(error) {
  return {
    type: GET_CURRENT_BOOKINGS_ERROR,
    error
  };
}

export function getHistoryBooking(params, resolve, reject) {
  return {
    type: GET_HISTORY_BOOKINGS,
    params,
    resolve,
    reject
  };
}

export function getHistoryBookingSuccess(response) {
  return {
    type: GET_HISTORY_BOOKINGS_SUCCESS,
    response
  };
}

export function getHistoryBookingError(error) {
  return {
    type: GET_HISTORY_BOOKINGS_ERROR,
    error
  };
}

//-------------------JOB
export function getJobDetail(id, resolve, reject) {
  return {
    type: GET_JOB_DETAIL,
    id,
    resolve,
    reject
  };
}

export function getJobDetailSuccess(response) {
  return {
    type: GET_JOB_DETAIL_SUCCESS,
    response
  };
}

export function getJobDetailError(error) {
  return {
    type: GET_JOB_DETAIL_ERROR,
    error
  };
}

export function getJobRequestList(params, resolve, reject) {
  return {
    type: GET_JOB_REQUEST_LIST,
    params,
    resolve,
    reject
  };
}

export function getJobRequestListSuccess(response) {
  return {
    type: GET_JOB_REQUEST_LIST_SUCCESS,
    response
  };
}

export function getJobRequestListError(error) {
  return {
    type: GET_JOB_REQUEST_LIST_ERROR,
    error
  };
}

export function getJobRequestDetail(id, resolve, reject) {
  return {
    type: GET_JOB_REQUEST_DETAIL,
    id,
    resolve,
    reject
  };
}

export function getJobRequestDetailSuccess(response) {
  return {
    type: GET_JOB_REQUEST_DETAIL_SUCCESS,
    response
  };
}

export function getJobRequestDetailError(error) {
  return {
    type: GET_JOB_REQUEST_DETAIL_ERROR,
    error
  };
}

export function acceptJobRequest(id, params, resolve, reject) {
  /*
  id is job request id
  params is format
  {
    jobId : "",
    cardId: "";
  }
  */
  return {
    type: ACCEPT_JOB_REQUEST,
    id, params, resolve, reject
  };
}

export function acceptJobRequestSuccess(response) {
  return {
    type: ACCEPT_JOB_REQUEST_SUCCESS,
    response
  };
}

export function acceptJobRequestError(error) {
  return {
    type: ACCEPT_JOB_REQUEST_ERROR,
    error
  };
}

export function deleteJobRequest(params, resolve, reject) {
  /*
  params is format
  {
    jobId : "",
    jobRequestIdArr : ["1", "2"];
  }
  */
  return {
    type: DELETE_JOB_REQUEST,
    params, resolve, reject
  };
}

export function deleteJobRequestSuccess(response) {
  return {
    type: DELETE_JOB_REQUEST_SUCCESS,
    response
  };
}

export function deleteJobRequestError(error) {
  return {
    type: DELETE_JOB_REQUEST_ERROR,
    error
  };
}

export function requestOffer(params, resolve, reject) {
  return {
    type: REQUEST_OFFER,
    params,
    resolve,
    reject
  };
}

export function requestOfferSuccess(response) {
  return {
    type: REQUEST_OFFER_SUCCESS,
    response
  };
}

export function requestOfferError(error) {
  return {
    type: REQUEST_OFFER_ERROR,
    error
  };
}

export function getJobRecommendRideList(id, resolve, reject) {
  return {
    type: GET_JOB_RECOMMEND_RIDE_LIST,
    id,
    resolve,
    reject
  };
}

export function getJobRecommendRideListSuccess(response) {
  return {
    type: GET_JOB_RECOMMEND_RIDE_LIST_SUCCESS,
    response
  };
}

export function getJobRecommendRideListError(error) {
  return {
    type: GET_JOB_RECOMMEND_RIDE_LIST_ERROR,
    error
  };
}

//---------------------------PAYOUT
export function getPayoutCountry(resolve, reject) {
  return {
    type: GET_PAYOUT_COUNTRY,
    resolve, reject
  };
}

export function getPayoutCountrySuccess(response) {
  return {
    type: GET_PAYOUT_COUNTRY_SUCCESS,
    response
  };
}

export function getPayoutCountryError(err) {
  return {
    type: GET_PAYOUT_COUNTRY_ERROR,
    err
  };
}

export function getPayoutState(countryId, resolve, reject) {
  return {
    type: GET_PAYOUT_STATE,
    countryId,
    resolve, reject
  };
}

export function getPayoutStateSuccess(response) {
  return {
    type: GET_PAYOUT_STATE_SUCCESS,
    response
  };
}

export function getPayoutStateError(err) {
  return {
    type: GET_PAYOUT_STATE_ERROR,
    err
  };
}

export function getPayoutCity(countryId, stateId, resolve, reject) {
  return {
    type: GET_PAYOUT_CITY,
    countryId,
    stateId,
    resolve, reject
  };
}

export function getPayoutCitySuccess(response) {
  return {
    type: GET_PAYOUT_CITY_SUCCESS,
    response
  };
}

export function getPayoutCityError(err) {
  return {
    type: GET_PAYOUT_CITY_ERROR,
    err
  };
}

export function actActivityBooking(activityId, key, resolve, reject) {
  return {
    type: ACT_ACTIVITY,
    activityId, key,
    resolve, reject
  };
}

export function actActivityBookingSuccess(response) {
  return {
    type: ACT_ACTIVITY_SUCCESS,
    response
  };
}

export function actActivityBookingError(err) {
  return {
    type: ACT_ACTIVITY_ERROR,
    err
  };
}

export function ratingAndReview(idActivity, link, formData, resolve, reject) {
  return {
    type: RATING_REVIEW,
    idActivity, link, formData,
    resolve, reject
  };
}

export function ratingAndReviewSuccess(response) {
  return {
    type: RATING_REVIEW_SUCCESS,
    response
  };
}

export function ratingAndReviewError(err) {
  return {
    type: RATING_REVIEW_ERROR,
    err
  };
}

export function getDriveCurrent(params, resolve, reject) {
  return {
    type: GET_DRIVE_CURRENT_LIST,
    params,
    resolve,
    reject
  };
}

export function getDriveCurrentListSuccess(response) {
  return {
    type: GET_DRIVE_CURRENT_LIST_SUCCESS,
    response
  };
}

export function getDriveCurrentListError(error) {
  return {
    type: GET_DRIVE_CURRENT_LIST_ERROR,
    error
  };
}

export function getDriveHistoryList(params, resolve, reject) {
  return {
    type: GET_DRIVE_HISTORY_LIST,
    params,
    resolve,
    reject
  };
}

export function getDriveHistoryListSuccess(response) {
  return {
    type: GET_DRIVE_HISTORY_LIST_SUCCESS,
    response
  };
}

export function getDriveHistoryListError(error) {
  return {
    type: GET_DRIVE_HISTORY_LIST_ERROR,
    error
  };
}

export function getDriverVehicleList(params, resolve, reject) {
  return {
    type: GET_DRIVER_VEHICLE_LIST,
    params,
    resolve,
    reject
  };
}

export function getDriverVehicleListSuccess(response) {
  return {
    type: GET_DRIVER_VEHICLE_LIST_SUCCESS,
    response
  };
}

export function getDriverVehicleListError(error) {
  return {
    type: GET_DRIVER_VEHICLE_LIST_ERROR,
    error
  };
}

export function getCreditCardConfirm(params, resolve, reject) {
  //PARAMS IS
  // {
  //   "jobId": "string",
  //   "jobRequestId": "string",
  //   "cardId": "string"
  // }
  return {
    type: GET_CREDIT_CARD_CONFIRM,
    params,
    resolve,
    reject
  };
}

export function getCreditCardConfirmSuccess(response) {
  return {
    type: GET_CREDIT_CARD_CONFIRM_SUCCESS,
    response
  };
}

export function getCreditCardConfirmError(error) {
  return {
    type: GET_CREDIT_CARD_CONFIRM_ERROR,
    error
  };
}

export function getDriveBiddingList(params, resolve, reject) {
  return {
    type: GET_DRIVE_BIDDING_LIST,
    params,
    resolve,
    reject
  };
}

export function getDriveBiddingListSuccess(response) {
  return {
    type: GET_DRIVE_BIDDING_LIST_SUCCESS,
    response
  };
}

export function getDriveBiddingListError(error) {
  return {
    type: GET_DRIVE_BIDDING_LIST_ERROR,
    error
  };
}

export function getOffersList(params, resolve, reject) {
  return {
    type: GET_OFFER_LIST,
    params,
    resolve,
    reject
  };
}

export function getOffersListSuccess(response) {
  return {
    type: GET_OFFER_LIST_SUCCESS,
    response
  };
}

export function getOffersListError(error) {
  return {
    type: GET_OFFER_LIST_ERROR,
    error
  };
}

// BLOG
export function getBlogList(params, resolve, reject) {
  return {
    type: GET_BLOG_LIST,
    params,
    resolve,
    reject
  };
}

export function getBlogListSuccess(response) {
  return {
    type: GET_BLOG_LIST_SUCCESS,
    response
  };
}

export function getBlogListError(error) {
  return {
    type: GET_BLOG_LIST_ERROR,
    error
  };
}

export function getRelateBlogList(id, resolve, reject) {
  return {
    type: GET_RELATE_BLOG_LIST,
    id,
    resolve,
    reject
  };
}

export function getRelateBlogListSuccess(response) {
  return {
    type: GET_RELATE_BLOG_LIST_SUCCESS,
    response
  };
}

export function getRelateBlogListError(error) {
  return {
    type: GET_RELATE_BLOG_LIST_ERROR,
    error
  };
}

export function getBlogDetail(id, resolve, reject) {
  return {
    type: GET_BLOG_DETAIL,
    id,
    resolve,
    reject
  };
}

export function getBlogDetailSuccess(response) {
  return {
    type: GET_BLOG_DETAIL_SUCCESS,
    response
  };
}

export function getBlogDetailError(error) {
  return {
    type: GET_BLOG_DETAIL_ERROR,
    error
  };
}

// FEATURED DESTINATION

export function getFeaturedDestinationList(params, resolve, reject) {
  return {
    type: GET_FEATURED_LIST,
    params,
    resolve,
    reject
  };
}

export function getFeaturedDestinationListSuccess(response) {
  return {
    type: GET_FEATURED_LIST_SUCCESS,
    response
  };
}

export function getFeaturedDestinationListError(error) {
  return {
    type: GET_FEATURED_LIST_ERROR,
    error
  };
}

export function getFeaturedDestinationDetail(id, resolve, reject) {
  return {
    type: GET_FEATURED_DETAIL,
    id,
    resolve,
    reject
  };
}

export function getFeaturedDestinationDetailSuccess(response) {
  return {
    type: GET_FEATURED_DETAIL_SUCCESS,
    response
  };
}

export function getFeaturedDestinationDetailError(error) {
  return {
    type: GET_FEATURED_DETAIL_ERROR,
    error
  };
}


// OTHER PAGES

export function getOtherPageList(params, resolve, reject) {
  return {
    type: GET_OTHER_PAGE_LIST,
    params,
    resolve,
    reject
  };
}

export function getOtherPageListSuccess(response) {
  return {
    type: GET_OTHER_PAGE_LIST_SUCCESS,
    response
  };
}

export function getOtherPageListError(error) {
  return {
    type: GET_OTHER_PAGE_LIST_ERROR,
    error
  };
}

export function getOtherPageDetail(id, resolve, reject) {
  return {
    type: GET_OTHER_PAGE_DETAIL,
    id,
    resolve,
    reject
  };
}

export function getOtherPageDetailSuccess(response) {
  return {
    type: GET_OTHER_PAGE_DETAIL_SUCCESS,
    response
  };
}

export function getOtherPageDetailError(error) {
  return {
    type: GET_OTHER_PAGE_DETAIL_ERROR,
    error
  };
}

// PROMOTION
export function getPromotionList(params, resolve, reject) {
  return {
    type: GET_PROMOTION_LIST,
    params,
    resolve,
    reject
  };
}

export function getPromotionListSuccess(response) {
  return {
    type: GET_PROMOTION_LIST_SUCCESS,
    response
  };
}

export function getPromotionListError(error) {
  return {
    type: GET_PROMOTION_LIST_ERROR,
    error
  };
}

export function getTopPromotionList(params, resolve, reject) {
  return {
    type: GET_TOP_PROMOTION_LIST,
    params,
    resolve,
    reject
  };
}

export function getTopPromotionListSuccess(response) {
  return {
    type: GET_TOP_PROMOTION_LIST_SUCCESS,
    response
  };
}

export function getTopPromotionListError(error) {
  return {
    type: GET_TOP_PROMOTION_LIST_ERROR,
    error
  };
}

export function getPromotionDetail(id, resolve, reject) {
  return {
    type: GET_PROMOTION_DETAIL,
    id,
    resolve,
    reject
  };
}

export function getPromotionDetailSuccess(response) {
  return {
    type: GET_PROMOTION_DETAIL_SUCCESS,
    response
  };
}

export function getPromotionDetailError(error) {
  return {
    type: GET_PROMOTION_DETAIL_ERROR,
    error
  };
}

export function requestHelp(data, resolve, reject) {
  return {
    type: REQUEST_HELP,
    data,
    resolve,
    reject
  };
}

export function requestHelpSuccess(response) {
  return {
    type: REQUEST_HELP_SUCCESS,
    response
  };
}

export function requestHelpError(error) {
  return {
    type: REQUEST_HELP_ERROR,
    error
  };
}

//PAYPAL
export function requestPaypalOrder(data, resolve, reject) {
  // data is format
  // {
  //   jobId="", jobRequestId="",
  // }
  return {
    type: REQUEST_PAYPAL_ORDER,
    data,
    resolve,
    reject
  };
}

export function requestPaypalOrderSuccess(response) {
  return {
    type: REQUEST_PAYPAL_ORDER_SUCCESS,
    response
  };
}

export function requestPaypalOrderError(error) {
  return {
    type: REQUEST_PAYPAL_ORDER_ERROR,
    error
  };
}

export function requestPaypalCapture(data, resolve, reject) {
  // data is format
  // {
  //   jobId="", jobRequestId="",
  // }
  return {
    type: REQUEST_PAYPAL_CAPTURE,
    data,
    resolve,
    reject
  };
}

export function requestPaypalCaptureSuccess(response) {
  return {
    type: REQUEST_PAYPAL_CAPTURE_SUCCESS,
    response
  };
}

export function requestPaypalCaptureError(error) {
  return {
    type: REQUEST_PAYPAL_CAPTURE_ERROR,
    error
  };
}


//NOTIFICATION
export function getNotificationList(params, resolve, reject) {
  return {
    type: GET_NOTIFICATION_LIST,
    params,
    resolve,
    reject
  };
}

export function getNotificationListSuccess(response) {
  return {
    type: GET_NOTIFICATION_LIST_SUCCESS,
    response
  };
}

export function getNotificationListError(error) {
  return {
    type: GET_NOTIFICATION_LIST_ERROR,
    error
  };
}

export function readNotifications(params, resolve, reject) {
  // params notification id array
  // {
  //    notiIdArr:[1,2]
  // }
  return {
    type: READ_NOTIFICATIONS,
    params,
    resolve,
    reject
  };
}

export function readNotificationsSuccess(response) {
  return {
    type: READ_NOTIFICATIONS_SUCCESS,
    response
  };
}

export function readNotificationsError(error) {
  return {
    type: READ_NOTIFICATIONS_ERROR,
    error
  };
}

export function deleteNotifications(params, resolve, reject) {
  // params notification id array
  // {
  //    notiIdArr:[1,2]
  // }
  return {
    type: DELETE_NOTIFICATIONS,
    params,
    resolve,
    reject
  };
}

export function deleteNotificationsSuccess(response) {
  return {
    type: DELETE_NOTIFICATIONS_SUCCESS,
    response
  };
}

export function deleteNotificationsError(error) {
  return {
    type: DELETE_NOTIFICATIONS_ERROR,
    error
  };
}

//TOP BOOKING
export function getTopBookingList(params, resolve, reject) {
  return {
    type: GET_TOP_BOOKING_LIST,
    params,
    resolve,
    reject
  };
}

export function getTopBookingListSuccess(response) {
  return {
    type: GET_TOP_BOOKING_LIST_SUCCESS,
    response
  };
}

export function getTopBookingListError(error) {
  return {
    type: GET_TOP_BOOKING_LIST_ERROR,
    error
  };
}

//EARNING
export function getStatisticEarning(params, resolve, reject) {
  return {
    type: GET_STATISTIC_EARNING,
    resolve,
    reject
  };
}

export function getStatisticEarningSuccess(response) {
  return {
    type: GET_STATISTIC_EARNING_SUCCESS,
    response
  };
}

export function getStatisticEarningError(error) {
  return {
    type: GET_STATISTIC_EARNING_ERROR,
    error
  };
}

export function getTransactionList(params, resolve, reject) {
  return {
    type: GET_TRANSACTION_EARNING_LIST,
    params,
    resolve,
    reject
  };
}

export function getTransactionListSuccess(response) {
  return {
    type: GET_TRANSACTION_EARNING_LIST_SUCCESS,
    response
  };
}

export function getTransactionListError(error) {
  return {
    type: GET_TRANSACTION_EARNING_LIST_ERROR,
    error
  };
}

export function getRevenueChart(params, resolve, reject) {
  return {
    type: GET_REVENUE_CHART,
    params,
    resolve,
    reject
  };
}

export function getRevenueChartSuccess(response) {
  return {
    type: GET_REVENUE_CHART_SUCCESS,
    response
  };
}

export function getRevenueChartError(error) {
  return {
    type: GET_REVENUE_CHART_ERROR,
    error
  };
}

export function getPayoutAccount(resolve, reject) {
  return {
    type: GET_PAYOUT_ACCOUNT,
    resolve,
    reject
  };
}

export function getPayoutAccountSuccess(response) {
  return {
    type: GET_PAYOUT_ACCOUNT_SUCCESS,
    response
  };
}

export function getPayoutAccountError(error) {
  return {
    type: GET_PAYOUT_ACCOUNT_ERROR,
    error
  };
}

export function postTransaction(params, resolve, reject) {
  return {
    type: POST_TRANSACTION,
    params,
    resolve,
    reject
  };
}

export function postTransactionSuccess(response) {
  return {
    type: POST_TRANSACTION_SUCCESS,
    response
  };
}

export function postTransactionError(error) {
  return {
    type: POST_TRANSACTION_ERROR,
    error
  };
}
