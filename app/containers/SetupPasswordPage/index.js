/**
 *
 * SetupPasswordPage
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { makeSelectErrors, makeSelectResetPasswordPage } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import FormGroup from "components/FormGroup";
import { Formik } from "formik";
import InputForm from "components/InputForm";
import * as Yup from "yup";
import SubmitButton from "components/SubmitButton";
import "./style.scss";
import { setupPassword } from "./actions";
//lib
import _ from "lodash";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { REGEX_PASSWORD } from "../../helper/regex";
/* eslint-disable react/prefer-stateless-function */
const validateForm = Yup.object().shape({
  password: Yup.string()
    .min(8, "Invalid password (At least 8 characters)")
    .required("Password is required")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)"),
  passwordConfirm: Yup.string()
    .min(8, "Invalid password confirm (At least 8 characters)")
    .oneOf([Yup.ref("password"), null], "New Password and Confirm Password is not the same")
    .required("Confirm Password is required")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)")
});

export class SetupPasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirmPassword: false
    };
  }

  render() {
    const { code = "" } = queryString.parse(this.props.history.location.search);

    return (

      <div className="setup-password-wrapper">
        <Helmet>
          <title>Set up password</title>
          <meta name="description" content="Description of SignUpPage"/>
        </Helmet>
        <FormGroup title={"Setup Password"}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{ password: "", passwordConfirm: "", code }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={evt => {
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
              <div className={this.props.errors && this.props.errors.length > 0 && "form-error-wrapper"}>
                <form onSubmit={handleSubmit}>
                  <InputForm
                    label={"New Password"}
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
                    prependLabel={`<i class="blue icon-lock"/>`}
                    iconClassShow={"icon-invisible"}
                    iconClassHide={"icon-visible"}
                    togglePassword={() => {
                      this.setState({
                        showPassword: !this.state.showPassword
                      });
                    }}
                    showPassword={this.state.showPassword}
                  />

                  <InputForm
                    label={"Confirm password"}
                    name={"passwordConfirm"}
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm}
                    touched={touched.passwordConfirm}
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    type={!this.state.showConfirmPassword ? "password" : "text"}
                    placeholder={"Enter your confirm password"}
                    prependLabel={`<i class="blue icon-lock"/>`}
                    iconClassShow={"icon-invisible"}
                    iconClassHide={"icon-visible"}
                    togglePassword={() => {
                      this.setState({
                        showConfirmPassword: !this.state.showConfirmPassword
                      });
                    }}
                    showPassword={this.state.showConfirmPassword}
                  />
                  <div className={"form-group-footer"}>
                    <SubmitButton
                      type={"submit"}
                      className={"btn-orange"}
                      content={"Submit"}
                    />
                  </div>
                  {this.props.errors && this.props.errors.length > 0
                    ? this.props.errors.map(error => {
                      return (
                        <div key={error.errorCode} className="errors">
                          <span className="icon-error"/>
                          <div className="error-item">
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

SetupPasswordPage.propTypes = {
  dispatch: PropTypes.func,
  onSubmit: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  SetupPasswordPage: makeSelectResetPasswordPage(),
  errors: makeSelectErrors()
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: evt => {
      if (!_.isUndefined(evt) && !_.isUndefined(evt.password)) {
        const { code = "", password = "" } = evt;
        dispatch(setupPassword(code, password));
      }
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: "SetupPasswordPage", reducer });
const withSaga = injectSaga({ key: "SetupPasswordPage", saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(SetupPasswordPage);
