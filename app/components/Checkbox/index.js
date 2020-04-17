/**
 *
 * Checkbox
 *
 */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./style.scss";
import ClassNames from "classnames";

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { children, name = "checkbox", className = "" } = this.props;
    return (
      <div className={ClassNames("base-checkbox-circle", className)}>
        <label>
          <input
            className="base-input"
            name={name}
            type={_.isUndefined(this.props.type) ? "checkbox" : this.props.type}
            onChange={this.props.onChange}
            checked={this.props.checked}
          />

          <span className={"base-span"}/>
          <span className={"base-label"}>{this.props.label}</span>
        </label>
        <span className={"children"}>{children}</span>
      </div>
    );
  }
}
Checkbox.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool
};
