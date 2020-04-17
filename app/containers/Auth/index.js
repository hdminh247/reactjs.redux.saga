/**
 *
 * Auth
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectAuth from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { loadRepos, reposLoaded } from "../App/actions";

import "./style.scss";
import { urlLink } from "../../helper/route";
import { HashRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
// Pages
import NotFoundPage from "../NotFoundPage";
import LoginPage from "containers/LoginPage/Loadable";
import SignUpPage from "containers/SignUpPage/Loadable";
import ForgotPassword from "containers/ForgotPasswordPage/Loadable";
import ResetPasswordPage from "containers/ResetPasswordPage/Loadable";
import ResetPasswordSuccessPage from "containers/ResetPasswordSuccessPage/Loadable";
import SetupPasswordPage from "containers/SetupPasswordPage/Loadable";
import StepSignUp from "containers/StepSignUp/Loadable";
import localStoreService from "local-storage";
import { getCurrentUser } from "./actions";
import _ from "lodash";


// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
//   facebookProvider: new firebase.auth.FacebookAuthProvider()
// };

export class Auth extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {

  }

  render() {
    const { currentUser = {}, currentUser: { firstName = "", lastName = "" } } = this.props.auth;
    const role = localStoreService.get("role") || ["customer"];

    return (
      <div className={"authenticate-wrapper"}>
        {/*<FormattedMessage {...messages.header} />*/}
        <div className={"container"}>
          <div className={"left-wrapper"}>
            <Link to={urlLink.root}>
              <img src={"logo-white-square.png"} className={"logo"} alt="logo"/>
            </Link>
            {_.isEmpty(currentUser)
              ? <div
                className={"title"}>{_.indexOf(role, "company") >= 0 ? "Thai Mobility, let’s drive with us!" : "Thai Mobility brings value to your trip"}</div>
              :
              (<div>
                  <div className={"title"}>Welcome {firstName} {lastName},</div>
                  <div className={"sub-title color-white"}>Before you can offer for a drive, you need to set up your
                    profile
                  </div>
                </div>
              )
            }
          </div>
          <div className={"right-wrapper"}>
            <Router>
              <Switch>
                <Route exact path={urlLink.login}
                       render={routeProps => (
                         <LoginPage {...routeProps}
                                    {...this.props}
                         />
                       )}
                />
                <Route exact path={urlLink.signUp}
                       render={routeProps => {
                         console.log("AUTH PROPS", this.props);
                         return <SignUpPage {...routeProps}
                                            {...this.props}
                         />;
                       }}
                />
                <Route path={urlLink.forgotPassword} component={ForgotPassword}/>
                <Route path={urlLink.setupPassword} component={SetupPasswordPage}/>
                <Route path={urlLink.resetPassword} component={ResetPasswordPage}/>
                <Route path={urlLink.resetPasswordSuccess} component={ResetPasswordSuccessPage}/>
                <Route path={urlLink.stepSignUp}
                       render={(props) => {
                         const token = localStoreService.get("token");
                         // console.log("TOKEN---------------------", token);
                         return token ?
                           <StepSignUp {...props}/> :
                           <Redirect to={urlLink.login} {...props} />;
                       }}/>
                <Route exact path={urlLink.auth} render={routeProps => (
                  <LoginPage {...routeProps}
                             {...this.props}
                  />
                )}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func,
  loadRepos: PropTypes.func,
  reposLoaded: PropTypes.func,
  getCurrentUser: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth()
});

function mapDispatchToProps(dispatch) {
  return {
    loadRepos: () => {
      dispatch(loadRepos());
    },
    reposLoaded: () => {
      dispatch(reposLoaded());
    },
    getCurrentUser: () => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentUser(resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "auth", reducer });
const withSaga = injectSaga({ key: "auth", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Auth);
