/**
 *
 * HistoryBookingsDetail
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectHistoryBookingsDetail from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class HistoryBookingsDetail extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>HistoryBookingsDetail</title>
          <meta
            name="description"
            content="Description of HistoryBookingsDetail"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

HistoryBookingsDetail.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  historyBookingsDetail: makeSelectHistoryBookingsDetail()
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

const withReducer = injectReducer({ key: "historyBookingsDetail", reducer });
const withSaga = injectSaga({ key: "historyBookingsDetail", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HistoryBookingsDetail);
