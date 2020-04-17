/**
 *
 * CurrentBookings
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import config from "config";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectCurrentBookings from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import TableBase from "../../components/TableBase";
import { urlLink } from "../../helper/route";
import { actActivityBooking, changeStoreData as changeStoreDataHome, getCurrentBookings } from "../HomePage/actions";
import { DateFormatter } from "../../components/TableFormatter";

/* eslint-disable react/prefer-stateless-function */
export class CurrentBookings extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.currentBookings;
    this.props.getCurrentBookings(params);
  }


  render() {
    const {
      pagination = {},
      params = {},
      dataPendingList = [],
      dataConfirmedList = [],
      typeBooking = ""
    } = this.props.currentBookings;

    const columnsPending = [
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
          const { pickupLocation = { address: "" } } = row;
          return pickupLocation && pickupLocation.address;
        }
      },
      {
        label: "DROP OFF LOCATION",
        dataField: "destination",
        dataSort: true,
        dataAlign: "",
        className: "destination",
        dataFormat: (cell, row) => {
          const { destination = [] } = row;
          return destination.map(des => {
            const { address = "" } = des;
            return address;
          }).join(`<b class="color-blue"> -> </b>`);
        }
      },
      {
        label: "DATE & TIME",
        dataField: "checkIn",
        dataSort: true,
        dataAlign: "",
        className: "date",
        dataFormat: (cell, row) => {
          return <DateFormatter date={cell} format={"DD/MM/YYYY, HH:mm"}/>;
        }
      },
      {
        label: "DRIVER BIDING",
        dataField: "driverBiding",
        dataAlign: "",
        className: "",
        dataFormat: (cell, row) => {
          return `${cell} driver${cell >= 2 ? "s" : ""}`;
        }
      },
      {
        label: "STATUS",
        dataField: "active",
        dataAlign: "",
        className: "status",
        dataFormat: () => {
          return <div className={`status-action pending`}>Pending</div>;
        }
      }
    ];
    const columnsConfirmed = [
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
          const { pickupLocation = { address: "" } } = row;
          return pickupLocation && pickupLocation.address;
        }
      },
      {
        label: "DROP OFF LOCATION",
        dataField: "destination",
        dataSort: true,
        dataAlign: "",
        className: "destination",
        dataFormat: (cell, row) => {
          const { destination = [] } = row;
          return destination.map(des => {
            const { address = "" } = des;
            return address;
          }).join(`<b class="color-blue"> -> </b>`);
        }
      },
      {
        label: "DATE & TIME",
        dataField: "checkIn",
        dataSort: true,
        dataAlign: "",
        className: "date",
        dataFormat: (cell, row) => {
          return <DateFormatter date={cell} format={"DD/MM/YYYY, HH:mm"}/>;
        }
      },
      {
        label: "DRIVER NAMED",
        dataField: "company",
        dataAlign: "",
        className: "",
        dataFormat: (cell, row) => {
          const { driverName = "" } = row;
          return driverName;
        }
      },
      {
        label: "STATUS",
        dataField: "active",
        dataAlign: "",
        className: "status",
        dataFormat: () => {
          return <div className={`status-action confirmed`}>Confirmed</div>;
        }
      }
    ];

    return (
      <div className={"current-bookings-wrapper"}>
        <TableBase
          title={`Upcoming Booking`}
          model="booking"
          isSearch
          tableData={dataConfirmedList.data}
          tableColumn={columnsConfirmed}
          baseParams={params}
          tableOptions={{
            noDataText: <div>There are no booking right now. Go and <span className={"cursor-pointer color-blue"}
                                                                          onClick={() => {
                                                                            this.props.history.push(urlLink.booking);
                                                                          }}>booking for a ride</span> with us.</div>
          }}
          actions={{
            view: {
              label: "View",
              act: (row) => {
                const { _id = "" } = row;
                this.props.history.push(urlLink.currentBookingsDetail.replace(":id", _id));
              }
            },
            cancel: {
              label: "Cancel",
              act: (row) => {
                const { activities = [] } = row;
                const [{ _id = "" }] = activities;

                this.props.actActivityBooking(_id, config.api.job.prefixActivity + "cancel")
                  .then(() => {
                    this.props.getCurrentBookings(params);
                  });
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
            this.props.getCurrentBookings(params);
          }}
          onChangeSelect={selected => {
          }}
        />

        <TableBase
          title={`Pending Booking`}
          model="booking"
          tableData={dataPendingList.data}
          tableColumn={columnsPending}
          baseParams={params}
          tableOptions={{
            noDataText: <div>There are no booking right now. Go and <span className={"cursor-pointer color-blue"}
                                                                          onClick={() => {
                                                                            this.props.history.push(urlLink.booking);
                                                                          }}>booking for a ride</span> with us.</div>
          }}
          actions={{
            view: {
              label: "View",
              act: (row) => {
                const { _id = "" } = row;
                this.props.history.push(urlLink.currentBookingsDetail.replace(":id", _id));
              }
            },
            cancel: {
              label: "Cancel",
              act: (row) => {
                const { activities = [] } = row;
                const [{ _id = "" }] = activities;

                this.props.actActivityBooking(_id, config.api.job.prefixActivity + "cancel")
                  .then(() => {
                    this.props.getCurrentBookings(params);
                  });
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
            this.props.getCurrentBookings(params);
          }}
          onChangeSelect={selected => {
          }}
        />


      </div>
    );
  }
}

CurrentBookings.propTypes = {
  getCurrentBookings: PropTypes.func,
  changeStoreDataHome: PropTypes.func,
  actActivityBooking: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  currentBookings: makeSelectCurrentBookings()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreDataHome: (key, value) => {
      dispatch(changeStoreDataHome(key, value));
    },
    getCurrentBookings: params => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentBookings(params, resolve, reject));
      });
    },
    actActivityBooking: (activityId, key) => {
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

const withReducer = injectReducer({ key: "currentBookings", reducer });
const withSaga = injectSaga({ key: "currentBookings", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(CurrentBookings);
