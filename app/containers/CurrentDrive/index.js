/**
 *
 * CurrentDrive
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import "../OfferDetail/styles.scss";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectCurrentDrive from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { actActivityBooking, changeStoreData as changeStoreDataHome, getDriveCurrent } from "../HomePage/actions";
//lib
import _ from "lodash";

import BookingDetailInfo from "../../components/BookingDetailInfo";
import BookingActivities from "../../components/BookingActivities";
import { urlLink } from "../../helper/route";


/* eslint-disable react/prefer-stateless-function */
export class CurrentDrive extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    this.props.getDriveCurrent()
      .then((res) => {
        if (res) {
          const { _id = "" } = res;
          this.props.changeStoreDataHome("currentJobId", _id);
        }
      });
  }

  render() {
    const { showStatus = false } = this.props;
    const { currentDrive = {} } = this.props.currentDrive;
    let activities = [];
    if (currentDrive) {
      let { activities: activitiesAPI = [] } = currentDrive;
      activities = activitiesAPI;
    }
    return (
      <div className={"current-drive-wrapper offer-detail-wrapper"}>
        <Helmet>
          <title>Current Drive</title>
          <meta name="description" content="Description of CurrentDrive"/>
        </Helmet>
        {!_.isEmpty(currentDrive) ?
          <div className={"current-drive-wrapper"}>
            <div className={"row"}>
              <div className={"col-md-7"}>
                <BookingDetailInfo jobDetail={currentDrive} showStatus={showStatus}/>
              </div>
              <div className={"col-md-5"}>
                {/* TODO: view price component */}
              </div>
              <div className={"col-md-12"}>
                <BookingActivities activities={activities}
                                   actActivity={(idActivity, link) => {
                                     this.props.actActivity(idActivity, link)
                                       .then(() => {
                                         const { params = {} } = this.props.currentDrive;
                                         this.props.getDriveCurrent(params);
                                       });
                                   }}/>
              </div>
            </div>

          </div> :
          <div className={"no-data"}>
            <h4>You have not requested any jobs or have not been accepted by the user.
              Please <span className={"color-blue cursor-pointer"}
                           onClick={() => {
                             this.props.history.push(urlLink.newOffers);
                           }}>Request for a ride</span> or waiting for user acceptance
            </h4>
          </div>
        }
      </div>
    );
  }
}

CurrentDrive.propTypes = {
  getDriveCurrent: PropTypes.func,
  changeStoreDataHome: PropTypes.func,
  actActivity: PropTypes.func,
  showStatus: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  currentDrive: makeSelectCurrentDrive()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreDataHome: (key, value) => {
      dispatch(changeStoreDataHome(key, value));
    },
    getDriveCurrent: params => {
      return new Promise((resolve, reject) => {
        dispatch(getDriveCurrent(params, resolve, reject));
      });
    },
    actActivity: (activityId, key) => {
      return new Promise((resolve, reject) => {
        dispatch(actActivityBooking(activityId, key, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "currentDrive", reducer });
const withSaga = injectSaga({ key: "currentDrive", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(CurrentDrive);
