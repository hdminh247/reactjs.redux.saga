/**
 *
 * InputPhoneForm
 *
 */

import React from "react";
import ClassNames from "classnames";
import "../InputForm/style.scss";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from "reactstrap";
import _ from "lodash";
import "./style.scss";
import InputForm from "../InputForm";

function flowFilter(array, substr) {
  return _.filter(array, _.flow(
    _.identity,
    _.values,
    _.join,
    _.toLower,
    _.partialRight(_.includes, substr)
  ));
}

export default class InputPhoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCounty: ""
    };
  }

  render() {
    const {
      listCountryCode = [],
      valueCountryCode = "", iconCountry = "",
      name = "", touched = false, error = "",
      className = "", disabled = false, isHidden = false, countryId= ""
    } = this.props;
    const { searchCounty = "" } = this.state;
    return (
      <div className={"input-phone-form-wrapper"}>
        <div className={ClassNames("input-form-wrapper",
          disabled && "disabled", isHidden && "isHidden",
          className,
          { "prepend-label": this.props.prependLabel }
        )}>
          {/*Label*/}
          {this.props.label && (<label className="form-label" htmlFor={name}>{this.props.label}</label>)}
          <div className={"input-group form-input"}>
            <div className={ClassNames("input-group-prepend")}>
              <span className={ClassNames("input-group-text icon",
                this.props.touched && this.props.error && "error-form")}
                dangerouslySetInnerHTML={{ __html: this.props.prependLabel }} />
            </div>
            <div className={ClassNames("input-group-prepend")}>
              <UncontrolledButtonDropdown>
                <DropdownToggle
                  className={ClassNames("input-group-text",
                    this.props.touched && this.props.error && "error-form")}
                  tag="div"
                  disabled={this.props.disabled}
                >
                  <div className={"dropdown-toggle-wrapper"}>
                    <div className={"country"}>
                      <img className={"country-icon"} src={iconCountry} />
                      <span className={"country-code"}>{valueCountryCode}</span>
                    </div>
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <div className={"search-country-code-wrapper"}>
                    <InputForm
                      type={"text"}
                      value={searchCounty}
                      prependLabel={`<i class="icon-search"/>`}
                      placeholder={"Search country"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        this.setState({ searchCounty: e.target.value });
                        // console.log(flowFilter(listCountryCode, e.target.value));
                      }}
                    />
                  </div>
                  <div className={"list-country-code-wrapper"}>
                    {flowFilter(listCountryCode, searchCounty).map((country, key) => {
                      const { icon = "", name = "", countryCode = ""} = country;
                      return <DropdownItem key={key} onClick={(event) => {
                        event.preventDefault();
                        this.props.onChangeCountryCode(country);
                      }}>
                        <div className={"item-country-wrapper"}>
                          <img className={"country-icon"} src={icon} />
                          <span className={"country-name"}>{name}</span>
                          <span className={"country-code"}>{countryCode}</span>
                        </div>
                      </DropdownItem>;
                    })}
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <input
              className={ClassNames("input-form form-control",
                this.props.touched && this.props.error && "error-form",
                !this.props.showPassword && "hide-password")}
              name={this.props.name}
              type={this.props.type}
              onChange={this.props.onChange}
              onBlur={this.props.onBlur}
              value={this.props.value}
              placeholder={this.props.placeholder}
              onClick={this.props.onClick}
              disabled={this.props.disabled}
            />
          </div>

          {(_.isBoolean(touched) && touched && error) && (
            <div className={"error-text"}>
              <i className={"icon-error"} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

InputPhoneForm.propTypes = {};

// export default InputPhoneForm;
