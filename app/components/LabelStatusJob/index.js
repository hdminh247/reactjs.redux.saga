/**
 *
 * LabelStatusJob
 *
 */

import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import ClassNames from "classnames";

// import styled from 'styled-components';

function LabelStatusJob(props) {
  const { classNameIcon = "", label = "", type = "" } = props;
  return <div className={ClassNames("label-status-job-wrapper", type)}>
    <i className={`icon ${classNameIcon}`}/><span className={"label"}>{label}</span>
  </div>;
}

LabelStatusJob.propTypes = {
  classNameIcon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

export default LabelStatusJob;
