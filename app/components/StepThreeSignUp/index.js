/**
 *
 * StepThreeSignUp
 *
 */

import React from "react";
import SubmitButton from "../SubmitButton";
import { Link } from "react-router-dom";
import FormGroup from "../FormGroup";
import GhostButton from "../GhostButton";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import "./style.scss";
import { Accordion } from "react-bootstrap";
import { Collapse, Toggle } from "react-bootstrap/Accordion";
import ClassNames from "classnames";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./StripeForm";
import config from "config";
import { Formik } from "formik";

/* eslint-disable react/prefer-stateless-function */
class StepThreeSignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeKey: "0",
      elementFontSize: window.innerWidth < 450 ? "14px" : "18px"
    };
    window.addEventListener("resize", () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== "14px") {
        this.setState({ elementFontSize: "14px" });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== "18px"
      ) {
        this.setState({ elementFontSize: "18px" });
      }
    });
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log("[token]", payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };


  render() {
    const {
      apiError = [],
      onSubmit = () => {
      }
    } = this.props;

    const { activeKey = "0", elementFontSize } = this.state;
    return (
      <div className={"step-three-wrapper"}>
        <FormGroup title={"Set up your payment"} progress={50}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{}}
            enableReinitialize={true}
            validationSchema={{}}
            onSubmit={evt => {
              console.log(evt);
              this.handleSubmit(evt);
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (

              <div>
                <Accordion className={"payment-check-list-wrapper"} activeKey={activeKey}>
                  <Toggle
                    type={"button"}
                    className={ClassNames("payment-item",
                      activeKey === "1" || activeKey === "0" ? "active" : "disabled"
                    )}
                    eventKey="1"
                    onClick={() => {
                      this.setState({ activeKey: "1" });
                    }}>
                    <label className={"checkbox-item"}>
                      <img src={"visa.svg"} alt={"visa"}/> Credit card (Visa, Master)
                      <input type="radio" name="radio" checked={activeKey === "1"}/>
                      <span className="checkmark"/>
                    </label>
                  </Toggle>
                  <Collapse eventKey="1">
                    <div className={"content-item"}>
                      <StripeProvider
                        apiKey={config.STRIPE_MODE === "sandbox" ? config.STRIPE_SANDBOX_PUBLISHABLE_KEY : config.STRIPE_LIVE_PUBLISHABLE_KEY}>
                        <Elements>
                          <CheckoutForm
                            activeKey={activeKey}
                            fontSize={elementFontSize}
                            onSubmit={(e) => {
                              onSubmit(e);
                            }}/>
                        </Elements>
                      </StripeProvider>
                    </div>
                  </Collapse>

                  <Toggle
                    type={"button"}
                    className={ClassNames("payment-item",
                      activeKey === "2" || activeKey === "0" ? "active" : "disabled"
                    )}
                    eventKey="2"
                    onClick={() => {
                      this.setState({ activeKey: "2" });
                    }}>
                    <label className={"checkbox-item"}>
                      <img src={"pay-pal.svg"} alt={"paypal"}/> PayPal
                      <input type="radio" name="radio" checked={activeKey === "2"}/>
                      <span className="checkmark"/>
                    </label>
                  </Toggle>
                  <Collapse eventKey="2">
                    <div className={"content-item"}>
                      You need to login to your Paypal account whenever offer for a drive!
                    </div>

                  </Collapse>
                </Accordion>

                {(apiError && apiError.length > 0) ? apiError.map((error) => {
                  return (
                    <div key={error.errorCode} className="errors">
                      <span className="icon-error"/>
                      <div className="error-item">
                        <span>{error.errorMessage}</span>
                      </div>
                    </div>
                  );
                }) : null}

                <div className={"footer-submit"}>
                  <SubmitButton
                    form={"stripe_form"}
                    className="btn-login btn-orange"
                    content={"Add payment"}
                  />
                  <Link to={"/"}>
                    <GhostButton title={"Cancel"} className={"btn-block btn-cancel"}/>
                  </Link>
                </div>
              </div>

            )}
          </Formik>
        </FormGroup>
      </div>
    );
  }
}

StepThreeSignUp.propTypes = {
  apiError: PropTypes.array
};

export default StepThreeSignUp;
