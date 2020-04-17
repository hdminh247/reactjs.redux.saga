/**
 *
 * FeaturedDestinationsItem
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./styles.scss";
import { urlLink } from "../../helper/route";

function FeaturedDestinationsItem(props) {
  const {
    title = "Viet Nam",
    _id = "",
    image = "",
    history = []
  } = props;
  return (
    <div className={"featured-item-wrapper"} onClick={() => {
      history.push(urlLink.featureDestinationDetail.replace(":id", _id));
    }}>
      <img className={"image"}
           src={image}
           onError={e => {
             e.target.onerror = null;
             e.target.src = "./image-not-found.png";
           }}
           alt={"car"}/>
      <div className={"title name-destination align-self-center"}>{title}</div>
    </div>
  );
}

FeaturedDestinationsItem.propTypes = {};

export default FeaturedDestinationsItem;
