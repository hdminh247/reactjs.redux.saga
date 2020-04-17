/**
 *
 * Payment
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import SubmitButton from "../../components/SubmitButton";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectPayment from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { Formik } from "formik";
import config from "config";
import CheckoutForm from "../../components/StepThreeSignUp/StripeForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import ClassNames from "classnames";
import "./style.scss";
import { Accordion } from "react-bootstrap";
import { Collapse, Toggle } from "react-bootstrap/Accordion";
import { changeStoreData, deleteCard, getCardList, getCurrentUser, postPaymentSetup } from "./actions";
import SuccessPopup from "../../components/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup";
import { ListGroup, ListGroupItem, PopoverBody, UncontrolledPopover } from "reactstrap";

/* eslint-disable react/prefer-stateless-function */
export class Payment extends React.Component {
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
    this.props.changeStoreData("showSuccessModal", false);
    //call api get current user
    this.props.getCardList();
    this.props.getCurrentUser().then(() => {
      // console.log("Asdasds", this.props.payment);
      if (this.props.payment.paymentAccount && this.props.payment.paymentAccount.method) {
        if (this.props.payment.paymentAccount.method === "paypal") {
          this.setState({
            activeKey: "2"
          });
        } else {
          this.setState({
            activeKey: "1"
          });
        }
      }
    });
  }

  handleSubmit(method) {
    const {
      onClosePopup = () => {
      }
    } = this.props;
    this.props.postPaymentSetup({
      "method": method
    }).then(() => {
      onClosePopup();
    });
  };

  render() {
    const {
      apiError = [],
      textSubmit = "Save",
      onSubmit = () => {
      },
      onClosePopup = () => {

      }
    } = this.props;
    const {
      showPopupError = false,
      showSuccessModal = false,
      paymentAccount = {},
      paymentError = [],
      cardList = [],
      cardListError = [],
      deleteCardSuccess = {},
      deleteCardError = {}
    } = this.props.payment;
    const { activeKey, elementFontSize } = this.state;
    // console.log("cardList", activeKey);
    return (
      <div className={"payment-wrapper"}>
        <Helmet>
          <title>Payment</title>
          <meta name="description" content="Description of Payment"/>
        </Helmet>
        <Formik
          ref={ref => (this.formik = ref)}
          initialValues={{}}
          enableReinitialize={true}
          validationSchema={{}}
          onSubmit={evt => {
            this.handleSubmit(evt);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (

            <div>
              <Accordion className={"payment-check-list-wrapper"} activeKey={activeKey}>
                <Toggle
                  type={"button"}
                  className={ClassNames("payment-item",
                    activeKey === "1" || activeKey === "0" ? "active" : "disabled"
                  )}
                  eventKey="1"
                  onClick={() => {
                    this.setState({ activeKey: "1" });
                  }}>
                  <label className={"checkbox-item"}>
                    <img src={"visa.svg"} alt={"visa"}/> Credit card (Visa, Master)
                    <input type="radio" name="radio" checked={activeKey === "1"}/>
                    <span className="checkmark"/>
                  </label>
                </Toggle>
                <Collapse eventKey="1">
                  <div className={"content-item"}>
                    {cardList && cardList.length > 0 ?
                      <div className={"card-item-wrapper"}>
                        {cardList.map((item, key) => {
                          //
                          return <div className={"card-item"}><label className={"checkbox-item"}>
                            <img src={"visa.svg"} alt={"visa"}/>
                            <span className={"card-number"}>**** **** **** ** {item.lastDigits.slice(1, 4)}</span>
                            <span className={"icon-ellypsis"} id={"delete-card"}/>
                            <UncontrolledPopover placement="bottom" target="delete-card"
                                                 className={"delete-card-wrapper"}>
                              <PopoverBody>
                                <ListGroup flush>
                                  <ListGroupItem className={"color-orange"}
                                                 onClick={() => {
                                                   this.props.deleteCard(item._id);
                                                 }}
                                  ><i className={"icon-trash"}/>Delete card</ListGroupItem>
                                </ListGroup>
                              </PopoverBody>
                            </UncontrolledPopover>
                            <input type="radio" name="radios" checked={true}/>
                            <span className="checkmark"/>
                          </label></div>;
                        })}
                      </div>
                      :
                      <div>
                        <span className={"title"}>Add new Card</span>
                        <StripeProvider apiKey={config.STRIPE_SANDBOX_PUBLISHABLE_KEY}>
                          <Elements>
                            <CheckoutForm
                              activeKey={activeKey}
                              fontSize={elementFontSize}
                              onSubmit={(e) => {
                                this.props.postPaymentSetup(e)
                                  .then(() => {
                                    onClosePopup();
                                  });
                              }}/>
                          </Elements>
                        </StripeProvider>
                      </div>
                    }
                  </div>
                </Collapse>
                <Toggle
                  type={"button"}
                  className={ClassNames("payment-item",
                    activeKey === "2" || activeKey === "0" ? "active" : "disabled"
                  )}
                  eventKey="2"
                  onClick={() => {
                    this.setState({ activeKey: "2" });
                  }}>
                  <label className={"checkbox-item"}>
                    <img src={"pay-pal.svg"} alt={"paypal"}/> PayPal
                    <input type="radio" name="radio" checked={activeKey === "2"}/>
                    <span className="checkmark"/>
                  </label>
                </Toggle>
                <Collapse eventKey="2">
                  <div className={"content-item"}>
                    You need to login to your Paypal account whenever offer for a drive!
                  </div>
                </Collapse>
              </Accordion>

              {(apiError && apiError.length > 0) ? apiError.map((error, key) => {
                return (
                  <div key={error.errorCode} className="errors">
                    <span className="icon-error"/>
                    <div className="error-item">
                      <span>{error.errorMessage}</span>
                    </div>
                  </div>
                );
              }) : null}
              <div className={"row"}>
                <div className={"col-sm-6 btn-footer"}>
                  {activeKey === "1" ?
                    cardList && cardList.length > 0 ?
                      <SubmitButton
                        className="btn-login btn-orange"
                        content={textSubmit}
                        onClick={() => {
                          this.handleSubmit("credit_card");
                        }}
                      /> :
                      <SubmitButton
                        form={"stripe_form"}
                        className="btn-login btn-orange"
                        content={textSubmit}
                      /> :
                    <SubmitButton
                      className="btn-login btn-orange"
                      content={textSubmit}
                      onClick={() => {
                        this.handleSubmit("paypal");
                      }}
                    />
                  }
                </div>
              </div>
            </div>
          )}
        </Formik>
        <SuccessPopup visible={showSuccessModal}
                      title={"Payment"}
                      content={"Your payment has been created!"}
                      toggle={value => {
                        this.props.changeStoreData("showSuccessModal", false);
                      }}/>
        <ErrorPopup visible={showPopupError}
                    title={"Payment"}
                    onSubmit={(e) => {
                      this.props.changeStoreData("showPopupError", false);
                    }}
                    content={paymentError}/>
      </div>
    );
  }
}

Payment.propTypes = {
  dispatch: PropTypes.func,
  postPaymentSetup: PropTypes.func,
  getCardList: PropTypes.func,
  getCurrentUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  onClosePopup: PropTypes.func,
  deleteCard: PropTypes.func,
  textSubmit: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment()
});

function mapDispatchToProps(dispatch) {
  return {
    postPaymentSetup: (payload) => {
      return new Promise((resolve, reject) => {
        dispatch(postPaymentSetup(payload, resolve, reject));
      });
    },
    getCardList: () => {
      dispatch(getCardList());
    },
    getCurrentUser: () => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentUser(resolve, reject));
      });
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    deleteCard: (cardId) => {
      dispatch(deleteCard(cardId));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "payment", reducer });
const withSaga = injectSaga({ key: "payment", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Payment);
