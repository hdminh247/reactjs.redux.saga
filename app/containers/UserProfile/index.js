/**
 *
 * UserProfile
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
import makeSelectUserProfile from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
import "../StepSignUp/style.scss";
import "../Auth/style.scss";

import "../../components/StepTwoSignUp/styles.scss";
// import ProfileInfo from "components/ProfileInforr";
import ProfileInfor from "containers/ProfileInfo";
import { changeStoreData, getCurrentUser } from "./actions";
import { changeStoreData as changeStoreDataProFileInfo } from "../ProfileInfo/actions";
import { urlLink } from "../../helper/route";
import ChangePassword from "containers/ChangePassword";
import Payment from "containers/Payment";
import Payout from "containers/Payout";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { Formik } from "formik";
import SubmitButton from "../../components/SubmitButton";
import ReactCodeInput from "react-verification-code-input";
import * as Yup from "yup";
import { confirmOTP, resendOTP } from "../StepSignUp/actions";
import FormGroup from "../../components/FormGroup";
import MenuList from "../../components/MenuList";
import { isSureDriver } from "../../utils/helpers";
import { makeSelectCurrentUser } from "../App/selectors";

const validateForm = Yup.object().shape({
  code: Yup.string()
    .required("Code OTP is required")
    .length(6, "Invalid OTP")
});

export class UserProfile extends React.Component {

  render() {

    const {
      apiError = [],
      user = {
        verifyData: {
          countryCode: "",
          phoneNumber: ""
        }
      },
      dataUser = {}
    } = this.props.userProfile;

    const { currentUser = {} } = this.props;
    const listLink = [
      {
        link: urlLink.profileInfor,
        text: "Profile Information"
      },
      {
        link: urlLink.changePassword,
        text: "Change Password"
      },
      {
        link: urlLink.payment,
        text: "Payment"
      }
    ];
    if (isSureDriver(currentUser)) {
      listLink.push({
        link: urlLink.payout,
        text: "Payout"
      });
    }

    return (
      <div className={"user-profile-wrapper"}>
        <Helmet>
          <title>User Profile</title>
          <meta name="description" content="Description of UserProfile"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-2 col-md-4"}>
              <MenuList
                titleMenu={"My Profile"}
                listLink={listLink}
              />
            </div>
            <div className={"col-lg-6 col-md-8"}>
              <Router>
                <Switch>
                  <Route path={urlLink.changePassword}
                         component={ChangePassword}/>
                  <Route path={urlLink.payment}
                         component={Payment}/>

                  {/* CHECK CURRENT USER IS DRIVER WILL HAVE ROUTE PAYOUT
                  ONLY DRIVE CAN PAYOUT
                  */}
                  {isSureDriver(currentUser) && <Route path={urlLink.payout}
                                                       component={Payout}/>}

                  <Route path={urlLink.profileInfor} component={ProfileInfor}/>
                  <Route path={"/"} render={(props) => <Redirect to={urlLink.profileInfor} {...props} />}/>
                </Switch>
              </Router>
            </div>
          </div>

          {/* Popup user verify */}
          <Modal isOpen={dataUser && dataUser.changePhoneNumber} className="confirm-phonenumber-modal modal-dialog-centered">
            <i className={"icon-close btn-close"} onClick={() => {
              this.props.changeStoreData(["dataUser", "changePhoneNumber"], false);
            }}/>
            <ModalBody>
              <div className={"step-sign-up-wrapper"}>
                <div className={"step-two-wrapper"}>
                  <FormGroup title={"Verify Phone number"}>
                    <Formik
                      initialValues={{
                        code: ""
                      }}
                      enableReinitialize={true}
                      validationSchema={validateForm}
                      onSubmit={evt => {
                        console.log(evt);
                        this.props.confirmOTP(evt);
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
                          <div className={"message"}>A text message with a verification code has been sent to <b className={"text-bold"}>{user.verifyData.countryCode}{user.verifyData.phoneNumber}</b>
                          </div>
                          }

                          <div className={"code-wrapper"}>
                            <ReactCodeInput className={"code-input"}
                                            values={values.code}
                                            fieldWidth={60}
                                            fieldHeight={60}
                                            autoFocus={true}
                                            onChange={value => {
                                              // console.log(value);
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
                            Didn't get a verification code? <span className={"link-route"} onClick={() => {
                            this.props.resendOTP();
                          }}>RESEND
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
                              content={"Submit"}/>

                            {/* <GhostButton title={"Cancel"} className={"btn-block btn-cancel"}
                                onClick={() => {
                                  this.props.changeStoreData(["dataUser", "changePhoneNumber"], false);
                                  this.props.changeStoreDataProfileInfo("isEdit", false);
                                }}
                              /> */}

                          </div>
                        </form>
                      )}
                    </Formik>
                  </FormGroup>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  dispatch: PropTypes.func,
  confirmOTP: PropTypes.func,
  changeStoreData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserProfile(),
  currentUser: makeSelectCurrentUser()
});

function mapDispatchToProps(dispatch) {
  return {
    confirmOTP: (code) => {
      dispatch(confirmOTP(code));
    },
    resendOTP: () => {
      dispatch(resendOTP());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeStoreDataProfileInfo: (key, value) => {
      dispatch(changeStoreDataProFileInfo(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "userProfile", reducer });
const withSaga = injectSaga({ key: "userProfile", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(UserProfile);
