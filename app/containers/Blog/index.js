/**
 *
 * Blog
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
import makeSelectBlog from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getBlogList } from "../HomePage/actions";
import BlogItem from "../../components/BlogItem";
import { urlLink } from "../../helper/route";

/* eslint-disable react/prefer-stateless-function */
export class Blog extends React.PureComponent {
  UNSAFE_componentWillMount() {
    const { params = [] } = this.props.blog;
    this.props.getDriveCurrent(params);
  }

  render() {
    const { blogList = [] } = this.props.blog;
    return (
      <div className={"blog-wrapper"}>
        <Helmet>
          <title>Blog</title>
          <meta name="description" content="Description of Blog"/>
        </Helmet>
        <div className={"container"}>
          <div className={"row"}>
            {blogList.map((blog, index) => {

              return index === 0 ?
                (<div className={"col-md-12"}>
                  <BlogItem {...blog}
                            isTop={true}
                            className={"is-top"}
                            readMore={(id) => {
                              this.props.history.push(urlLink.blogDetail.replace(":id", id));
                            }}/>
                </div>)
                :
                (<div className={"col-md-4"}>
                  <BlogItem {...blog}
                            readMore={(id) => {
                              this.props.history.push(urlLink.blogDetail.replace(":id", id));
                            }}/>
                </div>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  getDriveCurrent: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  blog: makeSelectBlog()
});

function mapDispatchToProps(dispatch) {
  return {
    getDriveCurrent: params => {
      return new Promise((resolve, reject) => {
        dispatch(getBlogList(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "blog", reducer });
const withSaga = injectSaga({ key: "blog", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Blog);
