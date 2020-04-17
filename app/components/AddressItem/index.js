import React from "react";
import "./style.scss";
import "../InputForm/style.scss";
import Location from "../Location";
import ClassNames from "classnames";


export default class AddressItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteAddress = (index) => {
    this.props.delete(index);
  };

  handlePropsChange = (index, value) => {
    this.props.handleChange(index, value);
  };

  render() {
    const {
      placeholder = "",
      value = "",
      className = "",
      name = "",
      id = "",
      index = 0,
      prependLabel = "",
      touched,
      error,
      onBlur = () => {
      },
      onSelect = () => {
      },
      onChange = (value) => {
      }
    } = this.props;
    return (
      <div className={ClassNames("address-item-wrapper", className)}>
        <Location
          name={name}
          id={id}
          placeholder={placeholder || "Location"}
          value={value}
          touched={touched}
          error={error}
          onBlur={onBlur}
          prependLabel={prependLabel}
          onChange={(evt) => {
            onChange(evt, index);
          }}
          onSelect={newLocation => {
            onSelect(newLocation, index);
          }}
        />

        {/*{touched && error && (*/}
        {/*<div className={"error-text"}>*/}
        {/*<i className={"icon-error"}/>*/}
        {/*<span>{error}</span>*/}
        {/*</div>*/}
        {/*)}*/}
      </div>
    );
  }
}
