import React from "react";
import "./style.scss";
//lib
import { NavLink } from "react-router-dom";
import localStorageService from "local-storage";
import _ from "lodash";
import ClassNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";
// custom
import BaseButton from "../BaseButton";
import { urlLink } from "../../helper/route";
import PropTypes from "prop-types";
import { LocaleToggle } from "../../containers/LocaleToggle";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import NotificationItem from "../NotificationItem";

const cusMenu = [
  {
    icon: "icon-car-shield",
    label: "Book a trip",
    link: urlLink.booking
  },
  {
    icon: "icon-ic-bookmark-border",
    label: "My Booking",
    link: urlLink.myBooking
  },
  {
    icon: "icon-tag-1",
    label: "Promotions",
    link: urlLink.promotion
  }

  // {
  //   icon: "icon-travel-bag-2",
  //   label: "Package",
  //   link: "#"
  // }
];

const driverMenu = [
  {
    icon: "icon-car-shield",
    label: "New offers",
    link: urlLink.newOffers
  },
  {
    icon: "icon-ic-bookmark-border",
    label: "My Drive",
    link: urlLink.myDrive
  },
  {
    icon: "icon-car-6",
    label: "Car Management ",
    link: urlLink.carManagement
  },
  {
    icon: "icon-earning1",
    label: "Earning and Payout ",
    link: urlLink.earning
  }
];

export const switchMenu = {
  customer: cusMenu,
  company: driverMenu
};

