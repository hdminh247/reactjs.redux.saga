/**
 *
 * NotificationItem
 *
 */

import React from "react";
import "./styles.scss";
import moment from "moment";
import ClassNames from "classnames";

import PropTypes from "prop-types";

// import styled from 'styled-components';

function NotificationItem(props) {
  const {
    content = "", createdAt = "", status = "unread", _id = "", href = "", onClick = () => {
    }
  } = props;
  return (<div className={"notification-item-wrapper"}
               onClick={() => {
                 onClick(_id);
               }}
  >
    <div className={"d-table table-responsive"}>
      <div className={"d-table-cell"}>
        <span className={ClassNames(status, "icon icon-notification1")}/>
      </div>
      <div className={"d-table-cell detail"}>
        <div className={"content"}>
          {content}
          <div>{href && <a href={href} className={"link-blue"}>{href}</a>}</div>
        </div>

        <div className={"time"}>{moment(createdAt).format("HH:mm, DD/MM/YYYY")}</div>
      </div>
    </div>
  </div>);
}

NotificationItem.propTypes = {
  content: PropTypes.string,
  createAt: PropTypes.string,
  status: PropTypes.string,
  _id: PropTypes.string,
  onClick: PropTypes.func
};

export default NotificationItem;
