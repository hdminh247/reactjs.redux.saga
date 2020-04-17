/**
 *
 * DestinationDetailInfo
 *
 */

import React from "react";
import "./styles.scss";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class DestinationDetailInfo extends React.Component {
  render() {
    const {
      jobDetail: {
        pickupLocation = { name: "" },
        destination = []
      }
    } = this.props;
    return (
      <div className={"destination-detail-info-wrapper detail-section"}>
        <div className={"title"}>
          Destinations
        </div>
        <div className={"detail bg-grey"}>
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
      </div>
    );
  }
}

DestinationDetailInfo.propTypes = {};

export default DestinationDetailInfo;