const navLogin = (isApproved, activeTab, switchTab, history) => {
  return (
    <div className={"d-flex nav-login-wrapper"}>
      <NavItem>
        <div className={ClassNames("nav-link", { "active": activeTab === "customer" })}
             onClick={() => {
               switchTab("customer");
             }}
        >
          <span className={"icon icon-car-6"}/> <span className={"text"}>Customers</span>
        </div>
      </NavItem>
      <NavItem hidden={!isApproved}>
        <div className={ClassNames("nav-link", { "active": activeTab === "company" })}
             onClick={() => {
               switchTab("company");
             }}
        >
          <span className={"icon icon-car-steering-wheel"}/> <span className={"text"}>Drivers</span>
        </div>
      </NavItem>
    </div>
  );
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      trigger: ["click"],
      isMobile: false
    };
  }

  UNSAFE_componentWillMount() {
    const { history = [] } = this.props;
    history.listen((location, action) => {
      this.setState({ isOpen: false });
    });
    window.addEventListener("load", () => {
      if (window.innerWidth < 992) {
        this.setState({ isMobile: true });
      } else {
        this.setState({ isMobile: false });
      }
    });

  }

  componentWillUnmount() {
    // document.removeEventListener("resize", () => {
    //   console.log("REMOVE EVENT RESIZE");
    // });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {
      navMenu = [],
      currentUser: {
        _id = "", firstName = "", lastName = "",
        avatar = "",
        company = { isApproved: false }
      },
      history = [],
      onReadNotification = () => {
      },
      locale = "en",
      tabHeader = "customer",
      notificationList = [],
      changeStoreData = () => {
      },
      switchTab = (tab) => {
      },
      onLocaleToggle = () => {
      },
      onToggleBurgerMenu = () => {
      },
      openBurgerMenu = false
    } = this.props;

    const { trigger = ["click"], isMobile = false } = this.state;

    // console.log("Header--------------", this.props);
    const notiLength = notificationList.filter(i => {
      const { status = "" } = i;
      return status === "unread";
    }).length;

    return (
      <div className={ClassNames("header-main-wrapper", !_.isEmpty(_id) ? "is-login" : "no-login")}>
        <div className={"container"}>
          <Navbar color="faded" light expand="lg">
            <NavbarToggler onClick={this.toggle}
                           className={ClassNames({ open: this.state.isOpen })}>
              <span className={"icon-toggle"}/>
            </NavbarToggler>

            <span hidden={_.isEmpty(_id)}
                  className={"cursor-pointer icon-menu-left icon-menu"}
                  onClick={() => {
                    onToggleBurgerMenu(!openBurgerMenu);
                  }}
            />

            <NavbarBrand href={"/#/"}>
              <img src={"logo.png"} alt="logo"/>
            </NavbarBrand>
            {!_.isEmpty(_id) &&
            <Nav className={"navbar-left d-none d-lg-flex"}>
              {navLogin(company && company.isApproved, tabHeader, switchTab, history)}
            </Nav>
            }
            {_.isEmpty(_id) ?
              <Collapse isOpen={this.state.isOpen} navbar className={"collapse-absolute"}>
                <NavbarToggler onClick={this.toggle}
                               className={ClassNames("cursor-pointer", { open: this.state.isOpen })}>
                  <span className={"icon-toggle"}/>
                </NavbarToggler>
                <NavbarBrand href={"/#/"} className={"d-xs-block d-sm-block d-md-block d-lg-none"}>
                  <img src={"logo.png"} alt="logo"/>
                </NavbarBrand>
                <Nav className={"navbar-left"} navbar>
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

                <Nav className="navbar-right ml-auto" navbar>
                  <NavItem className={"locale-header"}>
                    <LocaleToggle locale={locale}
                                  history={history}
                                  onLocaleToggle={locale => onLocaleToggle(locale)}/>
                  </NavItem>

                  <NavItem>
                    <BaseButton color={"orange"} content={"Register for driver"}
                                onClick={() => {
                                  localStorageService.set("role", ["customer", "company"]);
                                  history.push(urlLink.signUp);
                                }}/>
                  </NavItem>

                  <NavItem>
                    <BaseButton color={"green"} content={"Register"}
                                onClick={() => {
                                  localStorageService.set("role", ["customer"]);
                                  history.push(urlLink.signUp);
                                }}/>
                  </NavItem>

                  <NavItem>
                    <BaseButton outline={true} content={"Sign In"}
                                onClick={() => history.push(urlLink.login)}/>
                  </NavItem>
                </Nav>
              </Collapse>
              :
              (<Collapse isOpen={this.state.isOpen} navbar className={"collapse-absolute"}>
                  <Nav className="navbar-right ml-auto" navbar>
                    <NavbarToggler onClick={this.toggle}
                                   className={ClassNames("cursor-pointer", { open: this.state.isOpen })}>
                      <span className={"icon-toggle"}/>
                    </NavbarToggler>
                    <div className={"d-xs-block d-sm-block d-md-block d-lg-none"}>
                      <NavbarBrand href={"/#/"}>
                        <img src={"logo.png"} alt="logo"/>
                      </NavbarBrand>

                      <div className={"navbar-left"}>
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
                      </div>
                    </div>
                    <div className={"user-info-wrapper d-md-flex justify-content-between"}>
                      <NavItem tag={"button"} className={"popover-locale-wrapper"}>
                        <LocaleToggle locale={locale}
                                      history={history}
                                      onLocaleToggle={locale => onLocaleToggle(locale)}/>
                      </NavItem>
                      <NavItem tag={"button"} className={"popover-notification-wrapper"}>
                        <OverlayTrigger
                          ref={"popoverNotification"}
                          rootClose={true}
                          rootCloseEvent={"click"}
                          trigger={trigger}
                          key={"bottom"}
                          placement={`${isMobile ? "top-end" : "bottom-end"}`}
                          overlay={
                            <Popover className={"popover-header-wrapper popover-notification"}
                                     id={"popover_notification"}
                                     onClick={() => {
                                       this.refs.popoverNotification.hide();
                                     }}
                            >
                              <Popover.Title>
                                <div>Notifications</div>
                                <div className={"read-all cursor-pointer"}
                                     onClick={() => {
                                       let notiIdArr = notificationList.map(noti => {
                                         const { _id = "" } = noti;
                                         return _id;
                                       });
                                       onReadNotification({ notiIdArr });
                                     }}
                                ><u>Mark all as read</u></div>
                              </Popover.Title>
                              <Popover.Content>
                                <Scrollbars
                                  // This will activate auto hide
                                  autoHide
                                  autoHeight
                                  autoHeightMin={0}
                                  autoHeightMax={280}
                                  // Hide delay in ms
                                  autoHideTimeout={1000}
                                  ref={this.scrollbarRef}
                                >
                                  <ListGroup flush>
                                    {notificationList.slice(0, 10).map((noti, index) => {
                                      const { status = "unread" } = noti;

                                      return (<ListGroupItem key={index}
                                                             className={status}

                                      >
                                        <NotificationItem {...noti}
                                                          onClick={(_id) => {
                                                            onReadNotification({ notiIdArr: [_id] });
                                                            history.push(urlLink.notifications);
                                                          }}/>

                                      </ListGroupItem>);
                                    })}

                                  </ListGroup>
                                </Scrollbars>
                              </Popover.Content>
                              <div className={"popover-footer"}
                                   onClick={() => {
                                     this.props.history.push(urlLink.notifications);
                                   }}>
                                See all notications
                              </div>
                            </Popover>
                          }
                        >
                          <button className={"notification-section"} type={"button"}>
                            <span className={"icon icon-notification1"}/>
                            {

                            }
                            <span className={"badge"} hidden={notiLength === 0}>{notiLength}</span>
                          </button>
                        </OverlayTrigger>
                      </NavItem>
                      <NavItem tag={"button"} id={"popover_profile"} className={"user-info dropdown-popover"}>
                        <OverlayTrigger
                          ref="popoverUser"
                          rootClose={true}
                          rootCloseEvent={"click"}
                          trigger={trigger}
                          key={"bottom"}
                          placement={`${isMobile ? "top" : "bottom"}`}
                          overlay={
                            <Popover className={"popover-header-wrapper"}>
                              <Popover.Content>
                                <ListGroup flush>
                                  <ListGroupItem onClick={() => {
                                    this.refs.popoverUser.hide();
                                    history.push(urlLink.profileInfor);
                                  }}
                                  ><i className={"icon icon-user"}/> Profile</ListGroupItem>
                                  <ListGroupItem onClick={() => {
                                    this.refs.popoverUser.hide();
                                    history.push(urlLink.changePassword);
                                  }}
                                  ><i className={"icon icon-lock"}/> Change Password</ListGroupItem>
                                  <ListGroupItem className={"color-orange"}
                                                 onClick={() => {
                                                   this.refs.popoverUser.hide();
                                                   changeStoreData("showLogout", true);
                                                 }}
                                  ><FontAwesomeIcon icon="power-off" size={"xs"} className={"icon"}/> Log
                                    out</ListGroupItem>
                                </ListGroup>

                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <button type={"button"}>
                            <img className={"rounded-circle header-avatar"}
                                 src={avatar}
                                 onError={e => {
                                   e.target.onerror = null;
                                   e.target.src = "./avatar-default.jpg";
                                 }}
                                 alt="avatar"
                            />
                            <span className={"username"}>{`${firstName} ${lastName}`}</span>
                            <FontAwesomeIcon className={"icon-dropdown"} icon="chevron-down" size={"xs"}/>
                          </button>
                        </OverlayTrigger>
                      </NavItem>
                    </div>
                  </Nav>
                </Collapse>
              )
            }

          </Navbar>
        </div>
        <div className={"container"}>
          {!_.isEmpty(_id) &&
          <Nav className={"navbar-left d-flex d-lg-none"}>
            {navLogin(company && company.isApproved, tabHeader, switchTab, history)}
          </Nav>
          }
        </div>
        {!_.isEmpty(_id) &&
        <div className={"sub-menu-blue"}>
          <div className={"container"}>
            <Nav>
              {switchMenu[tabHeader].map((nav, index) =>
                <NavItem key={index}>
                  <NavLink to={nav.link} className={ClassNames("nav-link")} activeClassName={"active"}>
                    <span className={`icon ${nav.icon}`}/> <span className={"text"}>{nav.label}</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </div>
        </div>
        }
      </div>
    );
  }
}

Header.propTypes = {
  getDriveCurrent: PropTypes.func,
  onLocaleToggle: PropTypes.func,
  onReadNotification: PropTypes.func,
  onDeleteNotification: PropTypes.func,
  notificationList: PropTypes.array
};
