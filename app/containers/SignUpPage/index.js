/**
 *
 * SignUpPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectSignUpPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { signUp } from "./actions";
import "./style.scss";
import FormGroup from "components/FormGroup";
import InputForm from "components/InputForm";
import Checkbox from "components/Checkbox";

import SocialLogin from "components/SocialLogin";
import { loginSocial } from "../LoginPage/actions";
import { changeStoreData as changeStoreDataHome } from "../HomePage/actions";
import { makeSelectCurrentUser } from "../App/selectors";
import SubmitButton from "../../components/SubmitButton";
import { urlLink } from "../../helper/route";

import * as Yup from "yup";
import { Formik } from "formik";
import _ from "lodash";
import localStoreService from "local-storage";
import { REGEX_NAME, REGEX_PASSWORD } from "../../helper/regex";
import { makeSelectNavMenuDataHomePage } from "../HomePage/selectors";


const validateForm = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(REGEX_NAME, "Invalid first name (no number and special characters)")
    .min(1, "Invalid first name (At least 1 characters)")
    .max(30, "Invalid first name (Maximum at 30 characters)"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(REGEX_NAME, "Invalid last name (no number and special characters)")
    .min(1, "Invalid last name (At least 1 characters)")
    .max(30, "Invalid last name (Maximum at 30 characters)"),
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Please enter email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Invalid password (At least 8 and no space characters)")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)"),
  confirmPassword: Yup.string()
    .min(8, "Invalid password confirm (At least 8 and no space characters)")
    .oneOf([Yup.ref("password"), null], "Confirm Password is not the same")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)")
});

/* eslint-disable react/prefer-stateless-function */
export class SignUpPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  render() {
    const { apiError = [] } = this.props.signuppage;
    const { navMenu = [], isPopup = false } = this.props;
    const role = localStoreService.get("role") || ["customer"];
    return (
      <div className={"sign-up-wrapper"}>
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Description of SignUpPage"/>
        </Helmet>

        <FormGroup title={`Sign up ${_.indexOf(role, "company") >= 0 ? "for driver" : ""}`}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: _.indexOf(role, "company") >= 0 ? "company" : "customer",
              isAgree: false
            }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={evt => {
              console.log("on submit");
              this.props.onSubmit(evt);
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

              <form onSubmit={handleSubmit} className="form-login">
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <InputForm label={"First name"}
                               name={"firstName"}
                               value={values.firstName}
                               error={errors.firstName}
                               apiError={apiError}
                               touched={touched.firstName}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Enter your first name"}
                               prependLabel={`<i class="icon-user1"/>`}
                    />
                  </div>
                  <div className={"col-md-6"}>
                    <InputForm label={"Last name"}
                               name={"lastName"}
                               value={values.lastName}
                               error={errors.lastName}
                               apiError={apiError}
                               touched={touched.lastName}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Enter your last name"}
                               prependLabel={`<i class="icon-user1"/>`}
                    />
                  </div>
                </div>
                <InputForm label={"Email"}
                           name={"email"}
                           type={"email"}
                           value={values.email}
                           error={errors.email}
                           apiError={apiError}
                           touched={touched.email}
                           onChange={evt => {
                             handleChange(evt);
                           }}
                           onBlur={handleBlur}
                           placeholder={"Enter your email"}
                           prependLabel={`<i class="icon-mail"/>`}
                />
                <InputForm label={"Password"}
                           name={"password"}
                           value={values.password}
                           error={errors.password}
                           apiError={apiError}
                           touched={touched.password}
                           onChange={evt => {
                             handleChange(evt);

                           }}
                           onBlur={handleBlur}
                           type={!this.state.showPassword ? "password" : "text"}
                           placeholder={"Enter your password"}
                           iconClassShow={"icon-invisible"}
                           iconClassHide={"icon-visible"}
                           togglePassword={() => {
                             this.setState({
                               showPassword: !this.state.showPassword
                             });
                           }}
                           showPassword={this.state.showPassword}
                           prependLabel={`<i class="icon-lock"/>`}
                />

                <InputForm label={"Confirm password"}
                           name={"confirmPassword"}
                           value={values.confirmPassword}
                           error={errors.confirmPassword}
                           touched={touched.confirmPassword}
                           onChange={evt => {
                             handleChange(evt);
                           }}
                           onBlur={handleBlur}
                           type={!this.state.showConfirmPassword ? "password" : "text"}
                           placeholder={"Enter your confirm password"}
                           iconClassShow={"icon-invisible"}
                           iconClassHide={"icon-visible"}
                           togglePassword={() => {
                             this.setState({
                               showConfirmPassword: !this.state.showConfirmPassword
                             });
                           }}
                           showPassword={this.state.showConfirmPassword}
                           prependLabel={`<i class="icon-lock"/>`}
                />

                <Checkbox
                  name={"isAgree"}
                  label={"I agree to"}
                  checked={values.isAgree}
                  onChange={evt => {
                    handleChange(evt);
                  }}
                >
                  <span className={"link-route"} onClick={() => {
                    console.log(_.find(navMenu, { type: "terms_and_condition" }).link || "/");
                    this.props.history.push(_.find(navMenu, { type: "terms_and_condition" }).link || "/");
                  }}>TERM & CONDITIONS</span>
                </Checkbox>
                <SubmitButton
                  className="btn-login btn-orange"
                  content={"Sign up"}
                  disabled={!values.isAgree}
                />

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

                <div className={"link-other-page text-center"}>
                  Have an account? <span className={"link-route"}
                                         onClick={() => {
                                           if (isPopup) {
                                             this.props.changeStoreDataHome("showSignUp", false);
                                             this.props.changeStoreDataHome("showLogin", true);
                                           } else
                                             this.props.history.push(urlLink.login);
                                         }}>Sign in now!
                </span>
                </div>
              </form>

            )}
          </Formik>

          <div className={"form-group-footer"}>
            <SocialLogin {...this.props}
                         socialLoginCallBack={(user) => {
                           console.log(user);
                           const { _token: { accessToken = "" }, _provider = "" } = user;
                           this.props.loginSocial(accessToken, _provider, _.indexOf(role, "company") >= 0 ? "company" : "customer");
                         }}/>
          </div>
        </FormGroup>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  onSubmit: PropTypes.func,
  loginSocial: PropTypes.func,
  isPopup: PropTypes.string,
  changeStoreDataHome: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  signuppage: makeSelectSignUpPage(),
  currentUser: makeSelectCurrentUser(),
  navMenu: makeSelectNavMenuDataHomePage()
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: evt => {
      dispatch(signUp(evt));
    },
    loginSocial: (accessToken, provider, role) => {
      dispatch(loginSocial({ accessToken, provider, role }));
    },
    changeStoreDataHome: (key, value) => {
      dispatch(changeStoreDataHome(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "signUpPage", reducer });
const withSaga = injectSaga({ key: "signUpPage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SignUpPage);
