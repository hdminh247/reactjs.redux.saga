/**
 *
 * ChangePassword
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { Formik } from "formik";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectChangePassword from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import InputForm from "components/InputForm";
import "./style.scss";
import ClassNames from "classnames";
import * as Yup from "yup";
import SubmitButton from "components/SubmitButton";
import { changeStoreData, putChangePassword } from "./actions";
import SuccessPopup from "../../components/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup";
import { urlLink } from "../../helper/route";
import { REGEX_PASSWORD } from "../../helper/regex";

/* eslint-disable react/prefer-stateless-function */
const validateForm = Yup.object().shape({
  "currentPassword": Yup.string()
    .min(8, "Invalid Current Password (At least 8 and no space characters)")
    .required("Please enter Current Password")
    .matches(REGEX_PASSWORD, "Invalid Current Password (No space characters)"),
  "newPassword": Yup.string()
    .min(8, "Invalid New Password (At least 8 and no space characters)")
    .required("Please enter New Password")
    .matches(REGEX_PASSWORD, "Invalid New Password (No space characters)"),
  "confirmNewPassword": Yup.string()
    .min(8, "Invalid Confirm New Password (At least 8 and no space characters)")
    .required("Please enter Confirm New Password")
    .oneOf([Yup.ref("newPassword"), null], "New Password and Confirm New Password is not the same")
    .matches(REGEX_PASSWORD, "Invalid Confirm New Password (No space characters)"),
});

export class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
    };
    this._disableButton = this._disableButton.bind(this);
  }

  _disableButton(value, error) {
    //Loop through validation fields
    const keys = [
      "currentPassword",
      "confirmNewPassword",
      "newPassword"
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

    const { showPopupError = false, showSuccessModal = false, errorText = "" } = this.props.changePassword;
    return (
      <div className="change-password-wrapper">
        <Helmet>
          <title>ChangePassword</title>
          <meta name="description" content="Description of ChangePassword" />
        </Helmet>
        <Formik
          ref={ref => (this.formik = ref)}
          initialValues={
            {
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: ""
            }
          }
          enableReinitialize={true}
          validationSchema={validateForm}
          onSubmit={evt => {
            this.props.putChangePassword(evt);
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
                  <InputForm label={"Current Password"}
                    name={"currentPassword"}
                    value={values.currentPassword}
                    error={errors.currentPassword}
                    touched={touched.currentPassword}
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    type={!this.state.currentPassword ? "password" : "text"}
                    placeholder={"Enter your current password"}
                    iconClassShow={"icon-invisible"}
                    iconClassHide={"icon-visible"}
                    togglePassword={() => {
                      this.setState({
                        currentPassword: !this.state.currentPassword
                      });
                    }}
                    showPassword={this.state.currentPassword}
                    prependLabel={`<i class="icon-lock"/>`}
                  />
                  <InputForm label={"New Password"}
                    name={"newPassword"}
                    value={values.newPassword}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    type={!this.state.showNewPassword ? "password" : "text"}
                    placeholder={"Enter your new password"}
                    iconClassShow={"icon-invisible"}
                    iconClassHide={"icon-visible"}
                    togglePassword={() => {
                      this.setState({
                        showNewPassword: !this.state.showNewPassword
                      });
                    }}
                    showPassword={this.state.showNewPassword}
                    prependLabel={`<i class="icon-lock"/>`}
                  />

                  <InputForm label={"Confirm Password"}
                    name={"confirmNewPassword"}
                    value={values.confirmNewPassword}
                    error={errors.confirmNewPassword}
                    touched={touched.confirmNewPassword}
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    type={!this.state.showConfirmNewPassword ? "password" : "text"}
                    placeholder={"Confirm your new password"}
                    iconClassShow={"icon-invisible"}
                    iconClassHide={"icon-visible"}
                    togglePassword={() => {
                      this.setState({
                        showConfirmNewPassword: !this.state.showConfirmNewPassword
                      });
                    }}
                    showPassword={this.state.showConfirmNewPassword}
                    prependLabel={`<i class="icon-lock"/>`}
                  />
                  <div className={"row"}>
                    <div className={"col-md-7"}>
                      <SubmitButton className="btn-login btn-orange"
                        // disabled={this._disableButton(values, errors) || this.props.errors.length > 0}
                        content={"Change"} />
                    </div>
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
        <SuccessPopup visible={showSuccessModal}
          title={"Change Password"}
          content={"Your password has been changed!"}
          toggle={value => {
            this.props.changeStoreData("showSuccessModal", !value);
            this.props.history.push(urlLink.profileInfor);
          }} />
        <ErrorPopup visible={showPopupError}
          title={"Change Password"}
          onSubmit={(e) => {
            this.props.changeStoreData("showPopupError", false);
          }}
          content={errorText} />
      </div>
    );
  }
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func,
  putChangePassword: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  changePassword: makeSelectChangePassword()
});

function mapDispatchToProps(dispatch) {
  return {
    putChangePassword: (data) => {
      dispatch(putChangePassword(data))
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "changePassword", reducer });
const withSaga = injectSaga({ key: "changePassword", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ChangePassword);
