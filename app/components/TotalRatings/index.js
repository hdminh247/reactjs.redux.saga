/**
 *
 * TotalRatings
 *
 */

import React from "react";
import "./styles.scss";
import Rating from "react-rating";

import PropTypes from "prop-types";

// import styled from 'styled-components';

function TotalRatings(props) {
  const { value = 0 } = props;
  return (
    <div className={"total-ratings-wrapper"}>
      <label>Total Ratings:</label>
      <div className={"rating-wrapper"}>
        <Rating initialRating={value}
                fractions={2}
                emptySymbol={<span className="icon color-bluey-grey icon-star-full"/>}
                fullSymbol={<span className="icon color-yellow icon-star-full"/>}/>
        <span className={"rating-number"}>{value.toFixed(1)}</span>
      </div>
    </div>
  );
}

TotalRatings.propTypes = {
  value: PropTypes.number
};

export default TotalRatings;
