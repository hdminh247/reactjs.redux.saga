import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import ClassNames from "classnames";

export default class GhostButton extends React.Component {
  render() {
    const {
      className = "",
      onClick = () => {
      },
      type = "button",
      hidden = false
    } = this.props;

    return (
      <button hidden={hidden}
              className={ClassNames("btn btn-ghost", className)}
              onClick={onClick}
              type={type}>
        {this.props.title}
      </button>

    );
  }
}
GhostButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};
