/**
 *
 * RatingItemDriver
 *
 */

import React from "react";
import "./styles.scss";

import PropTypes from "prop-types";
import Rating from "react-rating";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class RatingItemDriver extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value) => {
    const {
      onChange = () => {
      }
    } = this.props;
    onChange(value);
  };

  render() {
    const {
      title = "", value = 0, onChange = () => {
      }
    } = this.props;
    return (<div className={"d-table table rating-item-driver-wrapper"}>
      <div className={"d-table-cell title"}>{title}</div>
      <div className={"d-table-cell star"}>
        <Rating
          initialRating={value}
          emptySymbol={<span className="icon color-bluey-grey icon-star-full"/>}
          fullSymbol={<span className="icon color-yellow icon-star-full"/>}
          onChange={(value) => {
            this.handleChange(value);
          }}
        /></div>
      <div className={"d-table-cell value text-right"}>{value.toFixed(1)}</div>
    </div>);
  }
}

RatingItemDriver.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired
};

export default RatingItemDriver;
