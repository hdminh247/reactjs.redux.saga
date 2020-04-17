/**
 *
 * StepTwoSignUp
 *
 */

import React from "react";
import FormGroup from "../../components/FormGroup";
import { Formik } from "formik";
import SubmitButton from "../../components/SubmitButton";
import * as Yup from "yup";
import GhostButton from "../GhostButton";
import ReactCodeInput from "react-verification-code-input";
import "./styles.scss";
import { Link } from "react-router-dom";

const validateForm = Yup.object().shape({
  code: Yup.string()
    .required("Code OTP is required")
    .length(6, "Invalid OTP")
});

function StepTwoSignUp(props) {
  const {
    apiError = [],
    onSubmit = (evt) => {
    },
    resendOTP = () => {
    },
    user = {
      verifyData: {
        countryCode: "",
        phoneNumber: ""
      }
    }
  } = props;
  console.log("StepTwoSignUp", props);
  return (
    <div className={"step-two-wrapper"}>
      <FormGroup title={"Verify Phone number"} progress={25}>
        <Formik
          // ref={ref => (this.formik = ref)}
          initialValues={{
            code: ""
          }}
          enableReinitialize={true}
          validationSchema={validateForm}
          onSubmit={evt => {
            console.log("submit");
            onSubmit(evt);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
              /* and other goodies */
            }) => (

            <form onSubmit={handleSubmit}>
              {user.verifyData &&
              <div className={"message"}>A text message with a verification code has been sent to <b className={"text-bold"}>{user.verifyData.countryCode}{user.verifyData.phoneNumber}</b></div>
              }

              <div className={"code-wrapper"}>
                <ReactCodeInput className={"code-input"}
                                values={values.code}
                                fieldWidth={60}
                                fieldHeight={60}
                                autoFocus={true}
                                onChange={value => {
                                  setFieldValue("code", value);
                                }}
                />
                {touched.code && errors.code && (
                  <div className={"error-text"}>
                    <i className={"icon-error"}/>
                    <span>{errors.code}</span>
                  </div>
                )}
              </div>

              <div className={"resend text-center"}>
                Didn't get a verification code? <span className={"link-route"}
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        resendOTP();
                                                      }}>Resend
                </span>
              </div>
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
                  className="btn-login btn-orange"
                  content={"Next"}/>

                <Link to={"/"}>
                  <GhostButton title={"Cancel"} className={"btn-block btn-cancel"}/>
                </Link>
              </div>

            </form>

          )}
        </Formik>
      </FormGroup>
    </div>
  );
}

StepTwoSignUp.propTypes = {};

export default StepTwoSignUp;
