/**
 *
 * BiddingDrive
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
import makeSelectBiddingDrive from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { DateFormatter, PriceFormatter } from "../../components/TableFormatter";
import { urlLink } from "../../helper/route";
import { deleteJobRequest, getDriveBiddingList } from "../HomePage/actions";
import TableBase from "../../components/TableBase";

/* eslint-disable react/prefer-stateless-function */
export class BiddingDrive extends React.PureComponent {
  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.biddingDrive;

    this.props.getDriveCurrent(params);
  }

  render() {
    const { pagination = {}, params = {}, dataList = [] } = this.props.biddingDrive;

    const columns = [
      {
        label: "BOOKING ID",
        dataField: "jobId",
        dataSort: true,
        dataAlign: "",
        className: "booking-id",
        dataFormat: (cell, row) => {

          const { job: { jobId = "" } } = row;
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
          const { address = "" } = cell;
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
        label: "CLIENT NAMED",
        dataField: "job",
        dataAlign: "",
        className: "",
        dataFormat: (cell, row) => {
          const { createdBy = {}, createdBy: { firstName = "", lastName = "" } } = cell;
          return createdBy && (`${firstName} ${lastName}`);
        }
      },
      {
        label: "BIDDING PRICE",
        dataField: "total",
        dataAlign: "",
        className: "",
        dataFormat: (cell, row) => {
          return PriceFormatter(cell);
        }
      },
      {
        label: "STATUS",
        dataField: "active",
        dataAlign: "",
        className: "status"

      }
    ];
    return (
      <div className={"bidding-drive-wrapper"}>
        <Helmet>
          <title>Bidding Drive</title>
          <meta name="description" content="Description of CurrentDrive"/>
        </Helmet>
        <TableBase
          title={`Bidding drive`}
          model="booking"
          tableData={dataList}
          tableOptions={{
            noDataText: <div>There are no bidding drive right now. Please <span className={"cursor-pointer color-blue"}
                                                                                onClick={() => {
                                                                                  this.props.history.push(urlLink.newOffers);
                                                                                }}>Request for a ride</span> or waiting for user acceptance.</div>
          }}
          tableColumn={columns}
          baseParams={params}
          isSearch
          actions={{
            view: {
              label: "View",
              act: (row) => {
                const { job = {} } = row;
                const { _id = "" } = job;
                this.props.history.push(`${urlLink.offerDetail.replace(":id", _id)}`);
              }
            },
            withDraw: {
              label: "Withdraw",
              className: "cancel",
              act: (row) => {
                const { _id = "", job = {} } = row;
                const { _id: jobId = "" } = job;
                this.props.deleteJobRequest({ jobId, jobRequestIdArr: [_id] });
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

BiddingDrive.propTypes = {
  getDriveCurrent: PropTypes.func,
  deleteJobRequest: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  biddingDrive: makeSelectBiddingDrive()
});

function mapDispatchToProps(dispatch) {
  return {
    getDriveCurrent: params => {
      return new Promise((resolve, reject) => {
        dispatch(getDriveBiddingList(params, resolve, reject));
      });
    },
    deleteJobRequest: params => {
      return new Promise((resolve, reject) => {
        dispatch(deleteJobRequest(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "biddingDrive", reducer });
const withSaga = injectSaga({ key: "biddingDrive", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(BiddingDrive);
