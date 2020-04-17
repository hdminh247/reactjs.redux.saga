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

function WarningPopup(props) {
  const {
    visible = false,
    title = "",
    content = "",
    confirmText = "OK",
    cancelText = "Cancel",
    onSubmit = () => {
    },
    onCancel = () => {
    }
  } = props;
  return (
    <Modal className={"warning-popup-wrapper"}  zIndex={1061} isOpen={visible} size={"xs"} centered={true}>
      <ModalBody>
        <div className={"popup-contain"}>
          <div className={"popup-title"}>{title}</div>
          <div className={"popup-content"}>{content}</div>

          <div className={"d-flex justify-content-between btn-group-justified"}>
            <SubmitButton
              className="btn-orange"
              content={confirmText}
              onClick={() => {
                onSubmit(!visible);
              }}
            />
            <GhostButton
              title={cancelText}
              className={ClassNames("btn-cancel")}
              onClick={() => {
                onCancel(!visible);
              }}
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

WarningPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
export default WarningPopup;
