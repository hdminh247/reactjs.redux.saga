/**
 *
 * BookingOfferPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import {
  makeSelectBookingApiErrorHomePage,
  makeSelectBookingDataHomePage,
  makeSelectBookingDirectionsHomePage,
  makeSelectCategoryListHomePage,
  makeSelectDriverLicenseListHomePage,
  makeSelectEstimateDistanceHomePage,
  makeSelectEstimatePriceHomePage,
  makeSelectFeatureListDataHomePage,
  makeSelectJobDetailDataHomePage,
  makeSelectLoadingBlockHomePage,
  makeSelectRaceCourseListHomePage,
  makeSelectRecommendRideListDataHomePage,
  makeSelectSubCategoryListHomePage,
  makeSelectVehicleListHomePage
} from "../HomePage/selectors";
import {
  bookingRequest,
  changeStoreData as changeStoreDataHomePage,
  getCategory,
  getDriverLicense,
  getEstimatePrice,
  getJobDetail,
  getJobRecommendRideList,
  getRaceCourse,
  getSubCategory,
  getVehicle,
  saveBookingData
} from "../HomePage/actions";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectBookingOffer from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
import BookingMap from "../../components/BookingMap";
import { switchValidation } from "../../components/BookingForm";
import BookingForm from "../../components/BookingForm/Loadable";


import moment from "moment";
import queryString from "query-string";
import localStoreService from "local-storage";
import _ from "lodash";
import { calculateDirection } from "../../utils/helpers";
import FeaturedDestinationsSection from "../../components/FeaturedDestinationsSection";
import { urlLink } from "../../helper/route";
import { changeStoreData } from "./actions";

/* eslint-disable react/prefer-stateless-function */
export class BookingOfferPage extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const { state = {}, search = "" } = this.props.location;
    const { bookingData = {}, showErrorBookingForm = false } = state;
    console.log("Receive state----------", state);
    this.props.changeStoreData("showErrorBookingForm", showErrorBookingForm);
    this.props.changeStoreDataHomePage(["bookingData", "addOption"], true);
    const { jobId = "" } = queryString.parse(search);

    // !CASE IN MAIN PAGE SAVE DATA TO BOOKING OFFER PAGE
    if (!_.isEmpty(bookingData)) {
      this.props.saveBookingData(bookingData);
      this.handleEstimatePrice(bookingData);
    } else {
      //!CASE IN PROMOTION OR OTHER PAGE WILL APPLY FIELD FOR BOOKING DATA
      setTimeout(this.props.getCategory(), 2000);

      if (!_.isEmpty(state)) {
        //!key is key of category, exp: 'sport_car'
        const { subCategory = "", category = "", key = "" } = state;
        if (category) {
          this.props.getSubCategory(key);
          this.props.getDriverLicense();
          if (subCategory) {
            this.props.getRaceCourse();
            this.props.getVehicle(category, subCategory);
          }
        }
        Object.keys(state).map(key => {
          this.props.changeStoreDataHomePage(["bookingData", key], state[key]);
        });
      } else {
        if (jobId) {
          this.props.getJobDetail(jobId).then((res) => {
            const { category: objCategory = {}, subCategory: objSubCategory = {}, destination = [], pickupLocation = {}, checkIn = null } = res;
            const { _id: category = "", key = "", allowSubCategory = false } = objCategory;
            const { _id: subCategory = "" } = objSubCategory;
            const { name: pickupLocationName = "" } = pickupLocation;
            if (category) {
              this.props.getSubCategory(key);
              this.props.getDriverLicense();
              if (subCategory) {
                this.props.getRaceCourse();
                this.props.getVehicle(category, subCategory);
              }
            }

            let tempProcessData = {
              checkIn: null,
              objPickupLocation: pickupLocation,
              pickupLocation: pickupLocationName,
              destinationArr: destination,
              category,
              subCategory,
              objCategory,
              objSubCategory,
              key,
              allowSubCategory
            };

            Object.keys(tempProcessData).map(key => {
              this.props.changeStoreDataHomePage(["bookingData", key], tempProcessData[key]);
            });
          });
          this.props.getJobRecommendRideList(jobId);
        }
      }
    }
  }

  handleEstimatePrice(bookingData) {
    const {
      destinationArr = [{
        id: "",
        name: "",
        address: "",
        action: "add",
        type: "address",
        error: true,
        lat: 0,
        lng: 0
      }],
      objPickupLocation = {
        id: "",
        name: "",
        address: "",
        action: "add",
        type: "address",
        error: true,
        lat: 0,
        lng: 0
      },
      allowSubCategory = false,
      luggage = "",
      partySize = "",
      vanSize = "",
      category = "",
      subCategory = "",
      checkIn = "",
      key = ""
    } = bookingData;

    const {
      getEstimatePrice = () => {
      }
    } = this.props;

    const validateByYup = switchValidation(key);

    let temp = {
      ...bookingData,
      pickupLocation: objPickupLocation,
      // partySize: parseInt(partySize),
      // luggage: parseInt(luggage),
      // vanSize: parseInt(vanSize),
      checkIn: _.isUndefined(checkIn) || !moment(checkIn).isValid() ? "" : moment(checkIn).format()
    };


    validateByYup.validate(temp)
      .then(() => {
        console.log("YUP IS VALIDATED", temp);
        getEstimatePrice(temp);
      })
      .catch((err) => {
        console.log("YUP ERROR", err, key);

      });
  }

  render() {
    const {
      featuredDestinationsList = [
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
        }, {
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
      categoryList = [],
      subCategoryList = [],
      vehicleList = [],
      raceCourseList = [],
      getSubCategory = () => {
      },
      getRaceCourse = () => {
      },
      getVehicle = (category, subCategory) => {
      },
      //booking form
      bookingData = {},
      bookingData: { addOption = true },
      apiErrorBooking = [],
      estimatePrice = { unit: "€", value: 0 },
      estimateDistance = { totalDistance: 0, totalDuration: 0 },
      directions = {}
    } = this.props;

    const { showErrorBookingForm = false } = this.props.bookingoffer;


    return (
      <div className={"booking-offer-wrapper"}>
        <Helmet>
          <title>Booking offer</title>
          <meta name="description" content="Description of BookingOffer"/>
        </Helmet>
        <BookingForm {...this.props}
                     apiError={apiErrorBooking}
                     showErrorBookingForm={showErrorBookingForm}
          // !REQUIRED THIS VARIABLE
                     addOption={addOption}
                     validateOnLoad={true}
          // !-------------------
                     bookingData={bookingData}
                     categoryList={categoryList}
                     subCategoryList={subCategoryList}
                     vehicleList={vehicleList}
                     raceCourseList={raceCourseList}
                     estimatePrice={estimatePrice}
                     estimateDistance={estimateDistance}
                     getSubCategory={(category) => {
                       getSubCategory(category);
                     }}
                     getRaceCourse={() => {
                       getRaceCourse();
                     }}
                     getVehicle={(category, subCategory) => {
                       getVehicle(category, subCategory);
                     }}
                     onSaveBookingData={e => {
                       this.props.saveBookingData(e);
                     }}
                     onSubmit={(e) => {
                       let temp = {
                         ...e,
                         pickupLocation: e.objPickupLocation,
                         partySize: parseInt(e.partySize),
                         luggage: parseInt(e.luggage),
                         vanSize: parseInt(e.vanSize),
                         category: e.category,
                         subCategory: e.subCategory,
                         checkIn: moment(e.checkIn).format()
                       };
                       this.props.saveBookingData(e);

                       if (localStoreService.get("token")) {
                         this.props.bookingRequest(temp);
                       } else {
                         this.props.changeStoreDataHomePage("showLogin", true);
                       }
                     }}
                     onChangeDestination={(e) => {

                       this.props.saveBookingData(e);
                       calculateDirection(e, this.props.changeStoreDataHomePage);
                     }}
                     onEstimatePrice={(e) => {
                       this.handleEstimatePrice(e);
                       calculateDirection(e, this.props.changeStoreDataHomePage);
                     }}
                     onBookNow={res => {
                       const { destination = [], pickupLocation = {} } = { ...res };
                       const { category: objCategory = {}, subCategory: objSubCategory = {} } = this.props.jobDetail;
                       const { _id: category = "", key = "", allowSubCategory = false } = objCategory;
                       const { _id: subCategory = "" } = objSubCategory;
                       const { name: pickupLocationName = "" } = pickupLocation;
                       let tempProcessData = {
                         ...res,
                         checkIn: null,
                         objPickupLocation: pickupLocation,
                         pickupLocation: pickupLocationName,
                         destinationArr: destination,
                         category,
                         subCategory,
                         objCategory,
                         objSubCategory,
                         key,
                         allowSubCategory
                       };

                       Object.keys(tempProcessData).map(key => {
                         this.props.changeStoreDataHomePage(["bookingData", key], tempProcessData[key]);
                       });
                       this.props.history.replace(urlLink.booking);
                       this.props.changeStoreDataHomePage("recommendRideList", []);
                     }}
                     onChangeRecommendRide={value => {
                       // ! replace to urlLink.booking because url current has query jobId in tail
                       this.props.history.replace(urlLink.booking);
                       this.props.changeStoreDataHomePage("recommendRideList", value);
                     }}
        />

        <BookingMap {...this.props}
                    bookingData={bookingData}
                    directions={directions}
                    onSaveBookingData={e => {
                      this.handleEstimatePrice(e);
                      this.props.saveBookingData(e);
                      calculateDirection(e, this.props.changeStoreDataHomePage);
                    }}
                    getEstimatePrice={(e) => {
                      this.handleEstimatePrice(e);
                    }}
        />
        <div className={"container"}>
          <FeaturedDestinationsSection list={featuredDestinationsList}/>
        </div>
      </div>
    );
  }
}

