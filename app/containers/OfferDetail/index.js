/**
 *
 * OfferDetail
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
import makeSelectOfferDetail from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { changeStoreData as changeStoreDataHome, getDriverVehicleList, getJobDetail, requestOffer } from "../HomePage/actions";
import { changeStoreData } from "./actions";
import BookingDetailInfo from "../../components/BookingDetailInfo";
import DestinationDetailInfo from "../../components/DestinationDetailInfo";
import OfferYourRide from "../../components/OfferYourRide";
import ConfirmPopup from "../../components/ConfirmPopup";

/* eslint-disable react/prefer-stateless-function */
export class OfferDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.formikRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    const { id = "" } = this.props.match.params;
    const { paramsDriverVehicleList = {} } = this.props.offerDetail;
    this.props.getDetail(id).then((res) => {
      const { category = {}, _id = "" } = res;
      this.props.changeStoreDataHome("currentJobId", _id);
      const { key: categoryKey = "" } = category;
      this.props.getDriverVehicleList({ ...paramsDriverVehicleList, categoryKey });
    });

  }

  render() {
    const { offerDetail = {} } = this.props;
    const { id = "" } = this.props.match.params;
    const { showConfirm = false, dataSubmit = {} } = this.props.offerDetail;
    return (
      <div className={"offer-detail-wrapper detail-page-wrapper"}>
        <Helmet>
          <title>Offer Detail</title>
          <meta name="description" content="Description of OfferDetail"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-8"}>
              <BookingDetailInfo {...offerDetail} />
              <DestinationDetailInfo {...offerDetail}/>
            </div>
            <div className={"col-lg-4"}>
              <OfferYourRide {...offerDetail}
                             formikRef={this.formikRef}
                             onSubmit={(values, resetForm) => {
                               this.props.changeStoreData("showConfirm", true);
                               this.props.changeStoreData("dataSubmit", { ...values, jobId: id });
                               // this.props.requestOffer({ ...values, jobId: id });
                             }}/>
            </div>
          </div>
        </div>

        <ConfirmPopup visible={showConfirm}
                      confirmText={"Confirm"}
                      className={"confirm-drive-wrapper"}
                      title={"Request to Drive"}
                      content={"Your request will be sent to a customer and waiting for customer acceptance"}
                      cancelText={"Cancel"}
                      onSubmit={() => {
                        this.props.requestOffer(dataSubmit)
                          .then(() => {
                            this.props.changeStoreData("showConfirm", false);
                            console.log(this.formikRef.current);
                            this.formikRef.current.resetForm();
                          })
                          .catch(() => {
                            this.props.changeStoreData("showConfirm", false);
                          });
                      }}
                      onCancel={() => {
                        this.props.changeStoreData("showConfirm", false);
                      }}
        >
        </ConfirmPopup>
      </div>
    );
  }
}

OfferDetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  getDriverVehicleList: PropTypes.func,
  requestOffer: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeStoreDataHome: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  offerDetail: makeSelectOfferDetail()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeStoreDataHome: (key, value) => {
      dispatch(changeStoreDataHome(key, value));
    },
    getDetail: id => {
      // OFFER IS CORRECTLY JOB
      return new Promise((resolve, reject) => {
        dispatch(getJobDetail(id, resolve, reject));
      });
    },
    getDriverVehicleList: params => {
      // OFFER IS CORRECTLY JOB
      return new Promise((resolve, reject) => {
        dispatch(getDriverVehicleList(params, resolve, reject));
      });
    },
    requestOffer: params => {
      // OFFER IS CORRECTLY JOB
      return new Promise((resolve, reject) => {
        dispatch(requestOffer(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "offerDetail", reducer });
const withSaga = injectSaga({ key: "offerDetail", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(OfferDetail);
