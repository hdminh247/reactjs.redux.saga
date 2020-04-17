/**
 *
 * ForgotPasswordPopup
 *
 */

import React from "react";
import "./styles.scss";
import localStoreService from "local-storage";
import { Modal, ModalBody } from "reactstrap";
import ForgotPasswordPage from "../../containers/ForgotPasswordPage";
import { Link } from "react-router-dom";
import { urlLink } from "../../helper/route";

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
function ForgotPasswordPopup(props) {
  const {
    visible = false,
    toggle = (value) => {
    }
  } = props;
  const role = localStoreService.get("role") || ["customer"];
  return (
    <Modal className={"thaimobility modal-wrapper login-popup-wrapper"}
           isOpen={visible}
           size={"xs"}
           centered={true}>
      <ModalBody className={"authenticate-wrapper"}>
        <button className="close" onClick={toggle}>&times;</button>
        <div className={"left-wrapper"}>
          <Link to={urlLink.root}>
            <img src={"logo-white-square.png"} className={"logo"} alt="logo"/>
          </Link>
          {/*<div className={"title"}>Welcome {firstName}, Before you can offer for a drive, you need to set up your profile.</div>*/}
          <div className={"title"}>Thai Mobility brings value to your trip</div>
        </div>
        <div className={"right-wrapper"}>
          <ForgotPasswordPage {...props} isPopup={true}/>
        </div>
      </ModalBody>
    </Modal>);
}

ForgotPasswordPopup.propTypes = {};

export default ForgotPasswordPopup;
