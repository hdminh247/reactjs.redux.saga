import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get("homePage", initialState);

/**
 * Other specific selectors
 */

const makeSelectBookingDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("bookingData").toJS());
const makeSelectLoadingBlockHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("loadingBlock").toJS());
const makeSelectCategoryListHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("categoryList").toJS());
const makeSelectSubCategoryListHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("subCategoryList").toJS());
const makeSelectVehicleListHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("vehicleList").toJS());
const makeSelectRaceCourseListHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("raceCourseList").toJS());
const makeSelectDriverLicenseListHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("driverLicenseList").toJS());
const makeSelectBookingApiErrorHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("apiErrorBooking").toJS());
const makeSelectBookingDirectionsHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("directions").toJS());
const makeSelectEstimatePriceHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("estimatePrice").toJS());
const makeSelectEstimateDistanceHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("estimateDistance").toJS());
const makeSelectFeatureListDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("featuredDestinationsList").toJS());
const makeSelectRecommendRideListDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("recommendRideList").toJS());
const makeSelectJobDetailDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("jobDetail").toJS());
const makeSelectTopBookingListDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("topBookingList").toJS());
const makeSelectNotificationListDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("notificationList").toJS());
const makeSelectParamsNotificationListDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("paramsNotification").toJS());
const makeSelectNavMenuDataHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.get("navMenu").toJS());
/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());


export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLoadingBlockHomePage,
  makeSelectBookingDataHomePage,
  makeSelectCategoryListHomePage, makeSelectSubCategoryListHomePage, makeSelectVehicleListHomePage,
  makeSelectRaceCourseListHomePage, makeSelectDriverLicenseListHomePage,
  makeSelectBookingApiErrorHomePage,
  makeSelectBookingDirectionsHomePage,
  makeSelectEstimatePriceHomePage,
  makeSelectEstimateDistanceHomePage,
  makeSelectRecommendRideListDataHomePage,
  makeSelectJobDetailDataHomePage,
  makeSelectFeatureListDataHomePage,
  makeSelectTopBookingListDataHomePage,
  makeSelectNotificationListDataHomePage,
  makeSelectParamsNotificationListDataHomePage,
  makeSelectNavMenuDataHomePage
};
