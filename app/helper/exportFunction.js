/* eslint-disable no-unused-vars */
import Moment from "moment";
import _, { findIndex, indexOf } from "lodash";
import { city, country, formatDate, formatTime, listError, suburbs, timeZone } from "./data";

export const parseLatLng = (address = { latitude: 10, longitude: 10 }) => {
  const { latitude = 10, longitude = 10 } = address;

  return { lat: latitude, lng: longitude };
};

export function editPhone(phoneNumber) {
  let phone = "";
  if (phoneNumber.substring(0, 1) === "0") {
    phone = phoneNumber.substring(1);
  } else {
    phone = phoneNumber;
  }
  return phone;
}

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else
    byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export function toDataURL(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    let reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export function getToken() {
  let token = null;
  token = localStorage.getItem("companyToken");
  return token;
}

export function getDate(item) {
  let temp = item.toString().split(" 00:");
  let date = temp[0].split(" ");
  temp = date[0] + " " + date[2] + " " + date[1] + " " + date[3];
  return temp;
}

export function getFormat(item, format) {
  Moment.locale("tr");
  return Moment(item).format(format);
}

export function dateDistance(item) {
  Moment.locale("tr");
  return Moment(item).fromNow();
}

export function addDateFormat(item, format, num, type) {
  Moment.locale("tr");
  return Moment(item).add(num, type).format(format);
}

export function setSelectValue(type, temp) {
  if (type === "timeZone") {
    timeZone.map((item) => {
      if (item.value === temp || item.label === temp) {
        return { value: item.value, label: item.label };
      }
    });
  } else if (type === "city") {
    city.map((item) => {
      if (item.value === temp || item.label === temp) {
        return item;
      }
    });
  } else if (type === "country") {
    country.map((item) => {
      if (item.value === temp || item.label === temp) {
        return item;
      }
    });
  } else if (type === "formatDate") {
    formatDate.map((item) => {
      if (item.value === temp || item.label === temp) {
        return item;
      }
    });
  } else if (type === "formatTime") {
    formatTime.map((item) => {
      if (item.value === temp || item.label === temp) {
        return item;
      }
    });
  } else {
    let list = [];
    temp.map(() => {
      let key = findIndex(suburbs, val => val.label === temp);
      if (key > -1) {
        list.push(suburbs[key]);
      }
    });
    return list;
  }
}

export function parseUriParameterToObject(str) {
  if (str !== "" && str !== null) {
    return JSON.parse("{\"" + decodeURI(str).replace(/"/g, "\\\"").replace(/&/g, "\",\"").replace(/=/g, "\":\"") + "\"}");
  } else {
    return {};
  }
}

export function capitalizeTheFirstLetter(str) {
  if (str === "" || str === null || str === undefined) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

//Change estimation format
export function changeEstimationFormat(value) {
  let temp = value.toString().split(".");
  if (temp[1]) {
    if (temp[1].length > 2) {
      return value.toString().substring(0, temp[0].length + 3);
    } else if (temp[1].length === 2) {
      return value.toString();
    } else if (temp[1].length === 1) {
      return value.toString() + "0";
    }
  } else {
    return value.toString() + ".00";
  }
}

function formatGooglePlaceList(list) {
  if (list && list.length > 0) {
    return list.map((item) => {
      return {
        value: item.structured_formatting.main_text,
        label: item.structured_formatting.main_text
      };
    });
  } else {
    return [];
  }
}

export function placeAutoComplete(type, key, countryCode) {

  let service = new google.maps.places.AutocompleteService();
  // let tservice = new google.maps.places.PlacesService()
  // tservice.getDetails({placeId: 'ChIJ38WHZwf9KysRUhNblaFnglM'},function(rs){
  //
  // })
  switch (type) {
    case "country": {
      return new Promise((resolve) => {
        resolve(country.filter((item) => {
          return item.label.toLowerCase().indexOf(key.toLowerCase().split(" ").join("")) > -1;
        }));
      });
    }

    case "city": {
      return new Promise((resolve) => {

        service.getPlacePredictions({
            input: key,
            types: ["(cities)"],
            componentRestrictions: { "country": countryCode }// Limit to Au at the current
          },
          (rs) => {

            resolve(formatGooglePlaceList(rs));
          });
      });
    }

    case "suburbs": {
      return new Promise((resolve) => {
        service.getPlacePredictions({
            input: key,
            types: ["address"],
            componentRestrictions: { "country": countryCode }// Limit to Au at the current
          },
          (rs) => {
            resolve(formatGooglePlaceList(rs));
          });
      });
    }
  }

  // let googlePlaceUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Acheron&key= AIzaSyDyoFDFZMhB6fdKBf75DMzDIIfTqKXZSy8`
  //  return fetch(googlePlaceUrl, {'mode': 'no-cors'});

}

export function locationAutoComplete(input) {
  // eslint-disable-next-line no-undef
  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {

  });
}

//Handle country
export function loadCountries(inputValue, callback) {
  placeAutoComplete("country", inputValue).then((rs) => {
    // Update country list
    console.log(rs);
    callback(rs);
  });
}

export const removePlus = (string) => {
  if (string && string.length > 1 && string.substring(0, 1) === "+") {
    return string.substring(1);
  } else {
    return string;
  }
};

export const removeZero = (string) => {
  if (string && string.length > 1 && string.substring(0, 1) === "0") {
    return string.substring(1);
  } else {
    return string;
  }
};

//Handle clear error api
export const clearApiError = (type, errorsApi, functionResetError) => {
  if (errorsApi && errorsApi.length > 0) {
    let index = findIndex(listError, val => val.name === type);


    if (index > -1 && indexOf(listError[index].error, errorsApi[0].errorCode) > -1) {
      return functionResetError;
    }

  }

  return null;
};

export const checkApiError = (name, error) => {
  if (!_.isEmpty(error)) {
    let index = findIndex(listError, val => val.name === name);
    if (index > -1) {
      if (indexOf(listError[index].error, error[0].errorCode) > -1) {
        return true;
      }
    }
    return false;
  }
};
