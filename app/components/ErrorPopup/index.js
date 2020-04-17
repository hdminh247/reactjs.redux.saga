/**
 *
 * ModalWrapper
 *
 */
import React from "react";
import { Modal, ModalBody } from "reactstrap";
import GhostButton from "components/GhostButton";
import "./style.scss";

function ErrorPopup(props) {
  const {
    visible = false,
    title = "",
    content = "",
    onSubmit = () => {
    }
  } = props;
  return (
    <Modal className={"popup-error-wrapper"} isOpen={visible} size={"xs"} centered={true}>
      <ModalBody>
        <div className={"popup-contain"}>
          <div className={"popup-title"}>{title}</div>
          <div className={"popup-content"}>{content}</div>
          <GhostButton
            title={"OK"}
            className={`btn-block error-btn`}
            onClick={() => {
              onSubmit();
            }}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}

ErrorPopup.propTypes = {};
export default ErrorPopup;
