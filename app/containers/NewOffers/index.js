/**
 *
 * NewOffers
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";
import ClassNames from "classnames";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectNewOffers from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { DateFormatter, NameAndImageFormatter, PriceFormatter } from "../../components/TableFormatter";
import { urlLink } from "../../helper/route";
import TableBase from "../../components/TableBase";
import { getOffersList } from "../HomePage/actions";

/* eslint-disable react/prefer-stateless-function */
var thisNewOffers;
export class NewOffers extends React.PureComponent {
  constructor(props) {
    super(props);
    thisNewOffers = this;
  }
  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.newOffers;
    this.props.getDriveCurrent(params);
  }

  render() {
    const { pagination = {}, params = {}, dataList = [] } = this.props.newOffers;
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
        label: "Category",
        dataField: "category",
        dataSort: false,
        dataAlign: "",
        className: "pickup",
        dataFormat: (cell, row) => {
          const { name = "" } = cell || {};
          return name;
        }
      },
      {
        label: "PICK UP LOCATION",
        dataField: "pickupLocation",
        dataSort: true,
        dataAlign: "",
        className: "pickup",
        dataFormat: (cell, row) => {
          const { address = "" } = cell || {};
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
          return <DateFormatter date={cell} format={"HH:mm DD/MM/YYYY"}/>;
        }
      },
      {
        label: "USER OFFER",
        dataField: "createdBy",
        dataSort: true,
        dataAlign: "",
        className: "",
        dataFormat: (cell) => {
          const { avatar = "", firstName = "", lastName = "" } = cell;
          return NameAndImageFormatter(avatar, `${firstName} ${lastName}`);
        }
      },
      {
        label: "ESTIMATE PRICE",
        dataField: "estimationPrice",
        dataSort: true,
        dataAlign: "",
        className: "",
        dataFormat: (cell, row) => {
          const { earningAndPayment = {} } = row;
          const {
            estimation = {
              unit: "$",
              value: 0
            }
          } = earningAndPayment;
          return PriceFormatter(estimation);
        }
      },
      {
        label: "Actions",
        dataField: "action",
        dataSort: false,
        headerAlign: "left",
        dataAlign: "right",
        className: "actions",
        dataFormat: (cell, row) => {
          const { isMatch = false, _id = "" } = row;
          return (
            <button
              className={
                ClassNames("btn btn-green btn-offer"
                  // !temp turn off to go detail
                  // ,{ "disabled": !isMatch }
                )
              }
              disabled={!isMatch}
              onClick={(e) => {
                e.preventDefault();
                this.props.history.push(urlLink.offerDetail.replace(":id", _id));
              }}
            >Offer your ride</button>);
        }
      }
    ];
    return (
      <div className={"new-offers-wrapper"}>
        <Helmet>
          <title>NewOffers</title>
          <meta name="description" content="Description of NewOffers"/>
        </Helmet>
        <div className={"container"}>
          <TableBase
            model="booking"
            tableData={dataList}
            tableColumn={columns}
            pagination={pagination}
            baseApi={urlLink.currentBookings}
            baseParams={params}
            isSearch
            tableOptions={{
              noDataText: <div>There are no offer right now.</div>
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
      </div>
    );
  }
}

NewOffers.propTypes = {
  getDriveCurrent: PropTypes.func

};

const mapStateToProps = createStructuredSelector({
  newOffers: makeSelectNewOffers()
});

function mapDispatchToProps(dispatch) {
  return {
    getDriveCurrent: params => {
      return new Promise((resolve, reject) => {
        dispatch(getOffersList(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "newOffers", reducer });
const withSaga = injectSaga({ key: "newOffers", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(NewOffers);
