/**
 *
 * MainPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectMainPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {
  changeStoreData as changeStoreDataHomePage,
  getCategory,
  getDriverLicense,
  getEstimatePrice,
  getRaceCourse,
  getSubCategory,
  getTopPromotionList,
  getVehicle,
  resetBookingData,
  saveBookingData
} from "../HomePage/actions";
import {
  makeSelectBookingDataHomePage,
  makeSelectCategoryListHomePage,
  makeSelectDriverLicenseListHomePage,
  makeSelectFeatureListDataHomePage,
  makeSelectLoadingBlockHomePage,
  makeSelectRaceCourseListHomePage,
  makeSelectSubCategoryListHomePage,
  makeSelectTopBookingListDataHomePage,
  makeSelectVehicleListHomePage
} from "../HomePage/selectors";
import messages from "./messages";

import "./styles.scss";
//lib
import _ from "lodash";
import localStoreService from "local-storage";
//component
import CarouselHome from "../../components/CarouselHome";
import BookingForm from "../../components/BookingForm/Loadable";
import { urlLink } from "../../helper/route";
import BaseSlider from "../../components/BaseSlider";
import { makeSelectCurrentUser } from "../App/selectors";
import { signUpAsDriver } from "../SignUpPage/actions";
import { getCurrentUser } from "../Auth/actions";
import { calculateDirection } from "../../utils/helpers";
import FeaturedDestinationsSection from "../../components/FeaturedDestinationsSection";


/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    // console.log("CLEARING BOOKING DATA WHEN LOAD MAIN PAGE");
    setTimeout(this.props.getCategory(), 2000);

    this.props.resetBookingData();
    this.props.getTopPromotionList({});

    if (!_.isEmpty(localStoreService.get("token"))) {
      this.props.getCurrentUser()
        .then((currentUser) => {
          let { role = ["customer"] } = currentUser;

          localStoreService.set("role", role);
        });
    }
  }

  handleSignUpDriver = (currentUser) => {
    // !ROLE IS ARRAY
    localStoreService.set("role", ["customer", "company"]);

    if (!_.isEmpty(currentUser)) {//logged user
      const { role = ["customer"] } = currentUser;
      if (_.indexOf(role, "company") >= 0) {
        this.props.history.push(urlLink.stepSignUp);

      } else {
        this.props.signUpAsDriver()
          .then(() => this.props.history.push(urlLink.stepSignUp));
      }
    } else { //no login
      this.props.history.push(urlLink.signUp);
    }
  };

  render() {
    const {
      currentUser = {},
      categoryList = [],
      subCategoryList = [],
      vehicleList = [],
      raceCourseList = [],
      getSubCategory = (category) => {
      },
      getVehicle = (category, subCategory) => {
      },
      getRaceCourse = () => {
      },
      bookingData = { indexSelectedCategory: 0 },
      estimatePrice = {},
      estimateDistance = { totalDistance: 0, totalDuration: 0 },
      topBookingList = [],
      featuredDestinationsList = []
    } = this.props;

    const {
      topPromotion = []
    } = this.props.mainpage;

    return (
      <div className={"main-page-wrapper"}>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of MainPage"/>
        </Helmet>
        <div className={"banner"}>
          <div className={"form container"}>

            <BookingForm {...this.props}
                         popperPlacement={"top-start"}
                         categoryList={categoryList}
                         subCategoryList={subCategoryList}
                         vehicleList={vehicleList}
                         bookingData={bookingData}
                         estimatePrice={estimatePrice}
                         raceCourseList={raceCourseList}
                         estimateDistance={estimateDistance}
                         getSubCategory={(category) => {
                           getSubCategory(category);
                         }}
                         getVehicle={(category, subCategory) => {
                           getVehicle(category, subCategory);
                         }}
                         getRaceCourse={() => {
                           getRaceCourse();
                         }}
                         onSubmit={(e) => {
                           this.props.saveBookingData(e);
                           // calculateDirection(e, this.props.changeStoreDataHomePage);
                           this.props.history.push({ pathname: urlLink.booking, state: { bookingData: { ...e, addOption: true }, showErrorBookingForm: true } });
                         }}
                         onSaveBookingData={e => {
                           this.props.saveBookingData(e);
                         }}
                         onChangeDestination={(e) => {
                           this.props.saveBookingData(e);
                           calculateDirection(e, this.props.changeStoreDataHomePage);
                         }}
            />
          </div>
        </div>

        <div className={"container main-wrapper"}>
          <section className={"section slider"}>
            <div className={"justify-content-center"}>
              <CarouselHome settings={{
                slidesToShow: 2,
                slidesToScroll: 2
              }} list={topPromotion}/>
            </div>
          </section>

          <section className={"section services-wrapper"}>
            <div className={"row"}>
              <section className={"service-item text-center col-md-4"}>
                <i className="icon icon-icon-airplane"/>
                <div className={"title"}>
                  <FormattedMessage {...messages.seamlessTitle} />
                </div>
                <div className={"content"}>
                  <FormattedMessage {...messages.seamlessContent} />
                </div>
              </section>

              <section className={"service-item text-center col-md-4"}>
                <i className="icon icon-icon-price-down"/>
                <div className={"title"}>
                  <FormattedMessage {...messages.inclusiveTitle} />
                </div>
                <div className={"content"}>
                  <FormattedMessage {...messages.inclusiveContent} />
                </div>
              </section>

              <section className={"service-item text-center col-md-4"}>
                <i className="icon icon-icon-calendar-timeout"/>
                <div className={"title"}>
                  <FormattedMessage {...messages.rideTitle} />
                </div>
                <div className={"content"}>
                  <FormattedMessage {...messages.rideContent} />
                </div>
              </section>
            </div>
          </section>

          <section className={"section introduce-wrapper"}>
            <div className={"content-wrapper"}>
              <div className={"title color-white"}>Thai Mobility brings value to your trip</div>
              <div className={"content"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor
                incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className={"car-img"}>
              <img src={"./car-home.png"} className={"img-fluid"} alt={"car"}/>
            </div>

          </section>

          <section className={"section sign-up-wrapper"}
          >
            <div className={"row"}>
              <div className={"col-md-6"}>
                <div className={"sign-up-item left"}
                     onClick={(e) => {
                       e.preventDefault();
                       this.handleSignUpDriver(currentUser);
                     }}
                >
                  <span className={"sub-title"}>Sign up for a ride</span>
                  <span className={"icon icon-chevron-right"}/>
                </div>

              </div>
              <div className={"col-md-6"}>
                <div className={"sign-up-item right"}
                     onClick={(e) => {
                       e.preventDefault();
                       this.handleSignUpDriver(currentUser);
                     }}>
                  <span className={"sub-title"}>Do you want to be a driver?</span>
                  <span className={"icon icon-chevron-right"}/>
                </div>
              </div>
            </div>
          </section>

          <section className={"section top-bookings-wrapper"}>
            <div className={"title"}>Top Bookings</div>
            <div className={"text-small see-all cursor-pointer"} onClick={() => this.props.history.push(urlLink.topBooking)}>See all</div>
            <div className={"top-booking-slider"}>
              <BaseSlider
                history={this.props.history}
                changeStoreDataHomePage={(key, value) => {
                  this.props.changeStoreDataHomePage(key, value);
                }}
                settings={{
                  slidesToShow: 4,
                  slidesToScroll: 4
                }}
                list={topBookingList}
              />
            </div>
          </section>
          <FeaturedDestinationsSection list={featuredDestinationsList}/>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  getTopPromotionList: PropTypes.func,
  getCurrentUser: PropTypes.func,
  getCategory: PropTypes.func,
  resetBookingData: PropTypes.func,
  saveBookingData: PropTypes.func,
  getSubCategory: PropTypes.func,
  changeStoreDataHomePage: PropTypes.func,
  getEstimatePrice: PropTypes.func,
  getDriverLicense: PropTypes.func,
  signUpAsDriver: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
  currentUser: makeSelectCurrentUser(),
  categoryList: makeSelectCategoryListHomePage(),
  subCategoryList: makeSelectSubCategoryListHomePage(),
  raceCourseList: makeSelectRaceCourseListHomePage(),
  driverLicenseList: makeSelectDriverLicenseListHomePage(),
  vehicleList: makeSelectVehicleListHomePage(),
  bookingData: makeSelectBookingDataHomePage(),
  loadingBlock: makeSelectLoadingBlockHomePage(),
  featuredDestinationsList: makeSelectFeatureListDataHomePage(),
  topBookingList: makeSelectTopBookingListDataHomePage()
});

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentUser(resolve, reject));
      });
    },
    saveBookingData: (value) => {
      dispatch(saveBookingData(value));
    },
    resetBookingData: () => {
      dispatch(resetBookingData());
    },
    getCategory: () => {
      dispatch(getCategory());
    },
    getEstimatePrice: (value) => {
      dispatch(getEstimatePrice(value));
    },
    getSubCategory: (categoryId) => {
      dispatch(getSubCategory(categoryId));
    },
    getVehicle: (categoryId, subCategoryId) => {
      dispatch(getVehicle(categoryId, subCategoryId));
    },
    getRaceCourse: () => {
      dispatch(getRaceCourse());
    },
    getDriverLicense: () => {
      dispatch(getDriverLicense());
    },
    changeStoreDataHomePage: (key, value) => {
      dispatch(changeStoreDataHomePage(key, value));
    },
    signUpAsDriver: () => {
      return new Promise((resolve, reject) => {
        dispatch(signUpAsDriver(resolve, reject));
      });
    },
    getTopPromotionList: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(getTopPromotionList(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "mainPage", reducer });
const withSaga = injectSaga({ key: "mainPage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MainPage);
