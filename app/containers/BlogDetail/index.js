/**
 *
 * BlogDetail
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";

import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import ClassNames from "classnames";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectBlogDetail from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getBlogDetail, getRelateBlogList } from "../HomePage/actions";
import BlogItem from "../../components/BlogItem";
import { urlLink } from "../../helper/route";


/* eslint-disable react/prefer-stateless-function */
export class BlogDetail extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { isRelate = false } = this.props;
    const { id = "" } = this.props.match.params;
    const { id: prevId = "" } = prevProps.match.params;
    if (prevId !== id) {
      const { id = "" } = this.props.match.params;
      this.props.getDetail(id);
      if (isRelate)
        this.props.getRelateBlogList(id);
    }
  }

  UNSAFE_componentWillMount() {
    const { id = "" } = this.props.match.params;
    const { isRelate = false } = this.props;
    this.props.getDetail(id);
    if (isRelate)
      this.props.getRelateBlogList(id);
  }

  render() {
    const { isRelate = false } = this.props;
    const {
      blogDetail = {},
      relatedBlogList = []
    } = this.props.blogDetail;

    return (
      <div className={"blog-detail-wrapper"}>
        <Helmet>
          <title>Blog Detail</title>
          <meta name="description" content="Description of BlogDetail"/>
        </Helmet>
        <div className={"container"}>
          <div className={ClassNames(isRelate && "row")}>
            <div className={ClassNames(isRelate && "col-md-8")}>
              <BlogItem {...blogDetail} className={"main"}/>
            </div>
            <div className={ClassNames(isRelate && "col-md-4 related-posts-wrapper")} hidden={!isRelate}>
              <div className={"title-relate"}>
                Related Posts
              </div>
              <div className={"related-post-list"}>
                {relatedBlogList.map(blog => {
                  return <BlogItem {...blog} content={""}
                                   readMore={(id) => {
                                     this.props.history.push(urlLink.blogDetail.replace(":id", id));
                                   }}
                  />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlogDetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  getRelatedBlog: PropTypes.func,
  isRelate: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  blogDetail: makeSelectBlogDetail()
});

function mapDispatchToProps(dispatch) {
  return {
    getDetail: id => {
      return new Promise((resolve, reject) => {
        dispatch(getBlogDetail(id, resolve, reject));
      });
    },
    getRelateBlogList: id => {
      return new Promise((resolve, reject) => {
        dispatch(getRelateBlogList(id, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "blogDetail", reducer });
const withSaga = injectSaga({ key: "blogDetail", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(BlogDetail);
