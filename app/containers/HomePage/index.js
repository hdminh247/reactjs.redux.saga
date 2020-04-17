/**
 *
 * HomePage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectHomePage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectCurrentUser } from "../App/selectors";
import { getCurrentUser } from "../Auth/actions";
import {
  changeStoreData,
  deleteNotifications,
  getCategory,
  getCurrentBookings,
  getDriveBiddingList,
  getDriveHistoryList,
  getFeaturedDestinationList,
  getHistoryBooking,
  getJobDetail,
  getJobRequestList,
  getNotificationList,
  getOffersList,
  getOtherPageList,
  getRaceCourse,
  getSubCategory,
  getTopBookingList,
  logout,
  readNotifications
} from "./actions";
import "./style.scss";
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import { Nav, NavbarBrand, NavItem } from "reactstrap";
// URL LINK
import { urlLink } from "../../helper/route";
import { slide as Menu } from "react-burger-menu";

import LoginPopup from "../../components/LoginPopup";
import { makeSelectLoginPage } from "../LoginPage/selectors";
import { getLoginData, loginSocial } from "../LoginPage/actions";
import SuccessPopup from "../../components/SuccessPopup";
import WarningPopup from "../../components/WarningPopup";
// Pages
import MainPage from "containers/MainPage/Loadable";
import Blog from "containers/Blog";
import BlogDetail from "../BlogDetail";
import UserProfile from "containers/UserProfile";
import MyBooking from "../MyBooking/Loadable";
import MyDrive from "../MyDrive/Loadable";
import NewOffers from "../NewOffers";
import BookingOfferPage from "../BookingOfferPage";
import OfferDetail from "../OfferDetail";
import OtherPage from "../OtherPage";
import TopBooking from "../TopBooking";
import PromotionList from "../PromotionList";
import PromotionDetail from "../PromotionDetail";
import Notification from "../Notification";
import CarManagement from "../CarManagement";
import Help from "../Help";
import FeaturedDestinationPage from "../FeaturedDestinationPage";
import EarningPayout from "../EarningPayout";
import Header from "../../components/Header/Loadable";
import Footer from "../../components/Footer/Loadable";

import localStorageService from "local-storage";
import localStoreService from "local-storage";
import { makeSelectLocale } from "../LanguageProvider/selectors";
import { changeLocale } from "../../../internals/templates/containers/LanguageProvider/actions";
import { switchMenu } from "../../components/Header";
import ClassNames from "classnames";

import { toast } from "react-toastify";
import _ from "lodash";
import socket from "../../utils/socket";
import makeSelectHistoryBookings from "../HistoryBookings/selectors";
import makeSelectBiddingDrive from "../BiddingDrive/selectors";
import makeSelectHistoryDrive from "../HistoryDrive/selectors";
import makeSelectNewOffers from "../NewOffers/selectors";
import { changeAppStoreData } from "../App/actions";
import ForgotPasswordPopup from "../../components/ForgotPasswordPopup";
import SignUpPopup from "../../components/SignUpPopup";
import makeSelectAuth from "../Auth/selectors";
import makeSelectCurrentBookings from "../CurrentBookings/selectors";
// import { firebaseAppAuth, providers } from "../App";

export const MsgFormat = (props) => {
  const { content = "", image = "", href = "" } = props;
  return (
    <div className={"content d-table"}>
      {image && <div className={"d-table-cell align-middle img-toast"}><img src={image} alt={"img-toast"}/></div>}
      <div className={"d-table-cell align-middle"}>
        {content}
        <div>{href && <a href={href} className={"link-blue"}>{href}</a>}</div>
      </div>
    </div>);
};

var thisHomepage;

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    thisHomepage = this;
  }

  resetAllModal = () => {
    const { modalList = [] } = this.props.homepage;
    modalList.map(modal => {
      this.props.changeStoreData(modal, false);
    });
  };

  runListenSocket = () => {
    try {
      const { paramsNotification = {} } = this.props.homepage;
      window.addEventListener("socketconnect", function() {
        console.log("2. GO IN addEventListener EVENT SOCKET........");
        if (socketInstance.socket && !socketInstance.listening) {
          console.log("3. STARTING LISTEN EVENT IN WILL MOUNT HOMEPAGE");
          socketInstance.setListen(true);
          socketInstance.socket.on("notification", (data) => {
            let notiItem = {};
            if (!_.isEmpty((data)))
              [notiItem = {}] = data;//get first notification content
            toast(({ closeToast }) => <MsgFormat closeToast={closeToast} {...notiItem}/>, { pauseOnFocusLoss: false });

            const token = localStorageService.get("token") || "";
            if (token) {
              thisHomepage.props.getNotificationList(paramsNotification);
            }
          });

          socketInstance.socket.on("jobUpdate", (data) => {
            let { job = "" } = data;
            let { currentJobId = "" } = thisHomepage.props.homepage;
            if (job && currentJobId === job) {//!CASE CURRENT PAGE IS DETAIL
              thisHomepage.getDataBookingDetail(job);
            } else {//! CASE CURRENT PAGE IS LIST
              thisHomepage.getDataList();
            }
          });
          socketInstance.socket.on("jobRequestUpdate", (data) => {
            let { job = "" } = data;
            let { currentJobId = "" } = thisHomepage.props.homepage;
            if (job && currentJobId === job) {//!CASE CURRENT PAGE IS DETAIL
              thisHomepage.getDataBookingDetail(job);
            } else {//! CASE CURRENT PAGE IS LIST
              thisHomepage.getDataList();
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  UNSAFE_componentWillMount() {
    this.resetAllModal();
    const { paramsOtherPage = {}, paramsFeaturedDestination = {}, paramsNotification = {} } = this.props.homepage;
    const tabHeader = localStorageService.get("tabHeader") || "customer";
    const token = localStorageService.get("token") || "";

    if (token) {
      socket.connect();
      this.runListenSocket();
      this.props.getNotificationList(paramsNotification);
    }

    this.props.changeStoreData("tabHeader", tabHeader);
    this.props.getOtherPageList(paramsOtherPage);
    this.props.getTopBookingList({});
    this.props.getFeaturedDestinationList(paramsFeaturedDestination);

    this.props.history.listen((location, action) => {
      this.props.changeStoreData("openBurgerMenu", false);
      this.props.changeStoreData("currentJobId", "");

      this.props.changeStoreData("hideBlueMenu",
        location.pathname.indexOf(urlLink.userProfile) >= 0
        || location.pathname.indexOf(urlLink.help) >= 0
        || location.pathname.indexOf("home/blog") >= 0);
    });
    this.props.changeStoreData("hideBlueMenu",
      this.props.location.pathname.indexOf(urlLink.userProfile) >= 0
      || this.props.location.pathname.indexOf(urlLink.help) >= 0
      || this.props.location.pathname.indexOf("home/blog") >= 0);
    this.showDriverCompleteStep();
  }

  componentWillUnmount() {
    // console.log("HOME PAGE UNMOUNT");
    // window.removeEventListener("socketconnect", () => {
    //   console.log("removeEventListener socketconnect");
    // });
  }

  getDataBookingDetail(id) {
    this.props.getJobDetail(id)
      .then((res) => {
        // console.log("RESPONSE JOB DETAIL RES", res);
        const { status = [] } = res;
        const statusTemp = status.reverse();
        const [{ key: keyStatusLast = "" }] = statusTemp;
        this.props.changeStoreData("currentStatusJob", keyStatusLast);
        console.log("keyStatusLast", keyStatusLast);
        if (keyStatusLast === "new_lead") {
          const { paramsJobRequestList: params = {} } = this.props.homepage;
          this.props.getJobRequestList(params);
        }
      });
  }

  // !THIS FUNCTION PROCESS FOR EACH CURRENT PAGE IN ALL APP TO GET NEW DATA
  getDataList() {
    const { location = {} } = this.props.history;
    const { pathname = {} } = location;

    switch (pathname) {
      case urlLink.historyBookings: {
        let { params = {} } = this.props.historyBooking;
        this.props.getHistoryBooking(params);
        break;
      }
      case urlLink.historyDrive: {
        const { params = {} } = this.props.historyDrive;
        this.props.getHistoryDrive(params);
        break;
      }
      case urlLink.biddingDrive: {
        let { params = {} } = this.props.biddingDrive;
        this.props.getBiddingDrive(params);
        break;
      }
      case urlLink.newOffers: {
        let { params = {} } = this.props.newOffers;
        this.props.getNewOffers(params);
        break;
      }
      case urlLink.currentBookings: {
        let { params = {} } = this.props.currentBookings;
        this.props.getCurrentBookings(params);
        break;
      }
      default:
        break;
    }
  }

  showDriverCompleteStep = () => {
    const user = localStorageService.get("user") || "";
    if (user) {
      const { role = ["customer"], currentProgress = 1 } = user;
      if (_.indexOf(role, "company") >= 0 && currentProgress < 7)
        toast(({ closeToast }) => <MsgFormat closeToast={closeToast}
                                             content={<div className={"driver-complete-step-wrapper"}>
                                               <div>Your register process as a driver is not completed.</div>
                                               <div className={"color-blue cursor-pointer"}
                                                    onClick={() => this.props.history.push(urlLink.stepSignUp)}
                                               ><u>Comeback and complete to drive with us.</u></div>
                                             </div>}
                                             image={"driver-complete-step.svg"}/>);
    }
  };

  render() {
    const {
      navMenu = [],
      footerMenu = [],
      showLogin = false,
      showForgotPassword = false,
      showSignUp = false,
      showBookingSuccess = false,
      showLogout = false,
      apiError = [],
      openBurgerMenu = false,
      tabHeader = "customer",
      notificationList = [],
      paramsNotification = {},
      directions = {},
      hideBlueMenu = true
    } = this.props.homepage;
    const { loginpage = {}, currentUser = {} } = this.props;
    // console.log("HOME PROPS directions-----", directions);

    const role = localStoreService.get("role") || ["customer"];
    // console.log("pathname---------:", location);
    return (
      <div className={"home-wrapper"} id={"outer-container"}>

        {/*MENU LEFT SIDE*/}
        <Menu disableOverlayClick
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
              isOpen={openBurgerMenu}
              bodyClassName={"menu-left-side"}
              onStateChange={state => {
                console.log(state);
                this.props.changeStoreData("openBurgerMenu", state.isOpen);
              }}
        >
          <NavbarBrand href={"/#/"} onClick={() => {
            this.props.changeStoreData("openBurgerMenu", false);
          }}>
            <img className={"icon-logo"} src={"logo.png"} alt="logo"/>
          </NavbarBrand>
          <Nav navbar>
            {navMenu.map((item, index) => {
                const { link = "#", title = "" } = item;
                return (
                  <NavItem key={index}>
                    <NavLink to={link} className={"nav-link"}
                    >{title}</NavLink>
                  </NavItem>
                );
              }
            )}
          </Nav>
        </Menu>

        <div
          className={ClassNames({
            "hide-sub-menu-blue": hideBlueMenu
          })}>

          {/*------------HEADER--------*/}
          <Header {...this.props}
                  navMenu={navMenu}
                  currentUser={currentUser}
                  history={this.props.history}
                  onLocaleToggle={locale => this.props.onLocaleToggle(locale)}
                  tabHeader={tabHeader}
                  notificationList={notificationList}
                  switchTab={tab => {
                    console.log("tab-----------:", tab);
                    this.props.history.push(switchMenu[tab][0].link);
                    localStorageService.set("tabHeader", tab);
                    this.props.changeStoreData("tabHeader", tab);
                  }}
                  openBurgerMenu={openBurgerMenu}
                  onToggleBurgerMenu={isOpen => {
                    this.props.changeStoreData("openBurgerMenu", isOpen);
                  }}
                  onReadNotification={(notiIdArr) => {
                    this.props.readNotifications(notiIdArr)
                      .then(() => {
                        this.props.getNotificationList(paramsNotification);
                      });
                  }}
          />

          {/*HOME PAGE IS CONTAINER HAVE ROUTE LIKE MAIN PAGE, BOOKING OFFER*/}
          <Router>
            <Switch>
              <Route path={urlLink.userProfile}
                     component={UserProfile}/>

              <Route strict path={urlLink.myBooking}
                     component={MyBooking}/>

              <Route path={urlLink.myDrive}
                     component={MyDrive}/>

              <Route exact path={urlLink.newOffers}
                     component={NewOffers}/>

              <Route path={urlLink.offerDetail}
                     component={OfferDetail}/>

              <Route path={urlLink.carManagement}
                     component={CarManagement}/>

              <Route path={urlLink.blog}
                     component={Blog}/>

              <Route path={urlLink.blogDetail}
                     render={props => {
                       return <BlogDetail {...props} isRelate={true}/>;
                     }}
              />

              <Route path={urlLink.topBooking}
                     component={TopBooking}/>

              <Route exact path={urlLink.featureDestination}
                     component={FeaturedDestinationPage}/>

              <Route path={urlLink.featureDestinationDetail}
                     component={BlogDetail}/>

              <Route exact path={urlLink.promotion}
                     component={PromotionList}/>

              <Route path={urlLink.promotionDetail}
                     component={PromotionDetail}/>

              <Route path={urlLink.help}
                     component={Help}/>

              <Route path={urlLink.notifications}
                     component={Notification}/>

              <Route path={urlLink.earning}
                     component={EarningPayout}/>
              {navMenu.length > 0 && navMenu.map((menu, index) => {
                const { _id = "", link = "" } = menu;
                return <Route path={link}
                              key={index}
                              render={props => {
                                return <OtherPage {...props} data={menu} _id={_id}/>;
                              }}
                />;
              })}

              {footerMenu.length > 0 && footerMenu.map((menu, index) => {
                const { _id = "", link = "" } = menu;
                return <Route path={link}
                              key={index}
                              render={props => {
                                return <OtherPage {...props} data={menu} _id={_id}/>;
                              }}
                />;
              })}
              <Route exact path={urlLink.booking}
                     component={BookingOfferPage}/>
              {/*
                !Add new route upper if new route from here
              */}
              <Route exact path={""}
                     component={MainPage}
              />
            </Switch>
          </Router>
          {/*------------FOOTER----------*/}
          <section className={"link-fast-wrapper"}>
            <div className={"container"}>
              <div className={"row"}>
                <section className={"col-md-4"} onClick={() => this.props.history.push(urlLink.root)}>
                  <img className={"logo"} src={"logo.png"} alt="logo"/>
                </section>

                <section className={"col-md-4"}>
                  <div className={"header-link"}>
                    Thai Mobility Services
                  </div>
                  <Nav vertical>
                    <NavItem>
                      <NavLink to={"#"} className={"nav-link"}>Airport transfer</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to={"#"} className={"nav-link"}>Limousine service</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to={"#"} className={"nav-link"}>Chauffeur service</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to={"#"} className={"nav-link"}>Private car service</NavLink>
                    </NavItem>
                  </Nav>
                </section>

                <section className={"col-md-4"}>
                  <div className={"header-link"}>
                    Company
                  </div>
                  <div className={"row"}>
                    <div className={"col-6"}>
                      <Nav vertical>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>How it works</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>About us</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>Career</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>Help</NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                    <div className={"col-6"}>
                      <Nav vertical>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>Ride</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>Driver</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>Enterprise</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to={"#"} className={"nav-link"}>Cargo</NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
          <Footer navMenu={navMenu} footerMenu={footerMenu}/>

        </div>

        {/* Login Popup */}
        <LoginPopup
          {...this.props}
          {...this.props.homepage}
          visible={showLogin}
          loginpage={loginpage}
          apiError={apiError}
          toggle={value => {
            this.props.changeStoreData("showLogin", !value);
          }}
          onSubmit={values => {
            this.props.login(values);
          }}
          loginSocial={(accessToken, provider) => {
            this.props.loginSocial(accessToken, provider, _.indexOf(role, "company") >= 0 ? "company" : "customer")
              .then(() => {
                this.props.changeStoreData("showLogin", false);
              });
          }}
        />

        <ForgotPasswordPopup
          {...this.props}
          {...this.props.homepage}
          visible={showForgotPassword}
          loginpage={loginpage}
          apiError={apiError}
          toggle={value => {
            this.props.changeStoreData("showForgotPassword", !value);
          }}
        />

        <SignUpPopup
          {...this.props}
          {...this.props.homepage}
          visible={showSignUp}
          loginpage={loginpage}
          apiError={apiError}
          toggle={value => {
            this.props.changeStoreData("showSignUp", !value);
          }}
        />

        <SuccessPopup visible={showBookingSuccess}
                      title={"Successfully offer a drive!"}
                      content={"Please wait for the request of drivers!"}
                      toggle={value => {
                        this.props.changeStoreData("showBookingSuccess", !value);
                        this.props.history.push(urlLink.root);
                      }}/>

        <WarningPopup visible={showLogout}
                      confirmText={"Yes, Log out"}
                      cancelText={"No, Stay"}
                      title={"Log out?"}
                      content={"Are you sure you want to logout?"}
                      onSubmit={() => {
                        this.props.changeStoreData("showLogout", false);
                        this.props.logout();
                      }}
                      onCancel={(value) => {
                        this.props.changeStoreData("showLogout", value);
                      }}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeAppStoreData: PropTypes.func,
  getCurrentUser: PropTypes.func,
  getCategory: PropTypes.func,
  getSubCategory: PropTypes.func,
  getRaceCourse: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
  loginSocial: PropTypes.func,
  onLocaleToggle: PropTypes.func,
  getFeaturedDestinationList: PropTypes.func,
  getTopBookingList: PropTypes.func,
  getOtherPageList: PropTypes.func,
  getNotificationList: PropTypes.func,
  readNotifications: PropTypes.func,
  deleteNotifications: PropTypes.func,
  getJobDetail: PropTypes.func,
  getJobRequestList: PropTypes.func,
  getCurrentBookings: PropTypes.func,
  getHistoryBooking: PropTypes.func,
  getHistoryDrive: PropTypes.func,
  getBiddingDrive: PropTypes.func,
  getNewOffers: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
  loginpage: makeSelectLoginPage(),
  authpage: makeSelectAuth(),
  //Customer
  historyBooking: makeSelectHistoryBookings(),
  //Driver
  biddingDrive: makeSelectBiddingDrive(),
  historyDrive: makeSelectHistoryDrive(),
  //Offers
  newOffers: makeSelectNewOffers(),
  // CurrentBooking page
  currentBookings: makeSelectCurrentBookings(),
  currentUser: makeSelectCurrentUser(),
  locale: makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
  return {
    login: evt => {
      dispatch(getLoginData(evt.email, evt.password, evt.isRemember));
    },
    logout: () => {
      dispatch(logout());
    },
    loginSocial: (accessToken, provider, role) => {
      return new Promise((resolve, reject) => {
        dispatch(loginSocial({ accessToken, provider, role, resolve, reject }));
      });
    },
    getCurrentUser: () => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentUser(resolve, reject));
      });
    },
    getCategory: () => {
      dispatch(getCategory());
    },
    getSubCategory: (category) => {
      dispatch(getSubCategory(category));
    },
    getRaceCourse: () => {
      dispatch(getRaceCourse());
    },
    getFeaturedDestinationList: () => {
      dispatch(getFeaturedDestinationList());
    },
    getOtherPageList: (params) => {
      dispatch(getOtherPageList(params));
    },
    getTopBookingList: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(getTopBookingList(params, resolve, reject));
      });
    },
    getNotificationList: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(getNotificationList(params, resolve, reject));
      });
    },
    readNotifications: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(readNotifications(params, resolve, reject));
      });
    },
    deleteNotifications: (notiIdArr) => {
      return new Promise((resolve, reject) => {
        dispatch(deleteNotifications(notiIdArr));
      });
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeAppStoreData: (key, value) => {
      dispatch(changeAppStoreData(key, value));
    },
    onLocaleToggle: locale => {
      dispatch(changeLocale(locale));
    },
    getJobDetail: id => {
      return new Promise((resolve, reject) => {
        dispatch(getJobDetail(id, resolve, reject));
      });
    },
    getJobRequestList: params => {
      return new Promise((resolve, reject) => {
        dispatch(getJobRequestList(params, resolve, reject));
      });
    },
    // Customer
    getHistoryBooking: params => {
      return new Promise((resolve, reject) => {
        dispatch(getHistoryBooking(params, resolve, reject));
      });
    },
    getCurrentBookings: params => {
      return new Promise((resolve, reject) => {
        dispatch(getCurrentBookings(params, resolve, reject));
      });
    },
    // Driver
    getBiddingDrive: params => {
      return new Promise((resolve, reject) => {
        dispatch(getDriveBiddingList(params, resolve, reject));
      });
    },
    getHistoryDrive: params => {
      return new Promise((resolve, reject) => {
        dispatch(getDriveHistoryList(params, resolve, reject));
      });
    },
    getNewOffers: params => {
      return new Promise((resolve, reject) => {
        dispatch(getOffersList(params, resolve, reject));
      });
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "homePage", reducer });
const withSaga = injectSaga({ key: "homePage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
  // withFirebaseAuth({
  //   providers,
  //   firebaseAppAuth
  // })
)(HomePage);
