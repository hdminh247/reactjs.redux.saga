/**
 *
 * HistoryDrive
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
import makeSelectHistoryDrive from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { urlLink } from "../../helper/route";
import TableBase from "../../components/TableBase";
import { CustomerFormat, DateFormatter, PriceFormatter } from "../../components/TableFormatter";
import { getDriveHistoryList } from "../HomePage/actions";

/* eslint-disable react/prefer-stateless-function */
export class HistoryDrive extends React.PureComponent {
  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.historyDrive;

    this.props.getDriveCurrent(params);
  }

  render() {
    const { pagination = {}, params = {}, dataList = [] } = this.props.historyDrive;
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
        label: "PICK UP",
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
        label: "DROP OFF",
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
        dataField: "createdBy",
        dataAlign: "",
        className: "",
        dataFormat: (cell) => {
          return CustomerFormat(cell);
        }
      },
      {
        label: "TOTAL PRICE",
        dataField: "estimation",
        dataAlign: "",
        className: "",
        dataFormat: (cell) => {
          return PriceFormatter(cell);
        }
      },
      {
        label: "PAYMENT",
        dataField: "paymentStatus",
        dataAlign: "",
        className: "payment"
      }
    ];
    return (
      <div>
        <Helmet>
          <title>History Drive</title>
          <meta name="description" content="Description of HistoryDrive"/>
        </Helmet>
        <TableBase
          title={``}
          model="booking"
          tableData={dataList}
          tableColumn={columns}
          baseParams={params}
          isSearch
          tableOptions={{
            noDataText: <div>You have not completed any drive, please finish your <span className={"cursor-pointer color-blue"}
                                                                                        onClick={() => {
                                                                                          this.props.history.push(urlLink.currentDrive);
                                                                                        }}>current drive</span>.</div>
          }}
          actions={{
            view: {
              label: "View",
              act: (row) => {
                const { _id = "" } = row;
                this.props.history.push(urlLink.historyDriveDetail.replace(":id", _id));
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

HistoryDrive.propTypes = {
  getDriveCurrent: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  historyDrive: makeSelectHistoryDrive()
});

function mapDispatchToProps(dispatch) {
  return {
    getDriveCurrent: params => {
      return new Promise((resolve, reject) => {
        dispatch(getDriveHistoryList(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "historyDrive", reducer });
const withSaga = injectSaga({ key: "historyDrive", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HistoryDrive);
