/**
 *
 * MenuList
 *
 */

import React from "react";
import "./styles.scss";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

/* eslint-disable react/prefer-stateless-function */
class MenuList extends React.Component {
  render() {
    const { listLink = [], titleMenu } = this.props;
    return (
      <div className={"menu-list-wrapper"}>
        <header className={"title-menu"}>{titleMenu}</header>
        <div className={"menu-list"}>
          <Nav className={"menu-ul"} vertical pills>
            {listLink.map((item, index) => {
              return (
                <NavItem className={"menu-li"} key={index}>
                  <NavLink to={item.link}>
                    <span className={"text"}>{item.text}</span>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

MenuList.propTypes = {};

export default MenuList;
