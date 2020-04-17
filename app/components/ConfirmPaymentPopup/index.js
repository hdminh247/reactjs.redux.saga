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
//Lib
import { PayPalButton } from "react-paypal-button-v2";
import config from "config";

function ConfirmPaymentPopup(props) {
  const {
    visible = false,
    title = "",
    method = "paypal",
    content = "",
    confirmText = "OK",
    cancelText = "Cancel",
    onCreateOrder = () => {
    },
    onApprove = () => {
    },
    onSubmit = () => {
    },
    onCancel = () => {
    }
  } = props;
  return (
    <Modal className={"confirm-payment-popup-wrapper"} isOpen={visible} size={"xs"} centered={true}>
      <ModalBody>
        <div className={"popup-contain"}>
          {title && <div className={"popup-title"}>{title}</div>}
          <div className={"popup-content"}>{content}</div>

          <div className={"d-flex justify-content-between btn-group-justified"}>
            {method === "paypal" ?
              <button className={"btn-confirm-paypal"}>
                <PayPalButton
                  style={{
                    height: 40,
                    layout: "horizontal",
                    tagline: false
                  }}
                  options={{
                    clientId: config.PAYPAL_MODE === "sandbox" ? config.PAYPAL_SANDBOX_CLIENT_ID : config.PAYPAL_LIVE_CLIENT_ID
                  }}
                  createOrder={(data, actions) => {
                    // ! call api from our server to create order
                    return onCreateOrder(data, actions);

                    // return actions.order.create({
                    //   purchase_units: [{
                    //     amount: {
                    //       currency_code: "USD",
                    //       value: "0.01"
                    //     }
                    //   }]
                    // });
                  }}
                  onApprove={(data, actions) => {
                    //!call api from our server to approve
                    return onApprove(data, actions);

                    // Capture the funds from the transaction
                    // return actions.order.capture().then(function(details) {
                    //   // Show a success message to your buyer
                    //   alert("Transaction completed by " + details.payer.name.given_name);
                    //
                    //   // OPTIONAL: Call your server to save the transaction
                    //   return fetch("/paypal-transaction-complete", {
                    //     method: "post",
                    //     body: JSON.stringify({
                    //       orderID: data.orderID
                    //     })
                    //   });
                    // });
                  }}
                />
              </button>
              : <SubmitButton
                className="btn-green"
                content={confirmText}
                onClick={() => {
                  onSubmit(!visible);
                }}
              />}
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

ConfirmPaymentPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreateOrder: PropTypes.func,
  onApprove: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.any,
  method: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
export default ConfirmPaymentPopup;
