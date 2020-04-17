/**
 *
 * DriverWithRatingBox
 *
 */

import React from "react";
import "./styles.scss";
import SubmitButton from "../SubmitButton";

import PropTypes from "prop-types";
import Rating from "react-rating";
import _ from "lodash";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class DriverWithRatingBox extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      avatar = "", firstName = "", lastName = "",
      rating = {},
      activities = [],
      onRating = () => {
      },
      isRated = false
    } = this.props;
    const { avgRating = 0, content = "" } = rating;
    let data = [], link = "";

    if (!_.isEmpty(activities)) {
      [data = []] = activities;
    }

    let { data: listActivity = [] } = data;
    const [firstAct = {}] = listActivity;
    const { _id = "", activity = {} } = firstAct;
    const { actions = [] } = activity;
    if (!_.isEmpty(actions)) {
      [{ action: link = "" }] = actions;
    }

    console.log("DriverWithRatingBox", this.props);

    return (
      <div className={"driver-with-rating-box-wrapper"}>
        <div className={"title"}>Driver Details</div>
        <div className={"bg-grey"}>
          <div className={"image-wrapper"}>
            <img className={"rounded-circle avatar"}
                 src={avatar}
                 onError={e => {
                   e.target.onerror = null;
                   e.target.src = "./avatar-default.jpg";
                 }}
                 alt="avatar"
            />
          </div>
          <div className={"name"}>
            {firstName} {lastName}
          </div>
          <div className={"line-break"}/>
          <div className={"rating-wrapper"}>
            {isRated ?
              <div className={"rating"}>
                <div className={"total"}>Total Ratings:</div>
                <div className={"d-table"}>
                  <div className={"d-table-cell"}>
                    {<Rating initialRating={avgRating}
                             readonly={true}
                             fractions={2}
                             emptySymbol={<span className="icon color-bluey-grey icon-star-full"/>}
                             fullSymbol={<span className="icon color-yellow icon-star-full"/>}
                    />}
                  </div>
                  <div className={"d-table-cell rating-value"}>{avgRating}</div>
                </div>
                <div className={"line-break"}/>
                <div className={"content work-break-all"}>{content}</div>
              </div> :
              <div className={"not-rating"}>
                <img className={"rounded-circle avatar"}
                     src={"./driver-not-rate.svg"}
                     onError={e => {
                       e.target.onerror = null;
                       e.target.src = "./avatar-default.jpg";
                     }}
                     alt="avatar"
                />
                <div className={"text"}>You have not rate the driver yet. Rate and review now!</div>
                <SubmitButton className={"btn-orange"} content={"Rate & Review"}
                              onClick={() => {
                                onRating(_id, link);
                              }}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

DriverWithRatingBox.propTypes = {
  onRating: PropTypes.func
};

export default DriverWithRatingBox;
