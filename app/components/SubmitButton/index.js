/**
 *
 * SubmitButton
 *
 */
import React from "react";
import ClassNames from "classnames";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./style.scss";
import PropTypes from "prop-types";

function SubmitButton(props) {
  const {
    disabled = false,
    className = "",
    content = ""
  } = props;
  return (
    <button
      {...props}
      type={"submit"}
      className={ClassNames("btn btn-submit", className)}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

SubmitButton.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};
export default SubmitButton;
