/**
 *
 * AccountBankDetail
 *
 */

import React from "react";
import "./styles.scss";

import PropTypes from "prop-types";
import InfoForm from "../InfoForm";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class AccountBankDetail extends React.PureComponent {
  render() {
    const { paymentAccount = {}, payoutAccount = {} } = this.props;
    //payment
    const {
      method = "paypal",
      cards = [{
        lastDigits: "", expMonth: 0,
        expYear: ""
      }]
    } = paymentAccount;

    let lastDigits = "", expMonth = "", expYear = "";

    if (!_.isEmpty(cards))
      [{
        lastDigits = "", expMonth = 0,
        expYear = ""
      }] = cards;

    //payout
    const {
      city = {}, country = {}, state = {}, zipcode = "-",
      addressLine1 = "-", addressLine2 = "-", banks = [{ accountNumber: "" }]
    } = payoutAccount;

    const { name: cityName = "-" } = city;
    const { name: countryName = "-" } = country;
    const { name: stateName = "-" } = state;
    const [{ accountNumber: iBan = "" }] = banks;
    return (
      <div className={"account-bank-detail"}>
        <div className={"title"}>Withdraw to Account</div>

        {method === "credit_card" && <div className={"row credit-card"}>
          <div className="col-6"><InfoForm title={"Card number"} content={`*** - *** - *** - ${lastDigits}`}/></div>
          <div className="col-6"><InfoForm title={"EXP Date"} content={`${expMonth}/${expYear}`}/></div>
          <div className="col-md-12 line-break"/>
        </div>}

        <div className="row">
          <div className="col-6"><InfoForm title={"City"} content={cityName}/></div>
          <div className="col-6"><InfoForm title={"Zipcode"} content={zipcode}/></div>
          <div className="col-6"><InfoForm title={"Country"} content={countryName}/></div>
          <div className="col-6"><InfoForm title={"State"} content={stateName}/></div>
          <div className="col-md-12"><InfoForm title={"Address 1"} content={addressLine1}/></div>
          <div className="col-md-12"><InfoForm title={"Address 2"} content={addressLine2}/></div>
          <div className="col-md-12"><InfoForm title={"IBAN"} content={iBan}/></div>
        </div>
      </div>
    );
  }
}

AccountBankDetail.propTypes = {
  paymentAccount: PropTypes.object
};

export default AccountBankDetail;
