/**
 *
 * AddressList
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import "./style.scss";
import AddressItem from "../AddressItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import _ from "lodash";

/* eslint-disable react/prefer-stateless-function */
class MultiDestination extends React.Component {
  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
  }

  renderListView = (list, name, errors) => {
    const {
      prependLabel = "",
      onChange = () => {
      },
      onSelect = () => {
      },
      onDelete = () => {
      },
      onBlur = (e) => {
      },
      touched = []
    } = this.props;

    return list.map((item, index) => {
      const { name: addressFormat = "" } = item;
        return (
          <div key={index} className={ClassNames("address-loop")}>
            <AddressItem
              name={`${name}[${index}].name`}
              id={`${name}[${index}].name`}
              index={index}
              value={addressFormat}
              touched={touched.length > 0 && touched[index] && touched[index].name}
              error={errors[index] && errors[index].name}
              placeholder={"Enter destination"}
              prependLabel={prependLabel}
              onBlur={onBlur}
              onSelect={(address, position) => {
                // console.log("select at", position, address);
                list[position] = address;

                //select dropdown below is correct valid google place
                list[position].error = false;
                onSelect(list);
              }}
              onChange={(value, position) => {
                list[position].name = value;
                list[position].address = "";
                list[position].lat = null;
                list[position].lng = null;

                //input normal not select dropdown below is invalid google place
                list[position].error = true;
                onChange(list);
              }}
            />
            <div hidden={_.isEmpty(name) && index === 0}
                 className={"btn-delete"}
                 onClick={(e) => {
                   e.preventDefault();

                   if (list.length === 1) {
                     //if just 1 destination will clear input
                     list[0] = {
                       name: ""
                     };

                     onDelete(list);
                     return;
                   }

                   let newArray = list;
                   newArray.splice(index, 1);

                   onDelete(newArray);
                 }}>
              <FontAwesomeIcon icon={["far", "times-circle"]}/>
            </div>
          </div>
        );
      }
    );
  };

  render() {
    const {
      onAdd = (list) => {
        console.log(list);
      },
      value = [],//value is array destination
      name = "",
      touched = false,
      errors = []
    } = this.props;

    // console.log("multi destination list", value);

    return (
      <div className="address-list-wrapper">
        {this.renderListView(value, name, errors)}

        <span className={ClassNames("add-button",
          { "no-click": _.isEmpty(value[value.length - 1].name) })}
              onClick={e => {
                e.preventDefault();
                let newAddress = {
                  id: "",
                  name: "",
                  address: "",
                  action: "add",
                  type: "address",
                  error: true
                };
                value.push(newAddress);
                onAdd(value);
              }}
        >+ Add multi-destination
        </span>

        {touched && _.isString(errors) && (
          <div className={"error-text"}>
            <i className={"icon-error"}/>
            <span>{error}</span>
          </div>

        )}
      </div>
    );
  }
}

MultiDestination.propTypes = {};

export default MultiDestination;
