/**
 *
 * BlogItem
 *
 */

import React from "react";
import "./styles.scss";

import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";
import ClassNames from "classnames";
import BaseButton from "../BaseButton";
import { formatRichTextToOnlyChar } from "../../utils/helpers";

// import styled from 'styled-components';
const LIMIT_TITLE = 100;

function BlogItem(props) {
  const {
    isTop = false,
    className = "",
    content = "", title = "", image = "",
    _id = "",
    createdAt = "",
    createdBy = {},
    readMore = () => {
    }
  } = props;

  const { firstName = "", lastName = "" } = createdBy;
  return (
    <div className={ClassNames("blog-item-wrapper", className)}>
      <div className={ClassNames("row-section", { "row": isTop })}>
        <div className={ClassNames("col-section", { "col-md-7": isTop })}>
          <div className={"image-wrapper"}>
            <img className={"image"}
                 src={image}
                 onError={e => {
                   e.target.onerror = null;
                   e.target.src = "./image-not-found.png";
                 }}
                 alt={"blog-item"}/>

          </div>
        </div>
        <div className={ClassNames({ "col-md-5": isTop })}>
          <div className={"title"}>{title.length > LIMIT_TITLE ? title.substring(0, LIMIT_TITLE) + "..." : title}</div>
          <div className={"info-created"}>
            {!_.isEmpty(createdBy) && firstName && lastName &&
            <span className={"created-by"}>{`${firstName} ${lastName}`}</span>}
            {moment(createdAt).isValid() ?
              <span className={"created-at"}>{` | ${moment(createdAt).format("DD/MM/YYYY")}`}</span> : ""}
          </div>
          {content && <div className={"content truncate-overflow"}
                           dangerouslySetInnerHTML={{ __html: formatRichTextToOnlyChar(content) }}/>}

          <BaseButton content={"Read more"}
                      className={"read-more"}
                      outline={true}
                      onClick={() => readMore(_id)}
          />
        </div>
      </div>

    </div>);
}

BlogItem.propTypes = {
  readMore: PropTypes.func,
  className: PropTypes.string
};

export default BlogItem;
