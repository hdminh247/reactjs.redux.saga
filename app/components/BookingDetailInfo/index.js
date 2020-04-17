/**
 *
 * BookingDetailInfo
 *
 */

import React from "react";
import "./styles.scss";
import InfoForm from "../InfoForm";
import { capitalizeTheFirstLetter } from "../../helper/exportFunction";
import moment from "moment";
import _ from "lodash";
import LabelStatusJob from "../LabelStatusJob";
import { categoryImage } from "../BookingForm";
import { PriceFormatter } from "../TableFormatter";
import PropTypes from "prop-types";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class BookingDetailInfo extends React.Component {
  parseLabelAndType = (status) => {
    let result = { type: "", label: "", classNameIcon: "" };

    let indexSearch = _.findIndex(status, { key: "completed" });

    if (indexSearch === -1) {

      result = _.findIndex(status, { key: "accepted" }) && status.length === 3 ?
        { ...result, type: "color-green", label: "Confirmed", classNameIcon: "icon-accept" } :
        { ...result, type: "color-warning", label: "Pending", classNameIcon: "icon-bookmark" };
    } else {
      result = { ...result, type: "color-green", label: "Completed", classNameIcon: "icon-accept" };
    }

    return result;
  };

  render() {
    const {
      hideDriver = false,
      showStatus = false,
      jobDetail: {
        jobId = "",
        category = { key: "" },
        subCategory = {},
        vehicle = { name: "" },
        checkIn = "",
        partySize = "",
        luggage = "",
        vanSize = "",
        promotion = "",
        rentalPeriod = { value: null, label: "" },
        driverLicense = {},
        assignedCompany = {
          name: "",
          avatar: ""
        },
        estimation = { value: 0, unit: "€" },
        status = [],
        description = ""
      },
      isShowPrice = false
    } = this.props;
    const { name: categoryName = "" } = category;
    const { name: subCategoryName = "" } = subCategory;
    const { name: driverLicenseName = "" } = driverLicense;

    return (
      <div className={"booking-detail-info-wrapper"}>
        <div className={"title"}>
          Booking ID {jobId}
        </div>
        <div className={"float-right status"}>
          {showStatus && <LabelStatusJob
            {...this.parseLabelAndType(status)}
          />
          }
        </div>

        <div className={"detail bg-grey"}>
          <div className={"row"}>
            <div className={"col-md-12"}>
              {vehicle && vehicle.name &&
              <div className={"vehicle"}>
                <InfoForm title={"Vehicle"}
                          content={vehicle.name}
                          classNameIcon={_.result(_.find(categoryImage, { key: category.key }), "icon", "")}/>
                <div className={"line"}/>
              </div>
              }
            </div>
            <div className={"col-md-6"}>
              {categoryName &&
              <div className={"vehicle"}>
                <InfoForm title={"Category"}
                          content={categoryName}
                />
              </div>
              }
            </div>
            <div className={"col-md-6"}>
              {subCategoryName &&
              <div className={"vehicle"}>
                <InfoForm title={"Sub Category"}
                          content={subCategoryName}
                />
              </div>
              }
            </div>
            <div className={"line col-md-12"}/>
          </div>
          {rentalPeriod && rentalPeriod.value &&
          <div className={"row"}>
            <div className={"col-6"}>
              <InfoForm title={"Rental Type"}
                        content={capitalizeTheFirstLetter(rentalPeriod.label)}
                        classNameIcon={"icon-calendar1"}/>
            </div>
            <div className={"col-6"}>
              <InfoForm title={`Total ${capitalizeTheFirstLetter(rentalPeriod.label)}`}
                        content={rentalPeriod.value}
                        classNameIcon={"icon-calendar1"}/>
            </div>
          </div>
          }
          {checkIn &&
          <div className={"row"}>
            <div className={"col-6"}>
              <InfoForm title={"Pickup Date"}
                        content={moment(checkIn).format("DD/MM/YYYY")}
                        classNameIcon={"icon-calendar1"}/>
            </div>
            <div className={"col-6"}>
              <InfoForm title={`Pickup Time`}
                        content={moment(checkIn).format("hh:mm")}
                        classNameIcon={"icon-combined-shape"}/>
            </div>
          </div>
          }
          <div className={"line"}/>
          <div className={"row"}>
            {partySize &&
            <div className={"col-sm-6"}>
              <InfoForm title={"No. of Customer"}
                        content={partySize}
                        classNameIcon={"icon-ui-interface-user-user-interface-accesability-help"}/>
            </div>}
            {!_.isEmpty(driverLicense) &&
            <div className={"col-sm-6"}>
              <InfoForm title={"Driver's license"}
                        content={driverLicenseName}
                        classNameIcon={"icon-license"}/>
            </div>}
            {!_.isEmpty(promotion) &&
            <div className={"col-sm-6"}>
              <InfoForm title={"Promo Code"}
                        content={promotion}
                        classNameIcon={"icon-coupon-percent"}/>
            </div>}
            {vanSize &&
            <div className={"col-sm-6"}>
              <InfoForm title={"Van Size"}
                        content={vanSize}
                        classNameIcon={"icon-vali"}/>
            </div>}
            {luggage &&
            <div className={"col-sm-6"}>
              <InfoForm title={"Amount of Luggage"}
                        content={luggage + "kg"}
                        classNameIcon={"icon-vali"}/>
            </div>}
            {description &&
            <div className={"col-sm-6"}>
              <InfoForm title={"Note"}
                        content={description}
                        classNameIcon={"icon-note1"}/>
            </div>}
          </div>

          {!hideDriver && assignedCompany && assignedCompany.name &&
          <div className={"driver-info row"}>
            <div className={"col-sm-6"}>
              <InfoForm title={"Driver"}/>
              <img className={"rounded-circle avatar"}
                   src={assignedCompany.avatar || ""}
                   onError={e => {
                     e.target.onerror = null;
                     e.target.src = "./avatar-default.jpg";
                   }}
                   alt="avatar"
              />
              <span className={"name"}>{assignedCompany.name}</span>
            </div>
            {isShowPrice && <div className={"col-sm-6 price"}>{PriceFormatter(estimation)}</div>}
          </div>
          }
        </div>
      </div>
    );
  }
}

BookingDetailInfo.propTypes = {
  jobDetail: PropTypes.object,
  hideDriver: PropTypes.bool,
  showStatus: PropTypes.bool
};

export default BookingDetailInfo;
