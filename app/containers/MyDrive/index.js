/**
 *
 * MyDrive
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import "./style.scss";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectMyDrive from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { urlLink } from "../../helper/route";
import CurrentDrive from "../CurrentDrive/Loadable";
import BiddingDrive from "../BiddingDrive";
import HistoryDrive from "../HistoryDrive";
import "../MyBooking/style.scss";
import MenuList from "../../components/MenuList";
import BookingsDetail from "../BookingsDetail";


/* eslint-disable react/prefer-stateless-function */
export class MyDrive extends React.PureComponent {
  render() {
    const listLink = [
      {
        link: urlLink.currentDrive,
        text: "Current Drive"
      },
      {
        link: urlLink.biddingDrive,
        text: "Bidding Drive"
      },
      {
        link: urlLink.historyDrive,
        text: "History Drive"
      }
    ];
    return (
      <div className={"my-drive-wrapper"}>
        <Helmet>
          <title>My Drive</title>
          <meta name="description" content="Description of MyDrive"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-2"}>
              <MenuList
                titleMenu={"My Drive"}
                listLink={listLink}
              />
            </div>
            <div className={"col-lg-10"}>
              <Router>
                <Switch>
                  <Route exact path={urlLink.currentDrive}
                         render={props => <CurrentDrive {...props} showStatus={true}/>}/>
                  />
                  <Route path={urlLink.biddingDrive} component={BiddingDrive}/>
                  <Route exact path={urlLink.historyDrive} component={HistoryDrive}/>
                  <Route path={urlLink.historyDriveDetail} component={BookingsDetail}/>
                  <Route path={urlLink.myDrive} render={(props) => <Redirect to={urlLink.currentDrive} {...props} />}/>
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyDrive.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  myDrive: makeSelectMyDrive()
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

const withReducer = injectReducer({ key: "myDrive", reducer });
const withSaga = injectSaga({ key: "myDrive", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MyDrive);
