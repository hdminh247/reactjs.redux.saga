/**
 *
 * MyBooking
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectMyBooking from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
import { urlLink } from "../../helper/route";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import HistoryBookings from "../HistoryBookings";
import CurrentBookings from "../CurrentBookings";
import BookingsDetail from "../BookingsDetail";
import MenuList from "../../components/MenuList";

/* eslint-disable react/prefer-stateless-function */
export class MyBooking extends React.Component {
  render() {
    const listLink = [
      {
        link: urlLink.currentBookings,
        text: "Current Bookings"
      },
      {
        link: urlLink.historyBookings,
        text: "History Bookings"
      }
    ];
    return (
      <div className={"my-booking-wrapper"}>
        <Helmet>
          <title>My Booking</title>
          <meta name="description" content="Description of MyBooking"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-2"}>
              <MenuList
                titleMenu={"My Booking"}
                listLink={listLink}
              />
            </div>
            <div className={"col-lg-10"}>
              <Router>
                <Switch>
                  {/*History*/}
                  <Route strict exact path={urlLink.historyBookings}
                         component={HistoryBookings}/>
                  <Route path={urlLink.historyBookingsDetail}
                         render={props => <BookingsDetail {...props}/>}/>

                  {/*Current*/}
                  <Route strict exact path={urlLink.currentBookings}
                         component={CurrentBookings}/>
                  <Route path={urlLink.currentBookingsDetail}
                         render={props => <BookingsDetail {...props} showStatus={true}/>}/>

                  {/*Default navigate*/}
                  <Route path={urlLink.myBooking}
                         render={(props) => <Redirect to={urlLink.currentBookings} {...props} />}/>
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyBooking.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  myBooking: makeSelectMyBooking()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "myBooking", reducer });
const withSaga = injectSaga({ key: "myBooking", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MyBooking);
