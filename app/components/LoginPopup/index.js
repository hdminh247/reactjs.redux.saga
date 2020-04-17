/**
 *
 * LoginPopup
 *
 */

import React from "react";
import { Modal, ModalBody } from "reactstrap";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./style.scss";
import "../../containers/Auth/style.scss";
import { Link } from "react-router-dom";
import { urlLink } from "../../helper/route";
import * as Yup from "yup";
import localStoreService from "local-storage";
import LoginPage from "../../containers/LoginPage";

const validateForm = Yup.object().shape({
  "email": Yup.string()
    .email("Invalid email")
    .required("Please enter email"),
  "password": Yup.string()
    .min(8, "Invalid password (At least 8 and no space characters)")
    .required("Please enter password")
});

function LoginPopup(props) {
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
           size={"lg"}
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
          <LoginPage {...props} isPopup={true} linkToGo={""}/>
        </div>
      </ModalBody>
    </Modal>
  );
}

LoginPopup.propTypes = {};

export default LoginPopup;
