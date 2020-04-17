/**
 *
 * BookingsDetail
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import "./styles.scss";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectBookingsDetail from "./selectors";
import reducer, { initialState } from "./reducer";
import saga from "./saga";
import _ from "lodash";
import {
  actActivityBooking,
  changeStoreData as changeStoreDataHome,
  deleteJobRequest,
  getCreditCardConfirm,
  getJobDetail,
  getJobRequestList,
  ratingAndReview,
  requestPaypalCapture,
  requestPaypalOrder
} from "../HomePage/actions";
import BookingDetailInfo from "../../components/BookingDetailInfo";
import DestinationDetailInfo from "../../components/DestinationDetailInfo";
import BookingActivities from "../../components/BookingActivities";
import { AvatarFormatter, PriceFormatter, RatingFormatter } from "../../components/TableFormatter";
import TableBase from "../../components/TableBase";
import ConfirmPopup from "../../components/ConfirmPopup";
import { changeStoreData } from "./actions";
import ConfirmPaymentPopup from "../../components/ConfirmPaymentPopup";
import { makeSelectCurrentUser } from "../App/selectors";
import RatingPopup from "../../components/RatingPopup";

import DriverWithRatingBox from "../../components/DriverWithRatingBox";
import PaymentJobDetailBox from "../../components/PaymentJobDetailBox";
import Payment from "../Payment";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const columns = [
  {
    label: "NO.",
    dataField: "jobRequestId",
    dataSort: true,
    dataAlign: "",
    className: ""
  },
  {
    label: "PROFILE PIC",
    dataField: "fromUser",
    dataSort: false,
    dataAlign: "",
    className: "avatar",
    dataFormat: (cell, row) => {
      return AvatarFormatter(cell, row, "avatar");
    }
  },
  {
    label: "DRIVER NAME",
    dataField: "fromUser",
    dataSort: true,
    dataAlign: "",
    className: "",
    dataFormat: (cell, row) => {
      const { firstName = "", lastName = "" } = cell;
      return `${firstName} ${lastName}`;
    }
  },
  {
    label: "RATINGS",
    dataField: "rating",
    dataSort: true,
    dataAlign: "",
    className: "rating",
    dataFormat: (cell, row) => {
      return RatingFormatter(cell);
    }
  },
  {
    label: "PRICE",
    dataField: "total",
    dataSort: true,
    dataAlign: "",
    className: "",
    dataFormat: (cell, row) => {
      return PriceFormatter(cell);
    }
  },
  {
    label: "VEHICLES",
    dataField: "vehicle",
    dataAlign: "",
    className: "",
    dataFormat: (cell, row) => {
      const { vehicle = {} } = row;
      const { name = "" } = vehicle;

      return name;
    }
  }
];
var thisBookingsDetail;

/* eslint-disable react/prefer-stateless-function */
export class BookingsDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    thisBookingsDetail = this;

  }

  getDataBookingDetail(id) {
    this.props.getDetail(id)
      .then((res) => {
        // console.log("RESPONSE JOB DETAIL RES", res);
        const { status = [], _id = "" } = res;
        const statusTemp = status.reverse();
        const [{ key: keyStatusLast = "" }] = statusTemp;
        this.props.changeStoreDataHome("currentJobId", _id);
        this.props.changeStoreData("currentStatusJob", keyStatusLast);
        console.log("keyStatusLast", keyStatusLast);
        if (keyStatusLast === "new_lead") {
          const { paramsJobRequestList: params = {} } = this.props.bookingsDetail;
          this.props.getJobRequestList(params);
        }
      });
  }

  UNSAFE_componentWillMount() {
    const { id = "" } = thisBookingsDetail.props.match.params;
    this.getDataBookingDetail(id);

    console.log("SOCKET IN SERVICE IN BOOKING DETAIL PAGE", socketInstance.socket);

  }

  handleChangePayment = () => {
    // this.props.history.push(urlLink.payment);
    this.props.changeStoreData("changePaymentPopup", true);
    this.props.changeStoreData("confirmPayment", false);
  };

  renderDetailDriverRequest = () => {
    const { jobRequestList = [], paramsJobRequestList = {} } = this.props.bookingsDetail;

    return (
      <TableBase
        title={`Driver Request`}
        model="booking"
        tableData={jobRequestList}
        tableColumn={columns}
        baseParams={paramsJobRequestList}
        isSearch
        actions={{
          accept: {
            label: "Accept",
            act: (row) => {
              const { _id = "", fromUser = { firstName: "", lastName: "" } } = row;
              this.props.changeStoreData("confirmDriver", true);
              this.props.changeStoreData("jobRequestSelected", row);
            }
          },
          decline: {
            label: "Decline",
            act: (row) => {
              console.log("Decline");
              const { _id = "" } = row;
              const { id: jobId = "" } = this.props.match.params;
              this.props.deleteJobRequest({
                jobId,
                jobRequestIdArr: [_id]
              })
                .then(() => {
                  this.getDataBookingDetail(jobId);
                });
            }
          }
        }}
        onChangeParams={params => {
          this.props.getJobRequestList(params);
        }}
      />);
  };

  renderContentPayment = (jobRequestSelected, currentUser) => {
    const {
      total = { value: 0, unit: "$" },
      pickupLocation: {
        name: pickUpName = ""
      },
      destination = [{}]
    } = jobRequestSelected;

    const { paymentAccount = {} } = currentUser;
    const { cards = [{ _id: "", lastDigits: "" }], method = "paypal" } = paymentAccount;
    let lastDigits = "";
    if (!_.isEmpty(cards))
      [{ lastDigits = "" }] = cards;

    //get latest destination in array
    const [{ name: desName = "" }] = destination.reverse();
    return (
      <div className={"inner-content"}>
        <div>Your transaction</div>
        <div className={"price"}>{PriceFormatter(total)}</div>
        <div className={"description"}>for The tour from {pickUpName} to {desName} will be sent to Thai Mobility via
        </div>
        {method === "credit_card" ?
          <div className={"payment credit-card"}>
            <img src={"visa.svg"} alt={"visa"}/> **** **** **** {lastDigits} <span className={"change cursor-pointer"}
                                                                                   onClick={() => {
                                                                                     this.handleChangePayment();
                                                                                   }}>Change</span>
          </div>
          :
          <div className={"payment paypal"}>
            You need to login to your Paypal account whenever offer for a drive!
            <span className={"change cursor-pointer"} onClick={() => {
              this.handleChangePayment();
            }}>Change</span>
          </div>
        }
      </div>
    );
  };


  render() {
    // console.log("BookingsDetail PROPS", this.props);
    const { id = "" } = this.props.match.params;
    const {
      bookingsDetail = {},
      currentUser = {},
      showStatus = false
    } = this.props;

    const {
      currentStatusJob = "",
      jobDetail: {
        activities = [], _id: jobId = "",
        rating = {}, assignedCompany = {},
        earningAndPayment = {}
      },
      confirmDriver = false,
      confirmPayment = false,
      changePaymentPopup = false,
      jobRequestSelected = {},
      jobRequestSelected: {
        _id: jobRequestId = "",
        fromUser: { firstName = "", lastName = "" }
      },
      isFirstJob = false,
      showRating = false,
      apiError = [],
      ratingList = [],
      idActivity = "",
      link = ""
    } = this.props.bookingsDetail;
    const { paymentAccount = {} } = currentUser;
    const { cards = [{ _id: "" }], method = "paypal" } = paymentAccount;
    const { ownedBy = {} } = assignedCompany;

    let cardId = "";
    if (!_.isEmpty(cards))
      [{ _id: cardId = "" }] = cards;
    return (
      <div className={"bookings-detail-wrapper"}>
        <Helmet>
          <title>Bookings Detail</title>
          <meta
            name="description"
            content="Description of BookingsDetail"
          />
        </Helmet>
        <div className={"row section-top"}>
          <div className={"col-sm-6"}>
            <BookingDetailInfo {...bookingsDetail} hideDriver={currentStatusJob === "completed"}
                               showStatus={showStatus}/>
          </div>
          <div className={"col-sm-6"}>
            <DestinationDetailInfo {...bookingsDetail} />
          </div>
        </div>

        {currentStatusJob !== "completed" && <BookingActivities activities={activities}
                                                                actActivity={(idActivity, link) => {
                                                                  if (link.indexOf("rating") >= 0) {
                                                                    this.props.changeStoreData("showRating", true);
                                                                    this.props.changeStoreData("idActivity", idActivity);
                                                                    this.props.changeStoreData("link", link);
                                                                  } else {
                                                                    this.props.actActivity(idActivity, link)
                                                                      .then((res) => {
                                                                        const { id = "" } = this.props.match.params;
                                                                        this.getDataBookingDetail(id);
                                                                      });
                                                                  }
                                                                }}/>}

        <div className={"line-break"}/>

        <div className={"row"}>
          <div className={"col-md-4"}>
            {currentStatusJob === "completed" && <DriverWithRatingBox {...ownedBy}
                                                                      isRated={!_.isEmpty(rating)}
                                                                      rating={rating}
                                                                      activities={activities}
                                                                      onRating={(idActivity, link) => {
                                                                        this.props.changeStoreData("showRating", true);
                                                                        this.props.changeStoreData("idActivity", idActivity);
                                                                        this.props.changeStoreData("link", link);
                                                                      }}/>}
          </div>
          <div className={"col-md-8"}>
            {currentStatusJob === "completed" && <PaymentJobDetailBox {...earningAndPayment} />}
          </div>
        </div>
        {/* TABLE DRIVER REQUEST */}
        {currentStatusJob === "new_lead" && this.renderDetailDriverRequest()}

        <ConfirmPopup visible={confirmDriver}
                      confirmText={"Submit"}
                      cancelText={"Cancel"}
                      title={"Accept Driver"}
                      content={<div>You have been accept request from driver {firstName} {lastName}.
                        {isFirstJob && "By clicking submit you have to pay 50% for the first drive."}
                      </div>}
                      onSubmit={() => {
                        this.props.changeStoreData("confirmDriver", false);
                        this.props.changeStoreData("confirmPayment", true);
                      }}
                      onCancel={(value) => {
                        this.props.changeStoreData("confirmDriver", value);
                        this.props.changeStoreData("jobRequestSelected", initialState.get("jobRequestSelected"));
                      }}
        />
        <ConfirmPaymentPopup visible={confirmPayment}
                             confirmText={"Confirm"}
                             cancelText={"Cancel"}
                             method={method}
                             content={this.renderContentPayment(jobRequestSelected, currentUser)}
                             onSubmit={() => {
                               this.props.changeStoreData("confirmPayment", false);
                               this.props.paymentCreditCard(
                                 {
                                   jobId: id,
                                   jobRequestId,
                                   cardId
                                 }
                               ).then(() => {
                                 const { id = "" } = this.props.match.params;
                                 this.getDataBookingDetail(id);
                               });
                             }}
                             onCancel={(value) => {
                               this.props.changeStoreData("confirmPayment", value);
                             }}
                             onCreateOrder={() => {
                               return this.props.paypalCreateOrder(
                                 {
                                   jobId: id,
                                   jobRequestId
                                 }
                               ).then(res => {
                                 const { orderId = "" } = res;
                                 return orderId;
                               });
                             }}
                             onApprove={() => {
                               return this.props.paypalCapture(
                                 {
                                   jobId: id,
                                   jobRequestId
                                 }
                               ).then(res => {
                                 const { id = "" } = this.props.match.params;
                                 this.props.changeStoreData("confirmPayment", false);
                                 this.getDataBookingDetail(id);
                                 return res;
                               });
                             }}
        />

        <Modal className={"modal-change-payment-popup-wrapper"} isOpen={changePaymentPopup} centered={true}>
          <ModalHeader toggle={() => {
            this.props.changeStoreData("changePaymentPopup", !changePaymentPopup);
            this.props.changeStoreData("confirmPayment", true);
          }}>Change Payment Method
          </ModalHeader>
          <ModalBody>
            <Payment textSubmit={"Change"} onClosePopup={() => {
              this.props.changeStoreData("changePaymentPopup", false);
              this.props.changeStoreData("confirmPayment", true);
            }}/>
          </ModalBody>
        </Modal>

        <RatingPopup
          {...this.props.bookingsDetail}
          visible={showRating}
          apiError={apiError}
          ratingList={ratingList}
          toggle={value => {
            this.props.changeStoreData("showRating", !value);
            this.props.changeStoreData("ratingList", initialState.get("ratingList"));
          }}
          ratingDriver={(list) => {
            this.props.changeStoreData("ratingList", list);
          }}
          onSubmit={formData => {
            console.log(formData);
            this.props.ratingAndReview(idActivity, link, formData)
              .then(() => {
                const { id = "" } = this.props.match.params;
                this.props.changeStoreData("showRating", false);
                this.getDataBookingDetail(id);
              });
          }}

        />
      </div>
    );
  }
}

BookingsDetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  getJobRequestList: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeStoreDataHome: PropTypes.func,
  paymentCreditCard: PropTypes.func,
  paypalCreateOrder: PropTypes.func,
  paypalCapture: PropTypes.func,
  actActivity: PropTypes.func,
  deleteJobRequest: PropTypes.func,
  showStatus: PropTypes.bool,
  ratingAndReview: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  bookingsDetail: makeSelectBookingsDetail(),
  currentUser: makeSelectCurrentUser()
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
      return new Promise((resolve, reject) => {
        dispatch(getJobDetail(id, resolve, reject));
      });
    },
    getJobRequestList: params => {
      return new Promise((resolve, reject) => {
        dispatch(getJobRequestList(params, resolve, reject));
      });
    },
    paypalCreateOrder: data => {
      return new Promise((resolve, reject) => {
        dispatch(requestPaypalOrder(data, resolve, reject));
      });
    },
    paypalCapture: data => {
      return new Promise((resolve, reject) => {
        dispatch(requestPaypalCapture(data, resolve, reject));
      });
    },
    paymentCreditCard: data => {
      return new Promise((resolve, reject) => {
        dispatch(getCreditCardConfirm(data, resolve, reject));
      });
    },
    actActivity: (activityId, key, formData) => {
      return new Promise((resolve, reject) => {
        dispatch(actActivityBooking(activityId, key, formData, resolve, reject));
      });
    },
    deleteJobRequest: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteJobRequest(params, resolve, reject));
      });
    },
    ratingAndReview: (idActivity, link, formData) => {
      return new Promise((resolve, reject) => {
        dispatch(ratingAndReview(idActivity, link, formData, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "bookingsDetail", reducer });
const withSaga = injectSaga({ key: "bookingsDetail", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(BookingsDetail);
