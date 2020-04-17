/**
 *
 * OtherPage
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
import makeSelectOtherPage, { makeSelectDataOtherPage } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

/* eslint-disable react/prefer-stateless-function */
export class OtherPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // !value of data from route send param from index.js HomePage component
    const { data = {} } = this.props;
    const { title = "", content = "" } = data;
    // console.log(content);
    return (
      <div className={"other-page-wrapper"}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="Description of BlogDetail"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-md-8"}>
              <div className={"blog-item-wrapper"}>
                <div className={"title"}>{title}</div>
                <div className={"content"}
                     dangerouslySetInnerHTML={{ __html: content }}/>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

OtherPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  otherPage: makeSelectOtherPage()
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

const withReducer = injectReducer({ key: "otherPage", reducer });
const withSaga = injectSaga({ key: "otherPage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(OtherPage);
