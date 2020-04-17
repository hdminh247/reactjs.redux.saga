/**
 *
 * BookingMap
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { compose, withProps } from "recompose";
import { DirectionsRenderer, GoogleMap, Marker, OverlayView, withGoogleMap } from "react-google-maps";
import config from "config";
import _ from "lodash";
import { parseLatLng } from "../../helper/exportFunction";
import destinationIcon from "./icon/destination.svg";
import pickupIcon from "./icon/pickup.svg";
import "./styles.scss";

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -height - 40
});

const mapEnvironment = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.googleAPIKey}&libraries=drawing,places`,
    loadingElement: <div style={{ height: `100%` }}/>,
    containerElement: <div style={{ height: `903px` }}/>,
    mapElement: <div style={{ height: `100%` }}/>
  }),
  // withScriptjs,
  // !remove this is solved duplicate script google warning
  // !but keep comment line to know this issue
  withGoogleMap
);

const renderMarkerWithOverlayView = (address, iconURL = null, key = "") => {
  const { name: nameAddress = "", latitude, longitude } = address;
  if (_.isUndefined(latitude) || _.isUndefined(longitude)) {
    return null;
  } else {
    return (<Marker key={key} position={parseLatLng(address)} icon={{ url: iconURL }}>
        <OverlayView
          position={parseLatLng(address)}
          /*
           * An alternative to specifying position is specifying bounds.
           * bounds can either be an instance of google.maps.LatLngBounds
           * or an object in the following format:
           * bounds={{
           *    ne: { lat: 62.400471, lng: -150.005608 },
           *    sw: { lat: 62.281819, lng: -150.287132 }
           * }}
           */
          /*
           * 1. Specify the pane the OverlayView will be rendered to. For
           *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
           *    Defaults to `OverlayView.OVERLAY_LAYER`.
           */
          mapPaneName={OverlayView.OVERLAY_LAYER}
          /*
           * 2. Tweak the OverlayView's pixel position. In this case, we're
           *    centering the content.
           */
          getPixelPositionOffset={getPixelPositionOffset}
          /*
           * 3. Create OverlayView content using standard React components.
           */
        >
          <div className={"overlay-view-label"}>
            {nameAddress}
          </div>
        </OverlayView>
      </Marker>
    );
  }
};

// THIS IS SETTING OPTION FOR MAP
const mapOptions = {
  zoom: 15,
  gestureHandling: "cooperative",
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  disableDefaultUI: true
};

const MapLayout = props => {
  const {
    directions = null, center = {}, destinationArr = [], pickupLocation = {}, onClick = () => {
    }
  } = props;
  // console.log("MapContainer destinationArr", destinationArr);
  return (
    <GoogleMap
      center={center}
      disableDoubleClickZoom={true}
      options={mapOptions}
      onClick={(e) => onClick(e)}
    >

      {/* PICKUP POINT */}
      {!_.isEmpty(pickupLocation) && renderMarkerWithOverlayView(pickupLocation, pickupIcon)}

      {/* EACH DESTINATION POINT */}
      {!_.isEmpty(destinationArr) && destinationArr.map((des, index) => {
        // console.log('MAP RENDER DESTINATION ARR', des)
        return (
          renderMarkerWithOverlayView(des, destinationIcon, index)
        );
      })}

      {/* LINE DIRECTION */}
      {!_.isEmpty(directions) &&
      <DirectionsRenderer
        directions={directions}
        options={{
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#FF6D00",
            strokeWeight: 2.5
          },
          icon: { scale: 1 }
        }}
      />}
    </GoogleMap>
  );
};
const MapContainer = mapEnvironment(MapLayout);

