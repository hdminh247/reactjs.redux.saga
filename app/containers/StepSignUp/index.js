/**
 *
 * StepSignUp
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
import makeSelectStepSignUp from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
// Lib
import moment from "moment";
import localStoreService from "local-storage";
import _ from "lodash";

import "../LoginPage/style.scss";
import { bankSetup, changeStoreData, confirmOTP, getCountryList, getDriverInfoQuestion, licenseSetup, paymentSetup, questionSetup, resendOTP, verifyUser } from "./actions";
import { getCurrentUser } from "../Auth/actions";
import { urlLink } from "../../helper/route";
import StepOneSignUp from "../../components/StepOneSignUp/Loadable";
import StepTwoSignUp from "../../components/StepTwoSignUp/Loadable";
import StepThreeSignUp from "../../components/StepThreeSignUp/Loadable";
import { getDriverLicense, getPayoutCity, getPayoutCountry, getPayoutState } from "../HomePage/actions";
import StepSixSignUp from "../../components/StepSixSignUp";
import StepFourSignUp from "../../components/StepFourSignUp";
import StepFiveSignUp from "../../components/StepFiveSignUp";

export class StepSignUp extends React.PureComponent {
  constructor(prop) {
    super(prop);
  }

  UNSAFE_componentWillMount() {
    this.props.getCurrentUser()
      .then(user => {

        const { currentProgress = 1, role = ["customer"] } = user;
        this.props.changeStoreData("currentProgress", currentProgress);
        this.props.changeStoreData("user", user);

        if ((currentProgress === 4 && !(_.indexOf(role, "company") >= 0)) || (currentProgress === 7 && _.indexOf(role, "company") >= 0)) {
          this.props.history.push(urlLink.root);
        } else {
          switch (currentProgress) {
            case 1://get list country code in step 1
              this.props.getCountryList();
              break;
            case 4://get list payout country in step 4 (bank detail)
              this.props.getPayOutCountry();
              break;
            case 5://get list license for driver in step 5 (license detail)
              this.props.getDriverLicense();
              break;
            case 6://case 6 need get list question
              this.props.getDriverInfoQuestion();
              break;
          }
        }
      })
    ;
    this.props.changeStoreData("apiError", []);
  }

  renderSwitchPage(step = 1, apiError = []) {
    const roleSignUp = localStoreService.get("role") || "customer";
    switch (step) {
      case 1:
        return <StepOneSignUp
          {...this.props.stepsignup}
          apiError={apiError}
          onChange={(key, value) => {
            this.props.changeStoreData(key, value);
          }}
          onSubmit={(values) => {
            const dob = moment(values.dob).format("MM/DD/YYYY");
            const phoneNumber = values.phoneNumber.toString();
            const countryCode = values.countryCode.toString();
            this.props.verifyUser({ phoneNumber, dob, countryCode });
          }}/>;

      case 2:
        return <StepTwoSignUp
          {...this.props.stepsignup}
          apiError={apiError}
          resendOTP={() => {
            this.props.resendOTP();
          }}
          onSubmit={(values) => {
            const { code = "" } = values;
            this.props.confirmOTP(code);
          }}/>;

      case 3:
        return <StepThreeSignUp
          apiError={apiError}
          onSubmit={(e) => {
            this.props.paymentSetup(e);
          }}/>;

      case 4: {
        if (roleSignUp === "customer") {
          this.props.history.push(urlLink.root);
          return;
        } else {

          return <StepFourSignUp
            {...this.props}
            {...this.props.stepsignup}
            apiError={apiError}
            onSubmit={(e) => {
              this.props.bankSetup(e);
            }}/>;
        }
      }

      case 5: {
        if (roleSignUp === "customer") {
          this.props.history.push(urlLink.root);
          return;
        } else {
          return <StepFiveSignUp
            {...this.props}
            {...this.props.stepsignup}
            apiError={apiError}
            onSubmit={(e) => {
              this.props.licenseSetup(e);
            }}/>;
        }
      }

      case 6: {
        if (roleSignUp === "customer") {
          this.props.history.push(urlLink.root);
          return;
        } else {
          return <StepSixSignUp
            {...this.props}
            {...this.props.stepsignup}
            apiError={apiError}
            onSubmit={(e) => {
              this.props.questionSetup(e);
            }}/>;
        }
      }

      default:
        return <h3 className={"processing"}>Processing</h3>;
    }
  }

  render() {
    const {
      apiError = [],
      currentProgress = 1
    } = this.props.stepsignup;

    return (
      <div className={"step-sign-up-wrapper"}>
        <Helmet>
          <title>Sign up processing</title>
          <meta name="description" content="Description of SignUpPage"/>
        </Helmet>

        {this.renderSwitchPage(currentProgress, apiError)}

      </div>
    );
  }
}

StepSignUp.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  verifyUser: PropTypes.func,
  confirmOTP: PropTypes.func,
  resendOTP: PropTypes.func,
  paymentSetup: PropTypes.func,
  bankSetup: PropTypes.func,
  licenseSetup: PropTypes.func,
  questionSetup: PropTypes.func,
  getCurrentUser: PropTypes.func,
  getCountryList: PropTypes.func,
  getDriverInfoQuestion: PropTypes.func,
  getPayOutCountry: PropTypes.func,
  getPayOutState: PropTypes.func,
  getPayOutCity: PropTypes.func,
  getDriverLicense: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  stepsignup: makeSelectStepSignUp()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    verifyUser: (evt) => {
      dispatch(verifyUser(evt));
    },
    confirmOTP: (code) => {
      dispatch(confirmOTP({ code }));
    },
    resendOTP: () => {
      dispatch(resendOTP());
    },
    paymentSetup: (e) => {
      dispatch(paymentSetup(e));
    },
    bankSetup: (e) => {
      dispatch(bankSetup(e));
    },
    licenseSetup: (e) => {
      dispatch(licenseSetup(e));
    },
    questionSetup: (e) => {
      dispatch(questionSetup(e));
    },
    getCurrentUser: () => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentUser(resolve, reject));
      });
    },
    getCountryList: () => {
      return new Promise((resolve, reject) => {
        dispatch(getCountryList(resolve, reject));
      });
    },
    getDriverInfoQuestion: () => {
      return new Promise((resolve, reject) => {
        dispatch(getDriverInfoQuestion(resolve, reject));
      });
    },
    getPayOutCountry: () => {
      return new Promise((resolve, reject) => {
        dispatch(getPayoutCountry(resolve, reject));
      });
    },
    getPayOutState: (countryId) => {
      return new Promise((resolve, reject) => {
        dispatch(getPayoutState(countryId, resolve, reject));
      });
    },
    getPayOutCity: (countryId, stateId) => {
      return new Promise((resolve, reject) => {
        dispatch(getPayoutCity(countryId, stateId, resolve, reject));
      });
    },
    getDriverLicense: () => {
      dispatch(getDriverLicense());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "stepSignUp", reducer });
const withSaga = injectSaga({ key: "stepSignUp", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(StepSignUp);
