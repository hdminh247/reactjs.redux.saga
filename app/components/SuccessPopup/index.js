/**
 *
 * SuccessPopup
 *
 */

import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import _ from "lodash";
import BaseButton from "../BaseButton";
import ClassNames from "classnames";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./style.scss";

/* eslint-disable rea;ct/prefer-stateless-function */
class SuccessPopup extends React.Component {
  render() {
    const {
      visible = false,
      btnText = "OK",
      title = "",
      content = "",
      className = "",
      link = "",
      toggle = (value) => {
      }
    } = this.props;

    return (
      <Modal className={ClassNames("thaimobility modal-wrapper success-popup-wrapper", className)}
             isOpen={visible}
             size={"lg"}
             centered={true}
      >
        <ModalBody className={"body-wrapper"}>
          <div className={"title"}>{title}</div>
          <div className={"content"}>{content}</div>
          <div className={"btn-wrapper"}>
            <BaseButton color={"orange"} className={"btn-block"} content={btnText} onClick={() => {
              toggle(visible);
              if (!_.isEmpty((link))) {
                this.props.history.push(link);
              }
            }}/>
          </div>
        </ModalBody>
      </Modal>);
  }
}

SuccessPopup.propTypes = {};

export default compose(withRouter)(SuccessPopup);
