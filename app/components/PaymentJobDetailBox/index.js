/**
 *
 * PaymentJobDetailBox
 *
 */

import React from "react";
import "./styles.scss";
import { PriceFormatter } from "../TableFormatter";
import { capitalizeTheFirstLetter } from "../../helper/exportFunction";
import _ from "lodash";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class PaymentJobDetailBox extends React.PureComponent {

  render() {
    const {
      estimation = {},
      total = {},
      method = "paypal",
      cards = [],
      components = {},
      tranlations = {},
      discount = {}
    } = this.props;
    let lastDigits = "", expMonth = "", expYear = "";
    if (!_.isEmpty(cards))
      [{
        lastDigits = "", expMonth = 0,
        expYear = ""
      }] = cards;
    console.log("PAYMENT JOB DETAIL BOX", this.props);
    return (
      <div className={"payment-job-detail-box"}>
        <div className={"title"}>Payment</div>
        <div className={"bg-grey"}>
          <div className={"d-table table-responsive"}>
            <div className={"d-table-row total"}>
              <div className={"d-table-cell align-middle total-text"}>Total</div>
              <div className={"d-table-cell align-middle total-price text-right"}>{PriceFormatter(total)}</div>
            </div>

            <div className={"d-table-row payment"}>
              <div className={"d-table-cell align-middle method"}>Payment Method</div>
              <div className={"d-table-cell align-middle card-info text-right"}>
                {method === "paypal" ?
                  <div><img alt={"paypal"} src={"./pay-pal.svg"}/></div>
                  : <div><img alt={"credit"} src={"./visa.svg"}/>
                    <div className={"d-inline-block text"}>**** **** **** {lastDigits}</div>
                  </div>}
              </div>

            </div>
          </div>
          <div className={"d-table table-responsive table-detail-price"}>
            {components && Object.keys(components).map(key => {
              const { rental = {}, price = {}, total = {} } = components[key];
              const { value: rentalValue = 0, unit: rentalUnit = "" } = rental;
              return (
                <div className={"d-table-row total"}>
                  <div className={"d-table-cell method align-top"}>
                    {capitalizeTheFirstLetter((tranlations && tranlations[key]) || "")} {!_.isEmpty(rental) ? `(${rentalValue} ${rentalUnit})` : ""}
                  </div>
                  <div className={"d-table-cell align-top price-info text-right"}>
                    {!_.isEmpty(total) && <div className={"total-info"}>
                      {PriceFormatter(total)}
                    </div>}

                    {!_.isEmpty(price) && !_.isEmpty(rentalUnit) && <div className={"price-info"}>
                      {PriceFormatter(price)}{` / ${rentalUnit}`}
                    </div>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={"d-table table-responsive table-detail-price"}>
            {!_.isEmpty(estimation) &&
            <div className={"d-table-row total"}>
              <div className={"d-table-cell align-middle method"}>
                Total
              </div>
              <div className={"d-table-cell align-middle price-info text-right"}>
                <div className={"total-info"}>
                  {PriceFormatter(estimation)}
                </div>
              </div>
            </div>}
          </div>
          <div className={"d-table table-responsive table-detail-price"}>
            {!_.isEmpty(discount) &&
            <div className={"d-table-row total"}>
              <div className={"d-table-cell align-middle method"}>
                Discount
              </div>
              <div className={"d-table-cell align-middle price-info text-right"}>
                <div className={"total-info"}>
                  {PriceFormatter(discount)}
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

PaymentJobDetailBox.propTypes = {};

export default PaymentJobDetailBox;
