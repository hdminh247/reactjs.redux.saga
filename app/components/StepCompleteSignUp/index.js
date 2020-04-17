/**
 *
 * StepCompleteSignUp
 *
 */

import React from "react";
import FormGroup from "../FormGroup";
import "./style.scss";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

class StepCompleteSignUp extends React.PureComponent {
  render() {

    return (
      <div className={"step-completed-wrapper"}>
        <FormGroup title={"Finish Setting Up"}>
          <h4>Your step setup is completed</h4>
        </FormGroup>
      </div>
    );
  }
}

StepCompleteSignUp.propTypes = {};

export default StepCompleteSignUp;
