/**
 *
 * Notification
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
import makeSelectNotification from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { urlLink } from "../../helper/route";
import TableBase from "../../components/TableBase";
import { makeSelectlistNotiDataHomePage, makeSelectNotificationListDataHomePage, makeSelectParamsNotificationListDataHomePage } from "../HomePage/selectors";
import { deleteNotifications, getNotificationList, readNotifications } from "../HomePage/actions";
import NotificationItem from "../../components/NotificationItem";

/* eslint-disable react/prefer-stateless-function */
export class Notification extends React.PureComponent {
  render() {
    const { notificationList = [], paramsNotificationList = {} } = this.props;
    const { params = {} } = this.props.notification;
    const columns = [
      {
        label: "",
        dataField: "content",
        dataSort: true,
        dataAlign: "",
        className: "content-wrapper",
        dataFormat: (cell, row) => {
          const { content = "", createdAt = "", status = "unread", link = "" } = row;
          return (<NotificationItem {...row}/>);
        }
      },
      {
        label: <div className={"actions"}>
          <span className={"cursor-pointer"}
                          onClick={() => {
                            let notiIdArr = notificationList.map(noti => {
                              const { _id = "" } = noti;
                              return _id;
                            });
                            this.props.deleteNotifications({ notiIdArr })
                              .then(() => {
                                this.props.getNotificationList(paramsNotificationList);
                              });
                          }}>Delete all notifications</span> |
          <span className={"cursor-pointer"}
                onClick={() => {
                  let notiIdArr = notificationList.map(noti => {
                    const { _id = "" } = noti;
                    return _id;
                  });
                  this.props.readNotifications({ notiIdArr })
                    .then(() => {
                      this.props.getNotificationList(paramsNotificationList);
                    });
                }}>Mark all as read</span></div>,
        headerAlign: "right",
        headerClassName: "actions",
        dataField: "_id",
        dataAlign: "right",
        className: "actions",
        thStyle: { "textTransform": "none" },
        width: "20%",
        dataFormat: (cell, row) => {
          return <div className={""}>
            <button className={"btn btn-delete"} onClick={() => {
              const { _id = "" } = row;
              this.props.deleteNotifications({ notiIdArr: [_id] })
                .then(() => {
                  this.props.getNotificationList({});
                });
            }}>Delete
            </button>
            <button className={"btn btn-read"} onClick={() => {
              const { _id = "" } = row;
              this.props.readNotifications({ notiIdArr: [_id] })
                .then(() => {
                  this.props.getNotificationList({});
                });
            }}>Mark at read
            </button>
          </div>;
        }
      }
    ];
    return (
      <div className={"notification-wrapper"}>
        <Helmet>
          <title>Notification</title>
          <meta name="description" content="Description of Notification"/>
        </Helmet>
        <div className={"container"}>
          <div className={"title"}>My notifications</div>
          <TableBase
            model={"notification"}
            tableData={notificationList}
            tableColumn={columns}
            baseApi={urlLink.currentBookings}
            baseParams={params}
            addModel={() => {
              this.props.history.push(urlLink.addUser);
            }}
            statusModel={(params, users) => {

              this.props.changeStatus(params, users);
            }}
            removeModel={(params, users, reason) => {

            }}
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

Notification.propTypes = {
  getNotificationList: PropTypes.func,
  readNotifications: PropTypes.func,
  deleteNotifications: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
  notificationList: makeSelectNotificationListDataHomePage(),
  paramsNotificationList: makeSelectParamsNotificationListDataHomePage()
});

function mapDispatchToProps(dispatch) {
  return {
    getNotificationList: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(getNotificationList(params, resolve, reject));
      });
    },
    readNotifications: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(readNotifications(params, resolve, reject));
      });
    },
    deleteNotifications: (notiIdArr) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteNotifications(notiIdArr, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "notification", reducer });
const withSaga = injectSaga({ key: "notification", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Notification);
