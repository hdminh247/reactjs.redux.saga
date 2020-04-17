/**
 *
 * ResetPasswordPage
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
import { clearError, resetPassword } from "./actions";
import ClassNames from "classnames";
//lib
import _ from "lodash";
import { REGEX_PASSWORD } from "../../helper/regex";
/* eslint-disable react/prefer-stateless-function */
const validateForm = Yup.object().shape({
  "password": Yup.string()
    .min(8, "Invalid password (At least 8 and no space characters)")
    .required("Please enter new password")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)"),
  "passwordConfirm": Yup.string()
    .min(8, "Invalid password confirm (At least 8 and no space characters)")
    .required("Please enter confirm new password")
    .oneOf([Yup.ref("password"), null], "New Password and Confirm Password is not the same")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)")
});

export class ResetPasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirmPassword: false
    };
    this._disableButton = this._disableButton.bind(this);
  }

  _disableButton(value, error) {
    //Loop through validation fields
    const keys = [
      "passwordConfirm",
      "password"
    ];
    for (let key of keys) {
      if (value[key] === null || error[key] || !value[key].toString()) {
        //If this field has error or
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className={"reset-password-wrapper"}>
        <FormGroup title={"Reset password"}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{ password: "", passwordConfirm: "" }}
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
              <div className={ClassNames({ "form-error-wrapper": this.props.errors && this.props.errors.length > 0 })}>
                <form onSubmit={handleSubmit}>
                  <InputForm label={"New Password"}
                             name={"password"}
                             value={values.password}
                             error={errors.password}
                             touched={touched.password}
                             onChange={evt => {
                               handleChange(evt);
                               this.props.clearError();
                             }}
                             onBlur={handleBlur}
                             type={!this.state.showPassword ? "password" : "text"}
                             placeholder={"Enter your new password"}
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

                  <InputForm label={"Confirm Password"}
                             name={"passwordConfirm"}
                             value={values.passwordConfirm}
                             error={errors.passwordConfirm}
                             touched={touched.passwordConfirm}
                             onChange={evt => {
                               handleChange(evt);
                               this.props.clearError();
                             }}
                             onBlur={handleBlur}
                             type={!this.state.showConfirmPassword ? "password" : "text"}
                             placeholder={"Confirm your new password"}
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
                  <div className={"form-group-footer"}>
                    <SubmitButton className="btn-login btn-orange"
                                  content={"Submit"}/>
                  </div>
                </form>
                {(this.props.errors && this.props.errors.length > 0) ? this.props.errors.map((error) => {
                  return (
                    <div key={error.errorCode} className="errors">
                      <span className="icon-error"></span>
                      <div className="error-item">
                        <span>{error.errorMessage}</span>
                      </div>
                    </div>
                  );
                }) : []}
              </div>
            )}
          </Formik>
        </FormGroup>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  dispatch: PropTypes.func,
  onSubmit: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  resetpasswordpage: makeSelectResetPasswordPage(),
  errors: makeSelectErrors()
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (evt) => {
      if (!_.isUndefined(evt) && !_.isUndefined(evt.password)) {
        const urlString = window.location.href;
        let url = urlString.split("?code=");
        let code = url[1];
        dispatch(resetPassword(code, evt.password));
      }
    },
    clearError: () => {
      dispatch(clearError());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: "resetPasswordPage", reducer });
const withSaga = injectSaga({ key: "resetPasswordPage", saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(ResetPasswordPage);
