/**
 *
 * ModalWrapper
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ClassNames from "classnames";
import "./style.scss";
import FormChangeAccountBank from "../FormChangeAccountBank";

function AccountBankPopup(props) {
  const {
    visible = false,
    title = "",
    className = "",
    content = "",
    confirmText = "OK",
    cancelText = "",
    accountBank = {},
    onSubmit = () => {
    },
    onCancel = () => {
    },
    toggle = (value) => {
    }
  } = props;
  const { payoutAccount = {} } = accountBank;
  return (
    <Modal className={ClassNames("account-bank-popup-wrapper", className)} isOpen={visible} size={"xs"} centered={true}>
      <ModalHeader toggle={toggle}>
      </ModalHeader>
      <ModalBody>
        <div className={"popup-contain"}>
          <div className={"popup-title"}>{title}</div>
          <div className={"popup-content"}>
            <FormChangeAccountBank
              {...props}
              {...payoutAccount}
              onSubmit={(e) => {
                onSubmit(e);
              }}/>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

AccountBankPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
export default AccountBankPopup;
