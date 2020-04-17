/**
 *
 * InfoForm
 *
 */

import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
// import styled from 'styled-components';

export default class InfoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title = "", content = "", classNameIcon = "" } = this.props;
    return (
      <div className={"info-form-wrapper"}>
        <div className={"info-form-title"}>{title}</div>
        <div className={"content"}>
          {classNameIcon && <span className={`icon ${classNameIcon}`}/>}
          {content}
        </div>
      </div>
    );
  }
}

InfoForm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  classNameIcon: PropTypes.string
};
