/**
 *
 * FeaturedDestinationPage
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
import makeSelectFeaturedDestinationPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectFeatureListDataHomePage } from "../HomePage/selectors";
import FeaturedDestinationsItem from "../../components/FeaturedDestinationsItem";

/* eslint-disable react/prefer-stateless-function */
export class FeaturedDestinationPage extends React.PureComponent {
  render() {
    const { featuredDestinationList = [], history = [] } = this.props;
    return (
      <div className={"featured-destination-page-wrapper"}>
        <Helmet>
          <title>Featured Destination</title>
          <meta
            name="description"
            content="Description of FeaturedDestinationPage"
          />
        </Helmet>
        <div className={"container"}>
          <div className={"title"}>Featured Destination</div>
          <div className={"row"}>
            {featuredDestinationList.map(feature => {
              return <div className={"col-md-4"}>
                <FeaturedDestinationsItem {...feature} history={history}/>
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

FeaturedDestinationPage.propTypes = {
  featuredDestinationList: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  featuredDestinationPage: makeSelectFeaturedDestinationPage(),
  featuredDestinationList: makeSelectFeatureListDataHomePage()
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "featuredDestinationPage", reducer });
const withSaga = injectSaga({ key: "featuredDestinationPage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(FeaturedDestinationPage);
