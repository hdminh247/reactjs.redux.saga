/**
 *
 * SecurityPage
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeSelectEmail, makeSelectErrors, makeSelectSecurityPage } from "./selectors";
import { createStructuredSelector } from "reselect";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import saga from "./saga";
import { clearErrors, resendCode, sendCode, sendCodeCreateNewMember, setToken } from "./actions";
import { updateError } from "containers/App/actions";
import _ from "lodash";
import "./style.scss";
//Components
import FormGroup from "components/FormGroup";
import InputForm from "components/InputForm";
import PageInfo from "components/PageInfo";
import SubmitButton from "components/SubmitButton";

const validateForm = Yup.object().shape({
  "code": Yup.string()
    .matches(/^[0-9]*$/, "Invalid code")
    .min(6, "Invalid code")
    .max(6, "Invalid code")
});

/* eslint-disable react/prefer-stateless-function */
export class SecurityPage extends React.Component {
  countDown = () => {
    if (this.state.resendTime > 0) {
      let countdown = setInterval(() => {
        let time = this.state.resendTime;
        this.setState({ resendTime: time - 1 });
        if (--time == 0) {
          clearInterval(countdown);
        }
      }, 1000);
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      resendTime: 0
    };
    this._disableButton = this._disableButton.bind(this);
  }

  UNSAFE_componentWillMount() {
    let url = window.location.href;
    let temp = url.split("?token=");
    let token = temp[1];
    this.props.setToken(token);
    this.setState({ resendTime: 30 }, () => {
      this.countDown();
    });
    this.props.clearErrors();
  }

  _disableButton(value, error) {
    //Loop through validation fields
    const keys = [
      "code"
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
    const { apiErrors } = this.props.securitypage;
    return (
      <FormGroup>
        <PageInfo title={"Security Code"}
                  content={"Please check your phone for the securiry code"}/>
        <Formik
          ref={ref => (this.formik = ref)}
          initialValues={{ code: "" }}
          enableReinitialize={true}
          validationSchema={validateForm}
          onSubmit={evt => {
            // this.setState({ isReset: true })
            this.props.onSubmit(evt.code, this.props.email);
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
            <div className="security-page">
              <form onSubmit={handleSubmit}>
                <InputForm label={"code"}
                           name={"code"}
                           type={"text"}
                           apiError={apiErrors}
                           error={errors.code}
                           value={values.code}
                           touched={touched.code}
                           onChange={evt => {
                             handleChange(evt);
                             this.props.clearErrors();
                           }}
                           onBlur={handleBlur}
                           placeholder={"6 numbers sent through your phone"}
                           showIcon={!this._disableButton(values, errors) && _.isEmpty(apiErrors)}
                           icon={"icon-checkmark"}/>
                <SubmitButton type="submit"
                              disabled={this._disableButton(values, errors) || !_.isEmpty(apiErrors)}
                              content={"verify"}/>

                {(apiErrors && !_.isEmpty(apiErrors)) ? apiErrors.map((error) => {
                  return (
                    <div className="errors" key={error.errorCode}>
                      <span className="icon-error"></span>
                      <div key={error.errorCode} className="error-item">
                        <span>{error.errorMessage}</span>
                      </div>
                    </div>
                  );
                }) : []}

              </form>
            </div>
          )}
        </Formik>
        <div className="text-center">
          <a
            className={this.state.resendTime !== 0 ? "btn forgot-style security disabled" : "btn forgot-style security"}
            onClick={() => {
              if (this.state.resendTime === 0) {
                this.setState({ resendTime: 30 }, () => {
                  this.countDown();
                });
                this.props.onClickResend(this.props.email);
              }
            }}>resend code</a>
        </div>
      </FormGroup>
    );
  }
}

SecurityPage.propTypes = {
  dispatch: PropTypes.func,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  clearErrors: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  securitypage: makeSelectSecurityPage(),
  errors: makeSelectErrors(),
  email: makeSelectEmail()
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (code, email) => {
      if (code && email) {
        dispatch(sendCode(email, code));
      } else {
        //only code with add new member with role master admin
        let url = window.location.href;
        let temp = url.split("?token=");
        let token = temp[1];
        if (code && (token && token.length > 0)) {
          dispatch(sendCodeCreateNewMember(token, code));
        } else {
          dispatch(updateError({
            error: true,
            title: "Error!!!",
            message: "Missing email or token or direct to this page is wrong"
          }));
        }
      }
    },
    onClickResend: (email) => {
      if (email) {
        dispatch(resendCode(email));
      } else {
        dispatch(updateError({
          error: true,
          title: "Error!!!",
          message: "Missing email or token or direct to this page is wrong"
        }));
      }
    },
    setToken: (token) => {
      dispatch(setToken(token));
    },
    clearErrors: () => {
      dispatch(clearErrors());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: "securityPage", reducer });
const withSaga = injectSaga({ key: "securityPage", saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(SecurityPage);
