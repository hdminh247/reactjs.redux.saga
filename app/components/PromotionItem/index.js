/**
 *
 * PromotionItem
 *
 */

import React from "react";
import "./styles.scss";
import moment from "moment";
import _ from "lodash";
import BaseButton from "../BaseButton";

import PropTypes from "prop-types";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class PromotionItem extends React.PureComponent {
  render() {
    const {
      content = "", title = "",
      image = "",
      coupons = [{}],
      applyPromotion = () => {
      },
      onView = () => {
      },
      category = {},
      subCategory = "",
      endDate = undefined,
      _id = ""
    } = this.props;
    let code = "";
    if (!_.isEmpty(coupons))
      [{ code = "" }] = coupons;
    const { _id: categoryId = "", key = "", allowSubCategory = false } = category;
    return (
      <div className={"promotion-item-wrapper"}>
        <div className={"upper-section cursor-pointer"}
             onClick={() => {
               onView(_id);
             }}>
          <div className={"image-wrapper"}>
            {endDate && <div className={"end-date"}>{moment(endDate).diff(moment(), "days")} days</div>}
            {image && <img className={"image"}
                           src={image}
                           onError={e => {
                             e.target.onerror = null;
                             e.target.src = "./image-not-found.png";
                           }}
                           alt={"blog-item"}/>
            }
          </div>
          <div className={"promotion-title"}>{title}</div>
          {content && <div className={"promotion-content ellipsis"}
                           dangerouslySetInnerHTML={{ __html: content.replace(/<img[^>]*>/g, "") }}/>}
        </div>
        <BaseButton content={"Apply now!"}
                    className={"btn-block"}
                    color={"green"}
                    onClick={() => {
                      applyPromotion({ promotion: code, allowSubCategory, category: categoryId, key, subCategory });
                    }}/>
      </div>);
  }
}

PromotionItem.propTypes = {
  applyPromotion: PropTypes.func,
  onView: PropTypes.func
};

export default PromotionItem;
