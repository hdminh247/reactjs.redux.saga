/**
 *
 * RecommendRideItem
 *
 */

import React from "react";
import "./styles.scss";
import BaseButton from "../BaseButton";
import humanizeDuration from "humanize-duration";
import PropTypes from "prop-types";
import InfoForm from "../InfoForm";
import { PriceFormatter } from "../TableFormatter";

// import styled from 'styled-components';

function RecommendRideItem(props) {
  const {
    pickupLocation = {},
    destination = [],
    distance = "",
    duration = "",
    vanSize = 0,
    total = { value: 0, unit: "$" },
    onBookNow = () => {
    }
  } = props;

  return (
    <div className={"recommend-ride-item"}>
      <div className={"bg-grey"}>
        <div className={"d-table table-responsive"}>
          <div className={"d-table-cell align-middle"}>
            <InfoForm content={humanizeDuration(duration * 1000, { largest: 1 })} classNameIcon={"icon-calendar1"}/>
            <InfoForm content={distance + " km"} classNameIcon={"icon-calendar1"}/>
            <InfoForm content={vanSize + " people"} classNameIcon={"icon-ui-interface-user-user-interface-accesability-help"}/>
          </div>
          <div className={"d-table-cell align-middle text-right"}>
            <div className={"price"}>{PriceFormatter(total)}</div>
          </div>
        </div>
        <div className={"line-break"}/>

        {pickupLocation && pickupLocation.name &&
        <div className={"address-wrapper content d-flex"}>
          <i className={"icon color-blue icon-circle1"}/>
          <span className={"address"}>{pickupLocation.name}</span>
        </div>
        }

        {destination.length > 0 && destination.map((des, index) => {
          const { name = "" } = des;
          return (
            <div key={index} className={"address-wrapper content d-flex"}>
              <i className={"icon color-orange icon-address"}/>
              <span className={"address"}>{name}</span>
            </div>);
        })}
      </div>
      <BaseButton color={"primary"}
                  className={"btn-block"}
                  content={"Book now"}
                  onClick={() => {
                    onBookNow({ ...props });
                  }}/>
    </div>
  );
}

RecommendRideItem.propTypes = {
  onBookNow: PropTypes.func
};

export default RecommendRideItem;
