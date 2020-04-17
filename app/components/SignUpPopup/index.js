/**
 *
 * SignUpPopup
 *
 */

import React from "react";
import "./styles.scss";
import localStoreService from "local-storage";
import { Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { urlLink } from "../../helper/route";
import SignUpPage from "../../containers/SignUpPage";

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
function SignUpPopup(props) {
  const {
    visible = false,
    apiError = [],
    onSubmit = () => {
    },
    showPassword = false,
    toggle = (value) => {
    },
    loginSocial = () => {
    },
    changeStoreData = (key, value) => {
    },
    history = []
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
          <SignUpPage {...props} isPopup={true}/>
        </div>
      </ModalBody>
    </Modal>);
}

SignUpPopup.propTypes = {};

export default SignUpPopup;
