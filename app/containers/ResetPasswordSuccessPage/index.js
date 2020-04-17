/**
 *
 * ResetPasswordSuccessPage
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { urlLink } from "helper/route";
import "./style.scss";
import BaseButton from "../../components/BaseButton";

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordSuccessPage extends React.PureComponent {
  render() {
    return (
      <div className="reset-password-success">
        <div className="logo">
          <img className='img-fluid' src="./logo.png" alt="logo"/>
        </div>
        <div className="title"><span>Password updated</span></div>
        <div className="description"><span>Your password has been updated successfully</span></div>
        <BaseButton color="primary"
                    content="Back To Home Page"
                    onClick={() => {
                      this.props.history.push(urlLink.root);
                    }}/>
      </div>
    );
  }
}

ResetPasswordSuccessPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);
export default compose(withConnect)(ResetPasswordSuccessPage);
