/**
 *
 * PageInfo
 *
 */
// eslint-disable-next-line no-unused-vars
import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./style.scss";
import ClassNames from "classnames";

function PageInfo(props) {
  return (
    <div
      className={ClassNames("page-info", props.alternative && "less-margin")}
    >
      <div className={"note-title"}>{props.title}</div>
      {!props.alternative && (
        <div className={"note-content"}>{props.content}</div>
      )}
      {props.alternative &&
      !props.isReset && <div className={"note-content"}>{props.content}</div>}
      {props.isReset && (
        <div className={"note-content"}>{props.alternative}</div>
      )}
      {props.isReset && (
        <div className={"note-content"}>{props.alternative_bottom}</div>
      )}
    </div>
  );
}

PageInfo.propTypes = {};
export default PageInfo;