/* eslint-disable react/prefer-stateless-function */
class BookingMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 10.7931923, lng: 106.6505433
      }
    };
    this.chooseCenterPoint = this.chooseCenterPoint.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.position();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {
      bookingData: {
        objPickupLocation = {},
        destinationArr = []
      },
      directions = {}
    } = this.props;
    const {
      bookingData: {
        objPickupLocation: objPickupLocationNext = {},
        destinationArr: destinationArrNext = []
      },
      directions: directionsNext = {}
    } = nextProps;

    return JSON.stringify(directions) !== JSON.stringify(directionsNext)
      || JSON.stringify(objPickupLocation) !== JSON.stringify(objPickupLocationNext);
  }

  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        // console.log("current position", {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // });
        this.setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          },
          () => {
            // console.log(this.state);
          }
        );
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  chooseCenterPoint = (objPickupLocation, destinationArr, centerState, key) => {
    if (_.indexOf(["sport_cars", "motorcycle"], key) >= 0) {
      return !_.isEmpty(destinationArr) && !_.isEmpty(destinationArr[0].name) ? parseLatLng(destinationArr[0]) : centerState;
    }
    return _.isEmpty(objPickupLocation) ? centerState : parseLatLng(objPickupLocation);
  };

  handleClick = event => {
    console.log("handleClick------", this.props);
    let geocoder = new google.maps.Geocoder;
    let lat = event.latLng.lat(), lng = event.latLng.lng();
    const {
      bookingData: { objPickupLocation = {}, destinationArr = [], allowSubCategory = false },
      bookingData = {},

      onSaveBookingData = e => {
        console.log(e);
      }
    } = this.props;
    // console.log('bookingData', bookingData)
    geocoder.geocode({ "location": { lat, lng } }, function(results, status) {
      if (status === "OK") {
        if (results[0]) {
          // MERGE ALL PICKUP AND DESTINATION TO ONE ARRAY TO PROCESS
          let arrayLocation = [objPickupLocation, ...destinationArr];
          // console.log("arrayLocation", arrayLocation);

          let findIndex = _.findIndex(arrayLocation, item => _.isEmpty(item.name));
          console.log("find index to fill auto in ", arrayLocation, findIndex);
          const [place = {}] = results;
          // console.log("place", place);
          let { location } = place.geometry;
          let data = {
            address: place.formatted_address,
            name: place.formatted_address,
            latitude: location.lat(),
            longitude: location.lng(),
            lat: location.lat(),
            lng: location.lng()
          };
          // console.log(data);
          if (findIndex !== -1) {
            // POSITION >= 1 IS IN DESTINATION ARR
            // POSITION === 0 IS PICKUP LOCATION
            let temp = {};
            // ! THIS CASE IF IS NOT FOR CATEGORY MOTOCYLES, SPORTCAR
            if (!allowSubCategory) {
              if (findIndex >= 1) {
                // !but need minus -1 is correcly
                temp = [...destinationArr];
                temp[findIndex - 1] = data;
                console.log("destinationArr in booking map", temp);
                onSaveBookingData({ ...bookingData, destinationArr: temp });
              } else {
                temp = { ...bookingData, objPickupLocation: data, pickupLocation: data.name };
                console.log("pickup in booking map", temp);
                onSaveBookingData(temp);
              }
              console.log("temp----------", temp);
              // getEstimatePrice(temp);
            }
          }
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };

  render() {
    const {
      bookingData: { objPickupLocation = {}, destinationArr = [], key = "" },
      directions = {}
    } = this.props;

    const { center = {} } = this.state;
    // console.log("BOOKING MAP PROPS-----------", this.props);
    return (
      // Important! Always set the container height explicitly
      <div className={"map-booking-wrapper"}>
        <MapContainer
          onClick={e => {
            this.handleClick(e);
          }}
          height={942}
          center={this.chooseCenterPoint(objPickupLocation, destinationArr, center, key)}
          pickupLocation={objPickupLocation}
          destinationArr={destinationArr}
          directions={_.isEmpty(directions) ? null : directions}
        />
      </div>
    );
  }
}

BookingMap.propTypes = {};

export default BookingMap;
