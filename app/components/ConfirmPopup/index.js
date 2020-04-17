/**
 *
 * ModalWrapper
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";
import ClassNames from "classnames";
import "./style.scss";
import GhostButton from "../GhostButton";
import SubmitButton from "../SubmitButton";

function ConfirmPopup(props) {
  const {
    visible = false,
    title = "",
    className = "",
    content = "",
    confirmText = "OK",
    cancelText = "",
    onSubmit = () => {
    },
    onCancel = () => {
    }
  } = props;
  return (
    <Modal className={ClassNames("confirm-popup-wrapper", className)} isOpen={visible} size={"xs"} centered={true}>
      <ModalBody>
        <div className={"popup-contain"}>
          <div className={"popup-title"}>{title}</div>
          <div className={"popup-content"}>{content}</div>

          <div className={"d-flex justify-content-between btn-group-justified"}>
            <SubmitButton
              className={ClassNames("btn-green")}
              content={confirmText}
              onClick={() => {
                onSubmit(!visible);
              }}
            />
            {cancelText && <GhostButton
              title={cancelText}
              className={ClassNames("btn-cancel")}
              onClick={() => {
                onCancel(!visible);
              }}
            />}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

ConfirmPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.any,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
export default ConfirmPopup;
