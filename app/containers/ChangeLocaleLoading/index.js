/**
 *
 * ChangeLocaleLoading
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
import makeSelectChangeLocaleLoading from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import LoadingIndicator from "../../components/LoadingIndicator";

/* eslint-disable react/prefer-stateless-function */
export class ChangeLocaleLoading extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Change Locale</title>
          <meta
            name="description"
            content="Description of ChangeLocaleLoading"
          />
        </Helmet>
        {/*<FormattedMessage {...messages.header} />*/}
        <LoadingIndicator/>
      </div>
    );
  }
}

ChangeLocaleLoading.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  changeLocaleLoading: makeSelectChangeLocaleLoading()
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "changeLocaleLoading", reducer });
const withSaga = injectSaga({ key: "changeLocaleLoading", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ChangeLocaleLoading);
