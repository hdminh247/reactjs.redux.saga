import React from "react";
import { FormattedMessage } from "react-intl";
import "./style.scss";
import messages from "./messages";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer(props) {
  const { footerMenu = [] } = props;
  return (
    <div className={"footer-main"}>
      <div className={"container"}>
        <div className={"row"}>
          <section className={"col-md-4 license"}>
            <FormattedMessage {...messages.licenseMessage} />
          </section>

          <section className={"col-md-4"}>
            <Nav>
              <NavItem>
                <NavLink to={"/home/terms-and-condition"} className={"nav-link"}><FormattedMessage {...messages.terms} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/home/privacy-policy"} className={"nav-link"}><FormattedMessage {...messages.privacy} /></NavLink>
              </NavItem>

            </Nav>
          </section>
          <section className={"col-md-2"}>
            <Nav>
              <NavItem>
                <NavLink to="#" className={"nav-link"}>
                  <FormattedMessage {...messages.legal}/>
                </NavLink>
              </NavItem>
              {footerMenu.map((foo, key) => {
                const { title = "", link = "" } = foo;
                return <NavItem key={key}>
                  <NavLink to={link} className={"nav-link"}>{title}</NavLink>
                </NavItem>;
              })}
            </Nav>
          </section>
          <section className={"col-md-2 social"}>
            <i><FontAwesomeIcon icon={["fab", "facebook-f"]}/></i>
            <i><FontAwesomeIcon icon={["fab", "instagram"]}/></i>
            <i><FontAwesomeIcon icon={["fab", "twitter"]}/></i>
          </section>
        </div>

      </div>
    </div>
  );
}

export default Footer;
