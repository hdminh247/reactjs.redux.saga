/**
 *
 * HistoryBookings
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectHistoryBookings from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { DateFormatter, RatingFormatter } from "../../components/TableFormatter";
import { urlLink } from "../../helper/route";
import { getHistoryBooking } from "../HomePage/actions";
import TableBase from "../../components/TableBase";

/* eslint-disable react/prefer-stateless-function */
export class HistoryBookings extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.historyBookings;

    this.props.getDriveCurrent(params);
  }

  render() {
    const { pagination = {}, params = {}, dataList = [] } = this.props.historyBookings;

    const columns = [
      {
        label: "BOOKING ID",
        dataField: "bookingId",
        dataSort: true,
        dataAlign: "",
        className: "booking-id",
        dataFormat: (cell, row) => {
          const { jobId = "" } = row;
          return jobId;
        }
      },
      {
        label: "PICK UP LOCATION",
        dataField: "pickupLocation",
        dataSort: true,
        dataAlign: "",
        className: "pickup",
        dataFormat: (cell, row) => {
          const { pickupLocation = {} } = row;
          const { address = "" } = pickupLocation;
          return address;
        }
      },
      {
        label: "DROP OFF LOCATION",
        dataField: "destination",
        dataSort: true,
        dataAlign: "",
        className: "destination",
        dataFormat: (cell, row) => {
          return cell.map(des => {
            const { address = "" } = des;
            return address;
          }).join("->");
        }
      },
      {
        label: "DATE & TIME",
        dataField: "createdAt",
        dataSort: true,
        dataAlign: "",
        className: "date",
        dataFormat: (cell, row) => {
          return <DateFormatter date={cell} format={"DD/MM/YYYY"}/>;
        }
      },
      {
        label: "DRIVER NAMED",
        dataField: "driverName",
        dataSort: true,
        dataAlign: "",
        className: ""
      },
      {
        label: "RATINGS",
        dataField: "rating",
        dataSort: true,
        dataAlign: "",
        className: "rating",
        dataFormat: (cell, row) => {
          const { rating = {} } = row;
          const { avgRating = 0 } = rating;
          return RatingFormatter(avgRating);
        }
      },
      {
        label: "VEHICLES",
        dataField: "vehicle",
        dataSort: true,
        dataAlign: "",
        className: "",
        dataFormat: (cell, row) => {
          if (!_.isEmpty(cell)) {
            const { name = "" } = cell;
            return <div className={`icon`}>{name}</div>;
          } else
            return "";
        }
      },
      {
        label: "STATUS",
        dataField: "currentStatus",
        dataAlign: "",
        className: "status",
        dataFormat: (cell, row) => {
          const { name = "", key = "" } = cell;
          return <div className={`icon ${key}`}>{name}</div>;
        }
      }
    ];

    return (
      <div className={"current-bookings-wrapper"}>
        {/*<FormattedMessage {...messages.header} />*/}
        <TableBase
          title={`History Booking`}
          model="booking"
          tableData={dataList}
          tableColumn={columns}
          baseApi={urlLink.currentBookings}
          baseParams={params}
          isSearch
          tableOptions={{
            noDataText: <div>Your history bookings are empty. Please check status of your <span
              className={"cursor-pointer color-blue"}
              onClick={() => {
                this.props.history.push(urlLink.currentBookings);
              }}>current booking</span> or <span className={"cursor-pointer color-blue"}
                                                 onClick={() => {
                                                   this.props.history.push(urlLink.booking);
                                                 }}>book a trip</span> with us.</div>
          }}
          actions={{
            view: {
              label: "View", act: (row) => {
                const { _id = "" } = row;
                this.props.history.push(urlLink.historyBookingsDetail.replace(":id", _id));
              }
            }
          }}
          addModel={() => {
            this.props.history.push(urlLink.addUser);
          }}
          statusModel={(params, users) => {

            this.props.changeStatus(params, users);
          }}
          removeModel={(params, users, reason) => {

          }}
          // filters={[
          //   {
          //     title: "Status",
          //     field: "active",
          //     type: "selection", //isMulti, isSingle
          //     options: [
          //       {
          //         label: "All",
          //         value: ""
          //       },
          //       {
          //         label: "Confirmed",
          //         value: "confirmed"
          //       },
          //       {
          //         label: "Pending",
          //         value: "pending"
          //       }
          //     ]
          //   }
          // ]}
          onChangeParams={params => {
            this.props.getDriveCurrent(params);
          }}
          onChangeSelect={selected => {
          }}
        />
      </div>
    );
  }
}

HistoryBookings.propTypes = {
  getDriveCurrent: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  historyBookings: makeSelectHistoryBookings()
});

function mapDispatchToProps(dispatch) {
  return {
    getDriveCurrent: params => {
      return new Promise((resolve, reject) => {
        dispatch(getHistoryBooking(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "historyBookings", reducer });
const withSaga = injectSaga({ key: "historyBookings", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HistoryBookings);
