/**
 *
 * ChangePasswordPage
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { makeSelectChangePasswordPage, makeSelectErrors, makeSelectErrorsForgot, makeSelectIsSent } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
//lib
import _, { findIndex, indexOf } from "lodash";
//data
import { listError } from "helper/data";
import PurpleRoundButton from "components/PurpleRoundButton";
import GhostButton from "components/GhostButton";
import { Formik } from "formik";
import * as Yup from "yup";
import InputForm from "components/InputForm";
import { changeError, changePassword, reset, sendEmail, setIsSent, showSuccess } from "./actions";
import { Modal, ModalBody, UncontrolledTooltip } from "reactstrap";
import { REGEX_PASSWORD } from "../../helper/regex";

const validateForm = Yup.object().shape({
  "recentPassword": Yup.string()
    .min(8, "Invalid password (At least 8 characters)")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)"),
  "newPassword": Yup.string()
    .min(8, "Invalid password (At least 8 characters)")
    .matches(REGEX_PASSWORD, "Invalid password (No space characters)"),
  "confirmPassword": Yup.string()
    .oneOf([Yup.ref("newPassword")], "New Password and Confirm Password is not the same")
    .min(8, "Invalid confirm password (At least 8 characters)")
    .matches(REGEX_PASSWORD, "Invalid password (No special characters)")
});
const validateForm_ForgotPassword = Yup.object().shape({
  "email": Yup.string()
    .email("Invalid Email")
});

/* eslint-disable react/prefer-stateless-function */
export class ChangePasswordPage extends React.PureComponent {
  //Clear api error
  clearApiError = (type) => {
    if (this.props.errors && this.props.errors.length > 0) {
      let index = findIndex(listError, val => val.name === type);
      if (index > -1 && indexOf(listError[index].error, this.props.errors[0].errorCode) > -1) {
        this.props.clearError();
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      forgotPassword: false,
      showConfirmModal: false
    };
    this._disableButton = this._disableButton.bind(this);
  }

  componentDidMount() {
    this.props.resetState();
  }

  _disableButton(value, error) {
    //Loop through validation fields
    const keys = [
      "recentPassword",
      "newPassword",
      "confirmPassword"
    ];
    for (let key of keys) {
      if (value[key] === null || error[key] || !value[key].toString()) {
        //If this field has error or
        return true;
      }
    }
    return false;
  }

  _disableButtonResetPassword(value, error) {
    //Loop through validation fields
    const keys = [
      "email"
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
    let { showSuccessModal } = this.props.changepasswordpage;
    let forgotPassword = (
      <Formik ref={ref => (this.formik = ref)}
              initialValues={{ email: "" }}
              enableReinitialize={true}
              validationSchema={validateForm_ForgotPassword}
              onSubmit={(evt) => {
                this.props.sendEmail(evt);
              }}>
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
            /* and other goodies */
          }) => (
          <form className="forgot-password" onSubmit={handleSubmit}>
            <div className="title"><span>Reset Password</span></div>
            <div className="description"><span>Please provide us your e-mail address and we will send you a link where you can choose a new password.</span>
            </div>
            <InputForm label={"email"}
                       name={"email"}
                       type={"email"}
                       error={errors.email}
                       value={values.email}
                       touched={touched.email}
                       onChange={evt => {
                         handleChange(evt);
                       }}
                       onBlur={handleBlur}
                       placeholder={"you@example.com"}/>
            <div className="lower">
              <GhostButton type="button" className="btn-ghost cancel" title="cancel"
                           onClick={(e) => {
                             e.preventDefault();
                             this.setState({ forgotPassword: false });
                           }}/>
              <PurpleRoundButton type={"submit"}
                                 title={"submit"}
                                 disabled={this._disableButtonResetPassword(values, errors)}
                                 className={"btn-purple-round save"}/>
            </div>
            {(this.props.errorsForgot && this.props.errorsForgot.length > 0) ? this.props.errorsForgot.map((error) => {
              return (
                <div className="errors">
                  <span className="icon-error"></span>
                  <div key={error.errorCode} className="error-item">
                    <span>{error.errorMessage}</span>
                  </div>
                </div>
              );
            }) : []}

          </form>
        )}
      </Formik>
    );
    let sendSuccess = (
      <div className="send-success">
        <div className="title"><span>Reset Password</span></div>
        <div className="description"><span>Password reset sent! We have just emailed you instructions on how to reset your password.</span>
        </div>
        <div className="action text-right">
          <PurpleRoundButton className={"btn-purple-round"} title={"Ok"} onClick={() => {
            this.setState({
              forgotPassword: false
            });
            this.props.setIsSent();
          }}/>
        </div>
      </div>
    );
    return (
      <div className="reset-password">
        <div className="header header-edit-add-page">
          <div className="action">
            <div className="return" id='return' onClick={() => {
              this.props.history.goBack();
            }}>
              <span className="icon-arrow-left"></span>
            </div>
            <UncontrolledTooltip className="base-tooltip" placement="bottom" target="return" container='return'>
              Back</UncontrolledTooltip>
          </div>
          <div className="title">
            <span>Change Password</span>
          </div>
        </div>
        <div className="content-add-edit">
          <Formik
            initialValues={{ recentPassword: "", newPassword: "", confirmPassword: "" }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={evt => {
              this.props.onSave(evt);
            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
              <form ref={form => this.form = form} id="changePassword" className="body" onSubmit={handleSubmit}>
                <div className="information recent-password">
                  <div className="row">
                    <div className="col-md-4 left">
                      <span className="title">Recent Password</span>
                    </div>
                    <div className="col-md-8 right">
                      <InputForm
                        label={"Recent Password"}
                        name={"recentPassword"}
                        value={values.recentPassword}
                        error={errors.recentPassword}
                        apiError={this.props.errors}
                        touched={touched.recentPassword}
                        onChange={evt => {
                          handleChange(evt);
                          this.clearApiError("currentPassword");
                        }}
                        onBlur={handleBlur}
                        placeholder={"At least 8 and no space characters"}
                        type={"password"}
                      />
                      <span className="forgot-password base-link" onClick={() => {
                        this.setState({ forgotPassword: true });
                      }}>Forgot Password?</span>
                    </div>
                  </div>
                </div>
                <div className="information new-password">
                  <div className="row">
                    <div className="col-md-4 left">
                      <span className="title">New Password</span>
                    </div>
                    <div className="col-md-8 right">
                      <InputForm
                        label={"New Password"}
                        name={"newPassword"}
                        value={values.newPassword}
                        error={errors.newPassword}
                        apiError={this.props.errors}
                        touched={touched.newPassword}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        placeholder={"At least 8 and no space characters"}
                        type={"password"}
                      />
                      <InputForm
                        label={"Confirm Password"}
                        name={"confirmPassword"}
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        apiError={this.props.errors}
                        touched={touched.confirmPassword}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        placeholder={"At least 8 and no space characters"}
                        type={"password"}
                      />
                      {(this.props.errors && this.props.errors.length > 0) ? this.props.errors.map((error) => {
                        return (
                          <div className="errors" key={error.errorCode}>
                            <span className="icon-error"></span>
                            <div className="error-item">
                              <span>{error.errorMessage}</span>
                            </div>
                          </div>
                        );
                      }) : ""}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <GhostButton
                    type="button"
                    className={"btn-ghost cancel"} title={"Cancel"}
                    onClick={() => {
                      this.props.history.goBack();
                    }}/>
                  <PurpleRoundButton
                    type={"button"}
                    className={"btn-purple-round"}
                    disabled={this._disableButton(values, errors) || this.props.errors.length > 0}
                    title={"Save"}
                    onClick={() => {
                      this.setState({ showConfirmModal: true });
                    }}/>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <Modal isOpen={this.state.forgotPassword} className="forgot-password-modal">
          <ModalBody>
            {this.props.isSent == true ? sendSuccess : forgotPassword}
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.showConfirmModal} className="forgot-password-modal">
          <ModalBody>
            <div className="upper">
              <div className="title">
                <span>Save This Change</span>
              </div>
              <div className="description">
                <span>Are you sure to want to save this change. This action could influence on all datas involved.</span>
              </div>
            </div>
            <div className="lower">
              <GhostButton className="btn-ghost cancel" title={"Cancel"} onClick={() => {
                this.setState({ showConfirmModal: false });
              }}/>
              <PurpleRoundButton className="btn-purple-round save"
                                 title={"Save"}
                                 type={"submit"}
                                 form={"changePassword"}
                                 onClick={() => {
                                   this.setState({ showConfirmModal: false });
                                 }}
              />
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={showSuccessModal} className="forgot-password-modal success-modal">
          <ModalBody>
            <div className="upper">
              <div className="title">
                <span>Change Password</span>
              </div>
              <div className="description">
                <span>Your password has been updated successfully.</span>
              </div>
            </div>
            <div className="lower" style={{ textAlign: "right" }}>
              <PurpleRoundButton className="btn-purple-round ok"
                                 title={"OK"}
                                 onClick={() => {
                                   this.props.showSuccess(false);
                                   this.props.history.goBack();
                                 }}/>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  dispatch: PropTypes.func,
  onSave: PropTypes.func,
  sendEmail: PropTypes.func,
  setIsSent: PropTypes.func,
  resetState: PropTypes.func,
  showSuccess: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  changepasswordpage: makeSelectChangePasswordPage(),
  errors: makeSelectErrors(),
  errorsForgot: makeSelectErrorsForgot(),
  isSent: makeSelectIsSent()
});

function mapDispatchToProps(dispatch) {
  return {
    onSave: evt => {
      if (!_.isUndefined(evt)) {
        let data = {
          recentPassword: evt.recentPassword,
          newPassword: evt.newPassword,
          confirmPassword: evt.confirmPassword
        };
        dispatch(changePassword(data));
      }
    },
    sendEmail: evt => {
      if (!_.isUndefined(evt) && !_.isUndefined(evt.email)) {
        dispatch(sendEmail(evt.email));
      }
    },
    setIsSent: () => {
      dispatch(setIsSent());
    },
    resetState: () => {
      dispatch(reset());
    },
    clearError: () => {
      dispatch(changeError({ errors: [] }));
    },
    showSuccess: (value) => {
      dispatch(showSuccess(value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: "changePasswordPage", reducer });
const withSaga = injectSaga({ key: "changePasswordPage", saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(ChangePasswordPage);
