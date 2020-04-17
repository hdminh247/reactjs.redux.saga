/**
 *
 * PromotionDetail
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
import makeSelectPromotionDetail from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import _ from "lodash";
import { changeStoreData as changeStoreDataHome, getPromotionDetail } from "../HomePage/actions";
import { makeSelectFeatureListDataHomePage } from "../HomePage/selectors";
import BaseButton from "../../components/BaseButton";
import { urlLink } from "../../helper/route";
import FeaturedDestinationsSection from "../../components/FeaturedDestinationsSection";

/* eslint-disable react/prefer-stateless-function */
export class PromotionDetail extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { id = "" } = this.props.match.params;
    const { id: prevId = "" } = prevProps.match.params;
    if (prevId !== id) {
      const { id = "" } = this.props.match.params;
      this.props.getDetail(id);
    }
  }

  UNSAFE_componentWillMount() {
    const { id = "" } = this.props.match.params;
    this.props.getDetail(id);
  }


  render() {
    const {
      promotionDetail: {
        image = "",
        title = "",
        description = "",
        content = "",
        coupons = [{}],
        category = {},
        subCategory = ""
      }
    } = this.props.promotionDetail;
    let code = "";
    if (!_.isEmpty(coupons)) {
      [{ code = "" }] = coupons;
    }
    const { key = "", _id: categoryId = "", allowSubCategory = false } = category;
    const { featuredDestinationsList = [] } = this.props;
    return (
      <div className={"promotion-detail-wrapper"}>
        <Helmet>
          <title>Promotion Detail</title>
          <meta name="description" content="Description of PromotionDetail"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row upper-section"}>
            <div className={"col-md-6"}>
              <div className={"image-wrapper"}>
                <img className={"image"}
                     src={image}
                     onError={e => {
                       e.target.onerror = null;
                       e.target.src = "./image-not-found.png";
                     }}
                     alt={"blog-item"}/>

              </div>

            </div>
            <div className={"col-md-6"}>
              <div className={"promotion-title"}>
                {title}
              </div>
              <div className={"promotion-description"}>
                {description}
              </div>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <BaseButton content={"Apply now!"} color={"green"} className={"btn-block"}
                              onClick={() => {
                                this.props.history.push({ pathname: urlLink.booking, state: { promotion: code, category: categoryId, allowSubCategory, key, subCategory } });
                              }}
                  />
                </div>
              </div>
              <div className={"line-break"}/>

              <div className={"promotion-content ellipsis"}
                   dangerouslySetInnerHTML={{ __html: content.replace(/<img[^>]*>/g, "") }}/>
            </div>
          </div>

          <FeaturedDestinationsSection list={featuredDestinationsList}/>
        </div>
      </div>
    );
  }
}

PromotionDetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  changeStoreDataHome: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  promotionDetail: makeSelectPromotionDetail(),
  featuredDestinationsList: makeSelectFeatureListDataHomePage()
});

function mapDispatchToProps(dispatch) {
  return {
    getDetail: id => {
      return new Promise((resolve, reject) => {
        dispatch(getPromotionDetail(id, resolve, reject));
      });
    },
    changeStoreDataHome: (key, value) => {
      dispatch(changeStoreDataHome(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "promotionDetail", reducer });
const withSaga = injectSaga({ key: "promotionDetail", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(PromotionDetail);
