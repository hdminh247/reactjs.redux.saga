/**
 *
 * LoginPage
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import * as Yup from "yup";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { makeSelectErrors, makeSelectLoginPage } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { defaultAction, getLoginData, loginSocial } from "./actions";
import { changeStoreData as changeStoreDataHome } from "../HomePage/actions";
import "./style.scss";
import { urlLink } from "../../helper/route";

import FormGroup from "components/FormGroup";
import InputForm from "components/InputForm";
import { Formik } from "formik";
import SubmitButton from "components/SubmitButton";
import SocialLogin from "components/SocialLogin";
import localStoreService from "local-storage";
import _ from "lodash";


/* eslint-disable react/prefer-stateless-function */
const validateForm = Yup.object().shape({
  "email": Yup.string()
    .email("Invalid email")
    .required("Please enter email"),
  "password": Yup.string()
    .min(8, "Invalid password (At least 8 and no space characters)")
    .required("Please enter password")
});

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false
    };
  }

  UNSAFE_componentWillMount() {
    // window.localStorage.clear();
    window.sessionStorage.clear();
    this.props.default();
  }

  componentWillUnmount() {

  }

  render() {
    const { isPopup = false, linkToGo = urlLink.home } = this.props;
    const { apiError = [] } = this.props.loginpage;
    const role = localStoreService.get("role") || "customer";
    return (
      <div className={"login-wrapper"}>
        <Helmet>
          <title>Sign in</title>
          <meta name="description" content="Description of SignUpPage"/>
        </Helmet>
        <FormGroup title={"Sign In"}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{ email: "", password: "", isRemember: false }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={evt => {
              console.log("submit");
              this.props.onSubmit(evt, linkToGo);
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

              <form onSubmit={handleSubmit}>
                <InputForm label={"Email address"}
                           name={"email"}
                           type={"email"}
                           value={values.email}
                           error={errors.email}
                           touched={touched.email}
                           onChange={evt => {
                             handleChange(evt);
                           }}
                           onBlur={handleBlur}
                           placeholder={"Enter your email address"}
                           prependLabel={`<i class="blue icon-mail"/>`}
                />
                <InputForm label={"Password"}
                           name={"password"}
                           value={values.password}
                           error={errors.password}
                           touched={touched.password}
                           onChange={evt => {
                             handleChange(evt);
                           }}
                           onBlur={handleBlur}
                           type={!this.state.showPassword ? "password" : "text"}
                           placeholder={"Enter your password here"}
                           iconClassShow={"icon-invisible"}
                           iconClassHide={"icon-visible"}
                           togglePassword={() => {
                             this.setState({
                               showPassword: !this.state.showPassword
                             });
                           }}
                           showPassword={this.state.showPassword}
                           prependLabel={`<i class="blue icon-lock"/>`}
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
                <div className={"forgot-password"}>
                  <div className={"link-route"} onClick={() => {
                    if (isPopup) {
                      this.props.changeStoreDataHome("showLogin", false);
                      this.props.changeStoreDataHome("showForgotPassword", true);
                    } else
                      this.props.history.push(urlLink.forgotPassword);
                  }}>Forgot Password?
                  </div>
                </div>

                <SubmitButton
                  className="btn-login btn-orange"
                  content={"Sign In"}/>

                <div className={"sign-up text-center"}>
                  Do not have account? <span className={"link-route"}
                                             onClick={(e) => {
                                               e.preventDefault();
                                               if (isPopup) {
                                                 this.props.changeStoreDataHome("showLogin", false);
                                                 this.props.changeStoreDataHome("showSignUp", true);
                                               } else
                                                 this.props.history.push(urlLink.signUp);
                                             }}>Sign up now!
                </span>
                </div>
              </form>

            )}
          </Formik>


          <div className={"form-group-footer"}>
            <SocialLogin
              {...this.props}
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

LoginPage.propTypes = {
  default: PropTypes.func,
  onSubmit: PropTypes.func,
  loginSocial: PropTypes.func,
  isPopup: PropTypes.string,
  linkToGo: PropTypes.string,
  changeStoreDataHome: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
  errors: makeSelectErrors()
});

function mapDispatchToProps(dispatch) {
  return {
    default: () => {
      dispatch(defaultAction());
    },
    onSubmit: (evt, linkToGo) => {
      dispatch(getLoginData(evt.email, evt.password, evt.isRemember, linkToGo));
    },
    loginSocial: (accessToken, provider, role) => {
      dispatch(loginSocial({ accessToken, provider, role, linkRedirect: urlLink.home }));
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
const withReducer = injectReducer({ key: "loginPage", reducer });
const withSaga = injectSaga({ key: "loginPage", saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(LoginPage);
