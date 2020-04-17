/**
 *
 * ImgSlider
 *
 */

import React from "react";
import Slider from "react-slick";
import FeaturedDestinationsItem from "../FeaturedDestinationsItem";
// import styled from 'styled-components';
import "./styles.scss";
import uuidv1 from "uuid";

class FeatureDestinationSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let baseSettings = {
      auto: true,
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      centerPadding: 30,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    };

    const {
      list = [],
      settings = {},
      history = []
    } = this.props;
    return (
      <div className={"img-slider-wrapper"}>
        <Slider
          {...baseSettings}
          {...settings}
        >
          {list.map(item => {
            return (
              <div className={"item"} key={uuidv1()}>
                <FeaturedDestinationsItem {...item} history={history}/>
              </div>
            );
          })}

        </Slider>
      </div>
    );
  }
}

FeatureDestinationSlider.propTypes = {};

export default FeatureDestinationSlider;
