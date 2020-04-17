/**
 *
 * EarningPayout
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";

import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectEarningPayout from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getPayoutAccount, getPayoutCity, getPayoutCountry, getPayoutState, getRevenueChart, getStatisticEarning, getTransactionList, postTransaction } from "../HomePage/actions";
import AccountBankDetail from "../../components/AccountBankDetail";
import moment from "moment";
import TableBase from "../../components/TableBase";
import { Formik } from "formik";
import InputForm from "../../components/InputForm";
import * as Yup from "yup";
import EarningImage from "./earning.png";
import SubmitButton from "../../components/SubmitButton";
import { PriceFormatter } from "../../components/TableFormatter";
import ConfirmPopup from "../../components/ConfirmPopup";
import { changeStoreData } from "./actions";
import { NavLink } from "react-router-dom";
import Selection from "../../components/Selection";
import { Line } from "react-chartjs-2";
import { fromJS } from "immutable";
import AccountBankPopup from "../../components/AccountBankPopup";
import { bankSetup } from "../StepSignUp/actions";
import SuccessPopup from "../../components/SuccessPopup";

const columns = [
  {
    label: "DATE & TIME START",
    dataField: "createdAt",
    dataSort: true,
    dataAlign: "",
    className: "",
    dataFormat: (cell, row) => {
      return moment(cell).format("HH:mm, DD/MM/YYYY");
    }
  },
  {
    label: "DESCRIPTION",
    dataField: "description",
    dataSort: false,
    dataAlign: "",
    className: "avatar"
  },
  {
    label: "PRICE",
    dataField: "price",
    dataSort: true,
    headerAlign: "right",
    dataAlign: "right",
    className: "",
    dataFormat: (cell, row) => {
      const { amount = { unit: "$", value: 0 }, type = "partialTransfer" } = row;
      let temp = type === "partialTransfer" ? "+ " : "- ";
      return <div>{temp} {PriceFormatter(amount)}</div>;
    }
  }
];

// const optionLineChart = {
//   responsive: true,
//   maintainAspectRatio: false,
//   responsiveAnimationDuration: 1000,
//   scales: {
//     xAxes: [{
//       gridLines: {
//         display: false
//       },
//       stacked: true
//     }],
//     yAxes: [{
//       gridLines: {
//         display: false
//       },
//       ticks: {
//         suggestedMin: 0,
//         suggestedMax: 500
//       }
//     }]
//   },
//   tooltips: {
//     position: "nearest",
//     displayColors: false,
//     borderWidth: 0,
//     cornerRadius: 0,
//     backgroundColor: "rgba(0,0,0,1)",
//     titleFontSize: 0,
//     bodyFontSize: 32,
//     footerFontSize: 14,
//     footerFontColor: "rgba(255,255,255,0.5)",
//     width: 300,
//     callbacks: {
//       title: () => {
//         return "";
//       },
//       label: (tooltipItem, data) => {
//         // console.log(tooltipItem);
//         const { yLabel = "" } = tooltipItem;
//         return yLabel + "€";
//       },
//       footer: (tooltipItem, data) => {
//         // console.log(tooltipItem);
//         const [{ xLabel = "" }] = tooltipItem;
//         return xLabel;
//       }
//     }
//   }
// };

const legendSquareOpts = {
  display: false,
  position: "bottom",
  fullWidth: true,
  reverse: false,
  labels: {
    fontSize: 9,
    fontColor: "#9b9b9b",
    boxWidth: 9,
    padding: 12
  }
};

const periodDropdown = [
  { label: "Daily", value: "daily" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" }
];

const validateForm = Yup.object().shape({
  "amount": Yup.number()
    .positive("Amount is not positive number")
    .required("Please enter amount")
});

/* eslint-disable react/prefer-stateless-function */
export class EarningPayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getData() {
    const { paramsChart = {}, paramsTransaction = {} } = this.props.earningPayout;
    this.props.getRevenueChart(paramsChart);
    this.props.getStatisticEarning();
    this.props.getTransactionList(paramsTransaction);
    this.props.getPayoutAccount();
  }

  renderPopupContent = () => {
    const { dataSubmit = {}, accountBank = {} } = this.props.earningPayout;
    const { amount: value = "", unit = "" } = dataSubmit;

    return (
      <div className={"text-left"}>
        <div className={"title-popup"}>You are request payout amount</div>
        <div className={"amount"}>{PriceFormatter({ value, unit })}</div>
        <AccountBankDetail {...accountBank}/>
        <div className={"line-break"}/>
        <div className={"term"}>By submitting this payout request I confirm that I have read and understood Thai's
          Mobility <NavLink className={"color-blue cursor-pointer"} to={"/home/terms-and-condition"}><strong><u>Terms and
            Conditions</u></strong></NavLink>
        </div>
      </div>);
  };

  UNSAFE_componentWillMount() {
    this.getData();
  }

  render() {

    const {
      dataSubmit = {},
      showConfirmPayout = false,
      showFormChangeAccountBank = false,
      paramsTransaction = {},
      transactionList = [],
      optionLineChart = {},
      statistic: {
        accepted = 0,
        amount = 0,
        completed = 0
      },
      revenueChart = {
        "labels": [
          "Error"
        ],
        "datasets": [
          {
            "data": [
              0
            ]
          }
        ]
      },
      paramsChart = {},
      accountBank = {},
      accountBank: {
        balance = { amount: 0, unit: "€" },
        paymentAccount = {
          method: "paypal"
        },
        payoutAccount = {}
      },
      successContent = {
        visible: false
      }
    } = this.props.earningPayout;

    //payout
    const {
      banks = [{ accountNumber: "" }]
    } = payoutAccount;

    const [{ _id: bankId = "" }] = banks;
    const { country = {}, state = {} } = payoutAccount;
    const { _id: countryId = "" } = country;
    const { _id: stateId = "" } = state;
    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradientBg = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
      gradientBg.addColorStop(0.000, "rgba(0, 154, 247, 0.000)");
      gradientBg.addColorStop(1.000, "rgba(0, 154, 247, 0.12)");

      const gradientLine = ctx.createLinearGradient(253.333, 300.000, 46.667, 0.000);
      gradientLine.addColorStop(0.020, "rgba(0, 154, 247, 1.000)");
      gradientLine.addColorStop(1.000, "rgba(16, 48, 156, 1.000)");

      // console.log("revenueChart", revenueChart);
      let immutiableTemp = fromJS(revenueChart);
      immutiableTemp = immutiableTemp.setIn(["datasets", 0, "backgroundColor"], gradientBg);
      immutiableTemp = immutiableTemp.setIn(["datasets", 0, "borderColor"], gradientLine);

      // console.log(immutiableTemp.toJS());
      return immutiableTemp.toJS();
    };

    return (
      <div className={"earning-payout-wrapper"}>
        <Helmet>
          <title>Earning & Payout</title>
          <meta name="description" content="Description of EarningPayout"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-md-8"}>
              <div className={"bg-grey left-upper"}>
                <div className={"statistic"}>
                  <div className={"d-inline-block category"}>
                    <div className={"title"}>Total Trip success</div>
                    <div className={"value"}>{eval(amount).toFixed(2)}</div>
                  </div>
                  <div className={"d-inline-block category"}>
                    <div className={"title"}>Accepted Drive</div>
                    <div className={"value"}>{accepted}</div>
                  </div>
                  <div className={"d-inline-block category"}>
                    <div className={"title"}>Completed Jobs</div>
                    <div className={"value"}>{completed}</div>
                  </div>
                </div>
                <div className={"chart"}>
                  <Formik
                    ref={ref => (this.chartForm = ref)}
                    initialValues={{ period: "" }}
                    enableReinitialize={true}
                    onSubmit={values => {
                      console.log("submit", values);
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
                        <Selection
                          className={"d-inline-block"}
                          name={"period"}
                          prependLabel={"<i class=\"icon color-bluey-grey icon-calendar\"/>"}
                          value={values.period}
                          options={periodDropdown}
                          placeholder={`Period`}
                          onChange={(option) => {
                            setFieldValue("period", option);
                            const { value = "" } = option;
                            this.props.getRevenueChart({ ...paramsChart, period: value });
                          }}
                        />
                      </form>
                    )}
                  </Formik>


                  <div className={"line-chart"}>
                    <Line
                      data={data}
                      height={306}
                      options={optionLineChart}
                      legend={legendSquareOpts}
                    />
                  </div>


                </div>
              </div>

              <div className={"transaction-wrapper"}>
                <TableBase
                  title={`Transaction`}
                  model="transaction"
                  tableData={transactionList}
                  tableColumn={columns}
                  baseParams={paramsTransaction}
                  onChangeParams={params => {
                    this.props.getTransactionList(params);
                  }}
                />
              </div>
            </div>
            <div className={"col-md-4"}>
              <div className={"right bg-grey"}>
                <img className={"img-responsive img-top"} src={EarningImage} alt={"earning"}/>
                <div className={"bank"}>
                  <div className={"total-balance d-table table-responsive"}>
                    <div className={"label d-table-cell align-middle"}>Total Balance</div>
                    <div className={"value d-table-cell align-middle text-right"}>{balance.amount} {balance.unit}</div>
                  </div>
                  <Formik
                    ref={ref => (this.formik = ref)}
                    initialValues={{ amount: "" }}
                    enableReinitialize={true}
                    validationSchema={validateForm}
                    onSubmit={evt => {
                      this.props.changeStoreData("showConfirmPayout", true);
                      this.props.changeStoreData("dataSubmit", { ...evt, unit: balance.unit });
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

                      <form onSubmit={handleSubmit}>
                        <InputForm label={"Withdraw Amount"}
                                   name={"amount"}
                                   type={"number"}
                                   min={0}
                                   value={values.amount}
                                   error={errors.amount}
                                   touched={touched.amount}
                                   onChange={evt => {
                                     handleChange(evt);
                                   }}
                                   onBlur={handleBlur}
                                   placeholder={"Enter your amount"}
                                   prependLabel={`<i class="blue icon-money"/>`}
                        />
                        <AccountBankDetail {...accountBank}/>
                        <div className={"edit-account"}>
                          <strong><u className={"text-underline color-blue cursor-pointer"} onClick={() => {
                            this.props.getPayOutCountry();
                            this.props.changeStoreData("showFormChangeAccountBank", true);
                            this.props.getPayOutCountry();
                            this.props.getPayOutState(countryId);
                            this.props.getPayOutCity(countryId, stateId);
                          }}>Edit Account Info</u></strong>
                        </div>
                        <SubmitButton content={"Withdraw"} className={"btn-orange"}/>
                      </form>
                    )}
                  </Formik>

                </div>
              </div>
            </div>
          </div>
        </div>

        <ConfirmPopup visible={showConfirmPayout}
                      key={0}
                      confirmText={"Confirm"}
                      className={"confirm-payout-wrapper"}
                      content={this.renderPopupContent()}
                      cancelText={"Cancel"}
                      onSubmit={() => {
                        const { amount = 0 } = dataSubmit;
                        this.props.postTransaction({ amount, bankId }).then(() => {
                          this.formik.resetForm();
                          this.getData();
                          this.props.changeStoreData("showConfirmPayout", false);
                          this.props.changeStoreData("successContent",
                            {
                              visible: true,
                              title: "Payout Request Submitted",
                              content: "Your payout request has been sent successfully. You will receive confirmation email as soon as your request processed. Thank you."
                            });
                        });

                      }}
                      onCancel={() => {
                        this.props.changeStoreData("showConfirmPayout", false);
                      }}
        >
        </ConfirmPopup>

        {/*TODO: params for call function get city, state, city*/}
        <AccountBankPopup {...this.props.earningPayout}
                          {...this.props}
                          {...accountBank}
                          visible={showFormChangeAccountBank}
                          confirmText={"Update"}
                          key={1}
                          className={"confirm-change-bank-account-wrapper"}
                          toggle={() => {
                            const { showFormChangeAccountBank = false } = this.props.earningPayout;
                            this.props.changeStoreData("showFormChangeAccountBank", !showFormChangeAccountBank);
                          }}
                          onSubmit={(e) => {
                            this.props.bankSetup(e)
                              .then(() => {
                                this.props.getPayoutAccount();
                                this.props.changeStoreData("showFormChangeAccountBank", false);
                              });
                          }}
                          onCancel={() => {
                            this.props.changeStoreData("showFormChangeAccountBank", false);
                          }}
        >
        </AccountBankPopup>

        <SuccessPopup {...successContent}
                      className={"payout-success-wrapper"}
                      toggle={value => {
                        this.props.changeStoreData(["successContent", "visible"], !value);
                      }}/>
      </div>
    );
  }
}

EarningPayout.propTypes = {
  getPayoutAccount: PropTypes.func,
  getStatisticEarning: PropTypes.func,
  getTransactionList: PropTypes.func,
  getRevenueChart: PropTypes.func,
  changeStoreData: PropTypes.func,
  postTransaction: PropTypes.func,
  getPayOutCountry: PropTypes.func,
  getPayOutState: PropTypes.func,
  getPayOutCity: PropTypes.func,
  bankSetup: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  earningPayout: makeSelectEarningPayout()
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
    getStatisticEarning: () => {
      return new Promise((resolve, reject) => {
        dispatch(getStatisticEarning(resolve, reject));
      });
    },
    getTransactionList: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(getTransactionList(params, resolve, reject));
      });
    },
    postTransaction: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(postTransaction(params, resolve, reject));
      });
    },
    getRevenueChart: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(getRevenueChart(params, resolve, reject));
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

const withReducer = injectReducer({ key: "earningPayout", reducer });
const withSaga = injectSaga({ key: "earningPayout", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(EarningPayout);
