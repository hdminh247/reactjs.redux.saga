/**
 *
 * PromotionList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";
import "../HomePage/style.scss";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectPromotionList from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { changeStoreData as changeStoreDataHome, getPromotionList, getTopPromotionList } from "../HomePage/actions";
import CarouselHome from "../../components/CarouselHome";
import PromotionItem from "../../components/PromotionItem";
import { urlLink } from "../../helper/route";
import BaseButton from "../../components/BaseButton";

export const TopPromotion = (props) => {

  const {
    content = "", title = "",
    image = "",
    coupons = {},
    category = {},
    subCategory = "",
    history = []
  } = props;
  let { code = "" } = coupons;
  console.log("TopPromotion: ", props);
  const { _id: categoryId = "", key = "", allowSubCategory = false } = category;
  return (
    <div className={"description"}>
      <img alt={"item-carousel"} src={image} className={"img-fluid img-responsive"}
           onError={(e) => {
             e.target.onerror = null;
             e.target.src = "./carousel1.png";
           }}/>
      <div className={"text"}>
        <div className={"large"}>{title}</div>
        <div className={"small"} dangerouslySetInnerHTML={{ __html: content }}/>
        <div className={"line-break"}/>
        <BaseButton content={"Apply now!"}
                    className={"btn-apply"}
                    color={"green"}
                    onClick={() => {
                      let temp = { promotion: code, allowSubCategory, category: categoryId, key, subCategory };
                      history.push({ pathname: urlLink.booking, state: temp });
                    }}/>
      </div>

    </div>
  );
};

/* eslint-disable react/prefer-stateless-function */
export class PromotionList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.promotionList;
    this.props.getPromotionList(params);
    this.props.getTopPromotionList({});
  }

  render() {
    const { pagination = {}, params = {}, dataList = [], hotList = [], topPromotion = {} } = this.props.promotionList;
    return (
      <div className={"promotion-list-wrapper home-wrapper"}>
        <Helmet>
          <title>PromotionList</title>
          <meta name="description" content="Description of PromotionList"/>
        </Helmet>
        <div className={"container"}>

          <section className={"section slider top-promotions"}>
            <div className={"title"}>
              Top Promotions
            </div>
            <div className={"item-top"}>
              <TopPromotion {...topPromotion} history={this.props.history}/>
            </div>
          </section>

          <section className={"section slider hot-promotions"}>
            <div className={"title"}>
              Hot Promotions
            </div>
            <div className={"justify-content-center"}>
              <CarouselHome settings={{
                slidesToShow: 2,
                slidesToScroll: 2
              }} list={hotList}/>
            </div>
            <div className={"line-break"}/>
          </section>

          <section className={"section all-promotion"}>
            <div className={"title"}>
              All Promotions
            </div>
            <div className={"row"}>
              {dataList.map(promotion => {
                return (
                  <div className={"col-md-3"}>
                    <PromotionItem {...promotion}
                                   applyPromotion={(data) => {
                                     console.log("apply", data);
                                     this.props.history.push({ pathname: urlLink.booking, state: { ...data } });
                                   }}
                                   onView={(id) => {
                                     this.props.history.push(urlLink.promotionDetail.replace(":id", id));
                                   }}
                    />
                  </div>);
              })}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

PromotionList.propTypes = {
  getPromotionList: PropTypes.func,
  getTopPromotionList: PropTypes.func,
  changeStoreDataHome: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  promotionList: makeSelectPromotionList()
});

function mapDispatchToProps(dispatch) {
  return {
    getPromotionList: params => {
      return new Promise((resolve, reject) => {
        dispatch(getPromotionList(params, resolve, reject));
      });
    },
    getTopPromotionList: params => {
      return new Promise((resolve, reject) => {
        dispatch(getTopPromotionList(params, resolve, reject));
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

const withReducer = injectReducer({ key: "promotionList", reducer });
const withSaga = injectSaga({ key: "promotionList", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(PromotionList);
