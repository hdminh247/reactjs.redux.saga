import React from "react";
import "./style.scss";
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from "react-stripe-elements";

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class StripeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
      errorStripe: {}
    };
  }

  handleBlur = () => {
    console.log("[blur]");
  };
  handleChange = (change) => {
    console.log("[change]", change);
  };
  handleClick = () => {
    console.log("[click]");
  };
  handleFocus = () => {
    console.log("[focus]");
  };
  handleReady = () => {
    console.log("[ready]");
  };

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!");
  }

  handleSubmit = (ev) => {
    const {
      activeKey = "0",
      onSubmit = () => {
      }
    } = this.props;
    this.setState({ errorStripe: {} });
    ev.preventDefault();
    switch (activeKey) {
      case "1":
        if (this.props.stripe) {
          this.props.stripe
            .createToken()
            .then((payload) => {
              // console.log("[stripe response]", payload);

              const { error = { code: "" } } = payload;

              if (error.code)
                this.setState({ errorStripe: error });
              else {
                const { token = { id: "" } } = payload;
                onSubmit({
                  "method": "credit_card",
                  "cardToken": token.id
                });

              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Stripe.js hasn't loaded yet.");
        }
        break;

      case "2":
        onSubmit({
          "method": "paypal",
          "cardToken": ""
        });
        break;
      default:
        onSubmit({
          "method": "",
          "cardToken": ""
        });
        break;
    }

  };

  render() {
    const { errorStripe } = this.state;
    return (
      <div className="stripe-form-wrapper">
        <form id={"stripe_form"} onSubmit={this.handleSubmit}>
          <div className={"row"}>
            <div className={"col-12"}>
              <label>
                Card number
              </label>
              <CardNumberElement
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onReady={this.handleReady}
                placeholder={""}
                {...createOptions(this.props.fontSize)}
              />
            </div>
            <div className={"col-sm-6 col-8"}>
              <label>
                Exp date
              </label>
              <CardExpiryElement
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onReady={this.handleReady}
                placeholder={""}
                {...createOptions(this.props.fontSize)}
              />
            </div>
            <div className={"col-sm-3 offset-sm-3 col-4"}>
              <label>
                CVV
              </label>
              <CardCVCElement
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onReady={this.handleReady}
                placeholder={""}
                {...createOptions(this.props.fontSize)}
              />
            </div>
          </div>
          {errorStripe && errorStripe.code &&
          <div className="errors">
            <span className="icon-error"/>
            <div className="error-item">
              <span>{errorStripe.message}</span>
            </div>
          </div>
          }
        </form>
      </div>
    );
  }
}

StripeForm.propTypes = {};
export default injectStripe(StripeForm);
