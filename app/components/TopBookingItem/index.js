/**
 *
 * TopBookingItem
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./styles.scss";
import Rating from "../Rating";
import { PriceFormatter } from "../TableFormatter";

function TopBookingItem(props) {
  const {
    name = "2017-BMW-7",
    avgRating = {},
    luggage = 0,
    vanSize = 0,
    unit = "$",
    images = [""],
    price = {}
  } = props;
  const [image = ""] = images;
  const { rating: star = 0, countRating = 0 } = avgRating;
  return (
    <div className={"top-booking-item"}>
      {/*<FormattedMessage {...messages.header} />*/}
      <div className={"top"}>
        <img className={"image"}
             src={image}
             onError={e => {
               e.target.onerror = null;
               e.target.src = "./missing-car.png";
             }}
             alt={"top-booking-item"}/>
        <div className={"name"}>{name}</div>
        <Rating value={parseInt(star)}/><span className={"star"}>{parseInt(countRating)}</span>
      </div>
      <div className={"below"}>
        <div className={"row"}>
          <div className={"col"}>
            <div className={"luggage"}>
              <div className={"icon icon-travel-bag-1"}/>
              {luggage}
            </div>
            <div className={"seat"}>
              <div className={"icon icon-car-seatbelt"}/>
              {vanSize} Seats
            </div>
          </div>
          <div className={"col text-right"}>
            <div className={"price"}>{PriceFormatter(price)}</div>
            <div className={"per-day"}>per job</div>
          </div>
        </div>
      </div>
    </div>
  );
}

TopBookingItem.propTypes = {};

export default TopBookingItem;
