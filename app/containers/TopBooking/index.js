/**
 *
 * TopBooking
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";

import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectTopBooking from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectTopBookingListDataHomePage } from "../HomePage/selectors";
import TopBookingItem from "../../components/TopBookingItem";
import { urlLink } from "../../helper/route";
import { changeStoreData } from "../HomePage/actions";

/* eslint-disable react/prefer-stateless-function */
export class TopBooking extends React.PureComponent {
  handleSelectTopBookingItem = (data) => {
    const {
      history = []
    } = this.props;
    const { category = {}, subCategory = {}, _id: vehicleId = "" } = data;
    console.log("handleSelectTopBookingItem", data);
    const { _id: categoryId = "", key = "", allowSubCategory = false } = category;
    const { _id: subCategoryId = "" } = subCategory;

    history.push(
      {
        pathname: urlLink.booking,
        state: {
          category: categoryId,
          subCategory: subCategoryId,
          vehicle: allowSubCategory ? vehicleId : "",
          key
        }
      }
    );
  };

  render() {
    const { topBookingList = [] } = this.props;
    return (
      <div className={"top-booking-wrapper"}>
        <Helmet>
          <title>Top Booking</title>
          <meta name="description" content="Description of TopBooking"/>
        </Helmet>

        <div className={"container"}>
          <div className={"title"}>Top Bookings</div>
          <div className={"row"}>
            {topBookingList.map(item => {
              const { data = {}, price = 0 } = item;
              return <div className={"col-md-3"} onClick={() => {
                this.handleSelectTopBookingItem(data);
              }}>
                <TopBookingItem {...data} price={price}/>
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

TopBooking.propTypes = {
  changeStoreDataHomePage: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  topBooking: makeSelectTopBooking(),
  topBookingList: makeSelectTopBookingListDataHomePage()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreDataHomePage: (key, value) => {
      dispatch(changeStoreData(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "topBooking", reducer });
const withSaga = injectSaga({ key: "topBooking", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(TopBooking);
