/**
 *
 * BaseSlider
 *
 */

import React from "react";
import Slider from "react-slick";
import TopBookingItem from "../TopBookingItem";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./styles.scss";
import uuidv1 from "uuid";
import { urlLink } from "../../helper/route";

/* eslint-disable react/prefer-stateless-function */
class BaseSlider extends React.Component {
  midDrag = false;

  constructor(props) {
    super(props);
  }

  handleSelectTopBookingItem = (data) => {
    const {
      history = []
    } = this.props;
    const { category = {}, subCategory = "", _id: vehicleId = "" } = data;
    console.log("handleSelectTopBookingItem", data);
    const { _id: categoryId = "", key = "", allowSubCategory = false } = category;
    const { _id: subCategoryId = "" } = subCategory;

    history.push(
      {
        pathname: urlLink.booking,
        state: {
          category: categoryId,
          allowSubCategory,
          subCategory: subCategoryId,
          vehicle: allowSubCategory ? vehicleId : "",
          key
        }
      }
    );
  };

  toggleMidDrag = () => {
    this.midDrag = !this.midDrag;
  };

  render() {
    const sliderRef = slider => {
      this.slider = slider;
    };
    let baseSettings = {
      auto: true,
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      centerPadding: "30px",
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false
          }
        },
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
      settings = {}
    } = this.props;

    return (
      <div className={"base-slider-wrapper"}>
        <Slider
          {...baseSettings}
          {...settings}
          beforeChange={this.toggleMidDrag}
          afterChange={this.toggleMidDrag}
          ref={sliderRef}
        >
          {list.map(item => {
            const { data = {}, price = { unit: "€", value: 0 } } = item;
            return (
              <div className={"item"} key={uuidv1()} onClick={() => {
                if (this.midDrag) {
                  // ignore clicks
                  return;
                }

                this.handleSelectTopBookingItem(data);
              }}>
                <TopBookingItem {...data} price={price}/>
              </div>
            );
          })}

        </Slider>
      </div>
    );
  }
}

BaseSlider.propTypes = {};

export default BaseSlider;
