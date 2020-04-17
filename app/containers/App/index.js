/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from "react";
import { HashRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser, makeSelectGlobalData, makeSelectLoading, makeSelectLoadingScript } from "./selectors";
import { changeAppStoreData, loadRepos, loadScriptRepos, reposLoaded, reposScriptLoaded, saveCurrentUser, updateError } from "./actions";
import { compose } from "redux";
import { Scrollbars } from "react-custom-scrollbars";
import axios from "axios";
import localStoreService from "local-storage";
import PropTypes from "prop-types";
import ClassNames from "classnames";
// Containers
import NotFoundPage from "containers/NotFoundPage/Loadable";
import HomePage from "containers/HomePage";
import Auth from "containers/Auth/Loadable";
// Components
import LoadingIndicator from "components/LoadingIndicator";
import ErrorPopup from "components/ErrorPopup";
import { urlLink } from "../../helper/route";
import { makeSelectLocale } from "../LanguageProvider/selectors";
// Font awesome setting
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faLock, faMapMarkedAlt, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import SuccessPopup from "../../components/SuccessPopup";
import ChangeLocaleLoading from "../ChangeLocaleLoading";
// import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import _ from "lodash";
import * as firebase from "firebase/app";
import config from "config";
import withFirebaseAuth from "react-with-firebase-auth";

const firebaseConfig = {
  apiKey: config.fireBase.apiKey,
  authDomain: config.fireBase.authDomain,
  databaseURL: config.fireBase.databaseURL,
  projectId: config.fireBase.projectId,
  storageBucket: config.fireBase.storageBucket,
  messagingSenderId: config.fireBase.messagingSenderId,
  appId: config.fireBase.appId,
  measurementId: config.fireBase.measurementId
};
if (!firebaseAppAuth)
  firebaseAppAuth = firebase.initializeApp(firebaseConfig).auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider()
};

library.add(
  fab,
  far,
  faChevronDown, faLock, faUser, faPowerOff, faMapMarkedAlt, faTimesCircle
);

// --------------------axios setting headers to request API-----------------------------------
axios.defaults.headers.common["Authorization"] = "Bearer " + localStoreService.get("token");
// -------------------------------------------------------------------------------------------
const locationPreventDirect = [urlLink.home, urlLink.root, urlLink.login];
export const toastySetting = {
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
  pauseOnHover: false,
  pauseOnVisibilityChange: false,
  className: "toast-container",
  toastClassName: "toast-notification"
};

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    axios.defaults.headers.common["lang"] = localStoreService.get("locale") || "en";
    axios.interceptors.request.use(
      config => {
        // Do something before request is sent
        // this.props.loadRepos();
        return config;
      },
      error => {
        // Do something with request error
        this.props.reposLoaded();

        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      response => {
        // Do something with response data
        // this.props.reposLoaded();
        return response;
      },
      error => {
        // Do something with response
        this.props.reposLoaded();

        if (error && error.response) {
          const { status = 0 } = error.response;
          console.log("status-----------", status);

          // unauthorized

          if (status === 401) {
            //logic logout will clear local store
            this.props.saveCurrentUser({});
            localStoreService.clear();

            console.log("locationPreventDirect", _.indexOf(locationPreventDirect, this.props.location.pathname));

            if (_.indexOf(locationPreventDirect, this.props.location.pathname) === -1)
              this.props.history.push(urlLink.home);
          }
        }
        return Promise.reject(error);
      }
    );

    this.props.saveCurrentUser(localStoreService.get("user") || "");
    this.props.history.listen((location, action) => {
      // console.log("on route change");
      if (this.scrollbar)
        this.scrollbar.scrollTop(0);
    });
  }

  componentDidMount() {
    // ! THIS BLOCK CODE WILL HANDLE FOR MOBILE AND NOT LOGIN IS LOADED ALL SCRIPT
    const token = localStoreService.get("token");

    if (window.innerWidth < 1199 && _.isEmpty(token)) {
      this.props.loadScriptRepos();
      window.addEventListener("load", () => {
        this.props.reposScriptLoaded();
      });
    }
    //  ! --------------------------------------------------------------
  }

  componentWillUnmount() {
    // document.removeEventListener("socketconnect", function() {
    //   console.log("remove event socketconnect");
    // });
  }

  render() {
    const { loading = false, loadingScript = false, locale = "en", currentUser = {} } = this.props;
    // console.log("APP PROPS", loadingScript);
    const {
      globalError = {
        error: false,
        title: "Error!!!",
        message: "Message",
        errorCode: 0
      },
      globalSuccess = {
        show: false,
        title: "Success!!!",
        message: "Message"
      }
    } = this.props.globalData;

    return (
      <Scrollbars
        ref={s => {
          this.scrollbar = s;
        }}
        universal={true}
        autoHeightMin={0}
        // This will activate auto hide
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
      >
        <Helmet>
          <html lang={locale}/>
        </Helmet>
        <div className={ClassNames(`thai-mobility`, locale)}>
          <Router>
            <Switch>
              <Route exact path="/"
                     render={routeProps => (
                       <HomePage {...routeProps}
                                 {...this.props}
                                 currentUser={currentUser}
                       />
                     )}
              />
              <Route path={urlLink.home}
                     render={routeProps => (
                       <HomePage {...routeProps}
                                 {...this.props}
                                 currentUser={currentUser}
                       />
                     )}
              />
              <Route path={urlLink.auth}
                     render={routeProps => (
                       <Auth {...routeProps}
                             {...this.props}
                             currentUser={currentUser}
                       />
                     )}
              />
              <Route path={urlLink.changingLocale} component={ChangeLocaleLoading}/>

              <Route path="" component={NotFoundPage}/>
            </Switch>
          </Router>

          {loading && <LoadingIndicator/>}
          {loadingScript && <LoadingIndicator/>}

          <ToastContainer {...toastySetting} pauseOnFocusLoss={false}/>

          <ErrorPopup
            visible={globalError.error}
            title={globalError.title}
            content={globalError.message}
            errorCode={globalError.errorCode}
            btnText={"OK"}
            className={"float-right"}
            onSubmit={() => {
              this.props.updateError({
                error: false,
                title: "",
                message: ""
              });
            }}
            exitApp={() => {
              this.props.exitApp();
            }}
          />

          <SuccessPopup {...globalSuccess}
                        toggle={value => {
                          this.props.changeStoreData(["globalSuccess", "visible"], !value);
                        }}/>
        </div>
      </Scrollbars>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  updateError: PropTypes.func,
  saveCurrentUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  loadScriptRepos: PropTypes.func,
  reposScriptLoaded: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loadingScript: makeSelectLoadingScript(),
  globalData: makeSelectGlobalData(),
  currentUser: makeSelectCurrentUser(),
  locale: makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
  return {
    updateError(data) {
      dispatch(updateError(data));
    },
    loadRepos() {
      dispatch(loadRepos());
    },
    reposLoaded() {
      dispatch(reposLoaded());
    },
    loadScriptRepos() {
      dispatch(loadScriptRepos());
    },
    reposScriptLoaded() {
      dispatch(reposScriptLoaded());
    },
    saveCurrentUser(user) {
      dispatch(saveCurrentUser(user));
    },
    changeStoreData(key, value) {
      dispatch(changeAppStoreData(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withFirebaseAuth({
    providers,
    firebaseAppAuth
  }),
  withConnect,
  withRouter
)(App);