BookingOfferPage.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  getCategory: PropTypes.func,
  getSubCategory: PropTypes.func,
  bookingRequest: PropTypes.func,
  saveBookingData: PropTypes.func,
  getEstimatePrice: PropTypes.func,
  getDriverLicense: PropTypes.func,
  getJobDetail: PropTypes.func,
  getRecommendRideList: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  bookingoffer: makeSelectBookingOffer(),
  loadingBlock: makeSelectLoadingBlockHomePage(),
  categoryList: makeSelectCategoryListHomePage(),
  subCategoryList: makeSelectSubCategoryListHomePage(),
  vehicleList: makeSelectVehicleListHomePage(),
  featuredDestinationsList: makeSelectFeatureListDataHomePage(),
  recommendRideList: makeSelectRecommendRideListDataHomePage(),
  jobDetail: makeSelectJobDetailDataHomePage(),
  raceCourseList: makeSelectRaceCourseListHomePage(),
  driverLicenseList: makeSelectDriverLicenseListHomePage(),
  bookingData: makeSelectBookingDataHomePage(),
  directions: makeSelectBookingDirectionsHomePage(),
  estimatePrice: makeSelectEstimatePriceHomePage(),
  estimateDistance: makeSelectEstimateDistanceHomePage(),
  apiErrorBooking: makeSelectBookingApiErrorHomePage()
});

function mapDispatchToProps(dispatch) {

  return {
    getCategory: () => {
      dispatch(getCategory());
    },
    getSubCategory: categoryId => {
      dispatch(getSubCategory(categoryId));
    },
    bookingRequest: values => {
      dispatch(bookingRequest(values));
    },
    saveBookingData: values => {
      dispatch(saveBookingData(values));
    },
    getVehicle: (categoryId, subCategoryId) => {
      dispatch(getVehicle(categoryId, subCategoryId));
    },
    getRaceCourse: () => {
      dispatch(getRaceCourse());
    },
    getEstimatePrice: values => {
      dispatch(getEstimatePrice(values));
    },
    getDriverLicense: () => {
      dispatch(getDriverLicense());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeStoreDataHomePage: (key, value) => {
      dispatch(changeStoreDataHomePage(key, value));
    },
    getJobRecommendRideList: (jobId) => {
      return new Promise((resolve, reject) => {
        dispatch(getJobRecommendRideList(jobId, resolve, reject));
      });
    },
    getJobDetail: (jobId) => {
      return new Promise((resolve, reject) => {
        dispatch(getJobDetail(jobId, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "bookingOffer", reducer });
const withSaga = injectSaga({ key: "bookingOffer", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(BookingOfferPage);
