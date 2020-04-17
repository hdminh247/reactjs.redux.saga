import React from "react";
import "./style.scss";

export default class NeonButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClick = (type) => {
    if (type === "disabled") {
      return;
    } else {
      this.props.onClick();
    }
  };

  render() {
    return (
      <button
        className={"btn-neon " + this.props.className}
        onClick={(e) => {
          e.preventDefault();
          this.handleOnClick(this.props.className);
        }}
        type={this.props.type}
      >{this.props.title}</button>
    );
  }
}
