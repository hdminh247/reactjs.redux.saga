/**
 *
 * FormGroup
 *
 */
import React from "react";
// import styled from 'styled-components';
import "./style.scss";
import ClassNames from "classnames";
import { Progress } from "reactstrap";

function FormGroup(props) {
  const { title = "Default", progress = 0 } = props;
  return (
    <div className={"form-group-wrapper"}>
      <div className={ClassNames("form-group-content", !props.footer && "more-padding", props.className)}>
        <div className={"form-group-title text-left"}>{title}</div>
        <div className={"form-group-children"}>
          <div className={"progress-wrapper"} hidden={!progress}>
            <div className={"progress-title"}>Your profile is {progress}% complete</div>
            <Progress value={progress} color={"warning"}/>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

FormGroup.propTypes = {};
export default FormGroup;
