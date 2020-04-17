/**
 *
 * Payout
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
import makeSelectPayout from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
import "../ProfileInfo/style.scss";
import FormChangeAccountBank from "../../components/FormChangeAccountBank";
import { getPayoutAccount, getPayoutCity, getPayoutCountry, getPayoutState } from "../HomePage/actions";
import { bankSetup } from "../StepSignUp/actions";
import { changeStoreData } from "./actions";
import InfoForm from "../../components/InfoForm";
import ClassNames from "classnames";

const AccountBankDetail = (props) => {
  const { payoutAccount = {} } = props;
  //payout
  const {
    city = {}, country = {}, state = {}, zipcode = "-",
    addressLine1 = "-", addressLine2 = "-", banks = [{ accountNumber: "" }]
  } = payoutAccount;

  const { name: cityName = "-" } = city;
  const { name: countryName = "-" } = country;
  const { name: stateName = "-" } = state;
  const [{ accountNumber: iBan = "-" }] = banks;
  return (
    <div className={"account-bank-detail"}>
      <div className="row">
        <div className="col-6"><InfoForm title={"Country"} content={countryName}/></div>
        <div className="col-6"><InfoForm title={"State"} content={stateName}/></div>
        <div className="col-6"><InfoForm title={"City"} content={cityName}/></div>
        <div className="col-6"><InfoForm title={"Zipcode"} content={zipcode}/></div>
        <div className="col-6"><InfoForm title={"Address 1"} content={addressLine1}/></div>
        <div className="col-6"><InfoForm title={"Address 2"} content={addressLine2}/></div>
        <div className="col-6"><InfoForm title={"IBAN"} content={iBan}/></div>
      </div>
    </div>
  );
};

/* eslint-disable react/prefer-stateless-function */
export class Payout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "0",
      elementFontSize: window.innerWidth < 450 ? "14px" : "18px"
    };
    window.addEventListener("resize", () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== "14px") {
        this.setState({ elementFontSize: "14px" });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== "18px"
      ) {
        this.setState({ elementFontSize: "18px" });
      }
    });
  }

  UNSAFE_componentWillMount() {
    this.props.getPayoutAccount();
    this.props.changeStoreData("isEdit", false);
  }

  render() {
    const {
      isEdit = false,
      accountBank = {}
    } = this.props.payout;
    const { payoutAccount = {} } = accountBank;
    const { country = {}, state = {} } = payoutAccount;
    const { _id: countryId = "" } = country;
    const { _id: stateId = "" } = state;


    return (
      <div className={"profile-infor-wrapper payout-wrapper"}>
        <Helmet>
          <title>Payout</title>
          <meta name="description" content="Description of Payout"/>
        </Helmet>
        {isEdit ?
          <div className={"edit"}>
            <FormChangeAccountBank {...this.props.payout}
                                   {...this.props}
                                   {...payoutAccount}
                                   btnText={"Update"}
                                   onSubmit={(e) => {
                                     this.props.bankSetup(e)
                                       .then(() => {
                                         this.props.getPayoutAccount();
                                         this.props.changeStoreData("isEdit", false);
                                       });
                                   }}/>
          </div>
          :
          <div className={"detail"}>
            <button className={ClassNames("btn btn-edit", { "d-none": isEdit === true })} onClick={() => {
              this.props.changeStoreData("isEdit", true);
              this.props.getPayOutCountry();
              this.props.getPayOutState(countryId);
              this.props.getPayOutCity(countryId, stateId);
            }}><i className="icon-pencil-1"/>Edit Payout
            </button>
            <div className={"title"}>Bank details</div>
            <div className={"sub-title"}>Set up your paytout bank account details</div>
            <AccountBankDetail {...accountBank}/>
          </div>
        }
      </div>
    );
  }
}

Payout.propTypes = {
  changeStoreData: PropTypes.func,
  getPayoutAccount: PropTypes.func,
  getPayOutCountry: PropTypes.func,
  getPayOutState: PropTypes.func,
  getPayOutCity: PropTypes.func,
  bankSetup: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  payout: makeSelectPayout()
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    getPayoutAccount: () => {
      return new Promise((resolve, reject) => {
        dispatch(getPayoutAccount(resolve, reject));
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
    bankSetup: (e) => {
      return new Promise((resolve, reject) => {
        dispatch(bankSetup(e, resolve, reject, false));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "payout", reducer });
const withSaga = injectSaga({ key: "payout", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Payout);
