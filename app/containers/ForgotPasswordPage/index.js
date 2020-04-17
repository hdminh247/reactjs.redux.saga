/**
 *
 * ForgotPasswordPage
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { makeSelectErrors, makeSelectForgotPasswordPage, makeSelectStatus } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import FormGroup from "components/FormGroup";
import { Formik } from "formik";
import InputForm from "components/InputForm";
import * as Yup from "yup";
import SubmitButton from "components/SubmitButton";
import { defaultAction, resendEmail, sendEmail, setIsSent } from "./actions";
import { changeStoreData as changeStoreDataHome } from "../HomePage/actions";
import { urlLink } from "../../helper/route";
import "./style.scss";
import "../LoginPage/style.scss";
//lib
import _ from "lodash";
import PageInfo from "../../components/PageInfo";
import ClassNames from "classnames";

const validateForm = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Please enter your E-mail")
});

/* eslint-disable react/prefer-stateless-function */
export class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReset: false
    };
  }

  render() {
    let { isPopup = false } = this.props;
    let { isSent = false } = this.props.forgotpasswordpage;
    return (
      <div className={"login-wrapper forgot-password-wrapper"}>
        <FormGroup
          title={"Forgot password"}
          link={" login"}
          onClick={() => {
            this.props.setIsSent();
            this.props.history.push(urlLink.login);
          }}
        >

          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{ email: "" }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={evt => {
              this.props.onSubmit(evt, isSent);
              console.log("onSubmit");
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
                /* and other goodies */
              }) => (
              <div
                className={ClassNames("forgot-password-page", { "error-form": this.props.errors && this.props.errors.length > 0 })}>

                <form onSubmit={handleSubmit}
                      onChange={() => {
                        this.props.default();
                      }}>

                  <PageInfo
                    isReset={this.props.isSent}
                    content={""}
                    alternative={`We have sent a reset password email to ${values.email}. Please click on the Reset password link to set your new password.`}
                  />
                  {!isSent && (
                    <div className={"is-not-sent"}>
                      <InputForm
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                        error={errors.email}
                        value={values.email}
                        touched={touched.email}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        placeholder={"Enter your email address"}
                        prependLabel={`<i class="icon-mail"/>`}
                      />

                      <div className={"link-other-page text-center"}>
                        Do not have account? <span className={"link-route"} onClick={() => {
                        if (isPopup) {
                          this.props.changeStoreDataHome("showForgotPassword", false);
                          this.props.changeStoreDataHome("showSignUp", true);
                        } else
                          this.props.history.push(urlLink.signUp);
                      }}>Sign up now!
                      </span>
                      </div>
                      <div className={"form-group-footer"}>
                        <SubmitButton
                          className="btn-login btn-orange"
                          content={"Submit"}/>
                      </div>
                    </div>
                  )}
                  {isSent && (
                    <div className={"is-sent text-center"}>
                      <img className={"img-fluid"} src="./resend.png"/>
                      <div className={"link-other-page text-center"}>
                        Didn’t receive any email! <span className={"link-route"}
                                                        onClick={(e) => {
                                                          e.preventDefault();
                                                          this.props.onSubmit(values, isSent);
                                                        }}>RESEND EMAIL
                      </span>
                      </div>
                    </div>
                  )}
                  {this.props.errors && this.props.errors.length > 0
                    ? this.props.errors.map(error => {
                      return (
                        <div className="errors">
                          <span className="icon-error"/>
                          <div key={error.errorCode} className="error-item">
                            <span>{error.errorMessage}</span>
                          </div>
                        </div>
                      );
                    })
                    : []}
                </form>
              </div>
            )}
          </Formik>
        </FormGroup>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  dispatch: PropTypes.func,
  onSubmit: PropTypes.func,
  changeStoreDataHome: PropTypes.func,
  setIsSent: PropTypes.func,
  isPopup: PropTypes.string
};
const mapStateToProps = createStructuredSelector({
  forgotpasswordpage: makeSelectForgotPasswordPage(),
  errors: makeSelectErrors(),
  isSent: makeSelectStatus()
});

function mapDispatchToProps(dispatch) {
  return {
    default: () => {
      dispatch(defaultAction());
    },
    changeStoreDataHome: (key, value) => {
      dispatch(changeStoreDataHome(key, value));
    },
    onSubmit: (evt, isSent) => {
      console.log(evt, isSent);
      if (isSent === true) {
        //case resend
        dispatch(resendEmail(evt.email)); //Gọi trong action
      } else {
        //case forgot
        if (!_.isUndefined(evt) && !_.isUndefined(evt.email)) {
          dispatch(sendEmail(evt.email)); //Gọi trong action
        }
      }
    },
    setIsSent: () => {
      dispatch(setIsSent());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: "forgotPasswordPage", reducer });
const withSaga = injectSaga({ key: "forgotPasswordPage", saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(ForgotPasswordPage);
