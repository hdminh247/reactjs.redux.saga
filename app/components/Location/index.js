import React from "react";
//Library
import Autocomplete from "react-google-autocomplete";
import _, { findIndex, indexOf } from "lodash";
import ClassNames from "classnames";
import "./style.scss";
import "../InputForm/style.scss";
import { listError } from "helper/data";
import "components/InputForm/style.scss";

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  getLocality = address => {
    return address.types.filter(type => type === "locality");
  };
  getAdministrativeAreaLevel = address => {
    return address.types.filter(type => type.includes("administrative_area_level"));
  };
  getCountryType = address => {
    return address.types.filter(type => type === "country");
  };
  getSuburbFromAdministrative = list => {
    let max = "";
    let suburb = {};
    list.map(address => {
      if (address.types[0] > max) {
        max = address.types[0];
        suburb = address;
      }
    });
    return suburb;
  };
  getSuburb = addressList => {
    if (_.isArray(addressList)) {
      let locality = addressList.filter(address => this.getLocality(address).length > 0);
      let administrativeAreas = addressList.filter(address => this.getAdministrativeAreaLevel(address).length > 0);
      let suburb = this.getSuburbFromAdministrative(administrativeAreas);
      if (locality.length > 0) {
        return locality[0].long_name;
      } else {
        return suburb.long_name;
      }
    }
  };
  getCountry = addressList => {
    if (_.isArray(addressList)) {
      let country = addressList.filter(address => this.getCountryType(address).length > 0);
      return country[0].long_name;
    }
  };

  setInit = () => {
    let id = this.props.id ? this.props.id : "pac-input";
    let inputNode = document.getElementById(id);
    let {
      country = "",
      onSelect = () => {
      }
    } = this.props;
    let options = {};

    if (!_.isEmpty(country)) {
      options = {
        componentRestrictions: { country } //config country is au
      };
    }
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode, options);

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();

      let data = {
        address: "",
        name: "",
        latitude: null,
        longitude: null,
        lat: null,
        lng: null
      };

      let { location } = place.geometry;
      if (location) {
        data = {
          address: place.formatted_address,
          name: place.formatted_address,
          latitude: location.lat(),
          longitude: location.lng(),
          lat: location.lat(),
          lng: location.lng()
        };
      }

      onSelect(data);
    });
  };

  checkApiError(name, error) {
    if (!_.isEmpty(error)) {
      let index = findIndex(listError, val => val.name === name);
      if (index > -1) {
        if (indexOf(listError[index].error, error[0].errorCode) > -1) {
          return true;
        }
      }
      return false;
    }
  }

  render() {
    let {
      name,
      title = "",
      id,
      placeholder,
      value,
      error,
      apiError,
      touched,
      onBlur,
      onChange = (value) => {
      },
      onSelect = (address) => {
      },
      prependLabel = ""
    } = this.props;
    //console.log('Location', this.props.id);

    return (
      <div className={ClassNames("location-wrapper input-form-wrapper",
        { "prepend-label": prependLabel }
      )}
      >
        <div className="form-label">
          <span>{title}</span>
        </div>
        <div className={"input-group form-input"}>
          {prependLabel && (
            <div className={ClassNames("input-group-prepend")}>
            <span className={ClassNames("input-group-text",
              touched && error && "error-form")}
                  dangerouslySetInnerHTML={{ __html: prependLabel }}/>
            </div>
          )}
          <Autocomplete
            className={ClassNames("input-form form-control", (touched && error && "error-form"))}
            id={id ? id : "pac-input"}
            name={name}
            value={value}
            placeholder={_.isEmpty(placeholder) ? "Location" : placeholder}
            types={["address"]}
            onBlur={onBlur}
            autoComplete="off"
            onPlaceSelected={(place) => {
              let location = place.geometry.location;
              let data = {
                address: place.formatted_address,
                name: place.formatted_address,
                latitude: location.lat(),
                longitude: location.lng(),
                lat: location.lat(),
                lng: location.lng()
              };
              onSelect(data);
            }}
            onChange={e => {
              onChange(e.target.value);
            }}
          />
          {/*<input*/}
          {/*className={ClassNames("input-form form-control", (touched && error && "error-form"))}*/}
          {/*id={id ? id : "pac-input"}*/}
          {/*name={name}*/}
          {/*value={value}*/}
          {/*placeholder={_.isEmpty(placeholder) ? "Location" : placeholder}*/}
          {/*type={"text"}*/}
          {/*onBlur={onBlur}*/}
          {/*onFocus={() => {*/}
          {/*this.setInit();*/}
          {/*}}*/}
          {/*onChange={e => {*/}
          {/*onChange(e.target.value);*/}
          {/*}}*/}
          {/*/>*/}
        </div>
        {_.isBoolean(touched) && touched && error && (
          <div className={"error-text"}>
            <i className={"icon-error"}/>
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
}
