/**
 *
 * BaseButton
 *
 */

import React from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import { Button } from "reactstrap";

function BaseButton(props) {
  const {
    content = "",
    outline = false,
    color = "primary",
  } = props;
  return (
    <div className={"base-button"}>
      <Button
        {...props}
        outline={outline}
        color={color}
      >{content}</Button>
    </div>
  );
}

BaseButton.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.bool
};

export default BaseButton;
