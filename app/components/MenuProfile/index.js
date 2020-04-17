/**
 *
 * MenuProfile
 *
 */

import React from "react";
import "./style.scss";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function MenuProfile() {
  return (
    <div className={"menu-user-profile-wrapper"}>
      <header>
        <p className={"user-profile-title"}>My Profile</p>
      </header>
      <ul className={"vertical-menu"}>
        <li>
          <span>&#128898;</span> <a href="#">Profile Information</a>
        </li>
        <li>
          <span>&#128898;</span> <a href="#">Change Password</a>
        </li>
        <li>
          <span>&#128898;</span> <a href="#">Payment</a>
        </li>
      </ul>
    </div>
  );
}

MenuProfile.propTypes = {};

export default MenuProfile;
