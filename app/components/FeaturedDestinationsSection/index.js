/**
 *
 * FeaturedDestinationsSection
 *
 */

import React from "react";
import "./styles.scss";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import FeatureDestinationSlider from "../FeatureDestinationSlider";
import { urlLink } from "../../helper/route";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class FeaturedDestinationsSection extends React.PureComponent {
  render() {
    const { list = [] } = this.props;
    return (
      <section className={"section featured-wrapper"}>
        <div className={"title"}>Featured Destinations</div>
        <div className={"text-small see-all cursor-pointer"}
             onClick={() => {
               this.props.history.push(urlLink.featureDestination);
             }}
        >See all
        </div>
        <FeatureDestinationSlider
          history={this.props.history}
          settings={{
            slidesToShow: 3,
            slidesToScroll: 3
          }}
          list={list}
        />
      </section>
    );
  }
}

FeaturedDestinationsSection.propTypes = {
  list: PropTypes.array
};

export default compose(withRouter)(FeaturedDestinationsSection);
