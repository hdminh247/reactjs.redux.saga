/**
 *
 * BookingForm
 *
 */

import React from "react";
import "./styles.scss";
// Lib
import moment from "moment";
import _ from "lodash";
import { Formik } from "formik";
import * as Yup from "yup";
import ClassNames from "classnames";
import Skeleton from "react-loading-skeleton";
// Component custom
import AddressItem from "../AddressItem";
import MultiDestination from "../MultiDestination";
import Datepicker from "../Datepicker";
import InputForm from "../InputForm";
import Checkbox from "../Checkbox";
import BaseButton from "../BaseButton";
import TextareaCounter from "../TextareaCounter";
import Selection, { formatOptionLabel } from "../Selection";
import AccordionRadioList from "../AccordionRadioList";
import { Scrollbars } from "react-custom-scrollbars";
import { initialState } from "../../containers/HomePage/reducer";
import { NO_SPECIAL_CHARACTER } from "../../helper/regex";
import PropTypes from "prop-types";
import RecommendRideItem from "../RecommendRideItem";

export const categoryImage = [
  {
    key: "luxury",
    image: "car.png",
    icon: "icon-luxury-car"
  },
  {
    key: "van",
    image: "car-pickup.png",
    icon: "icon-van"
  },
  {
    key: "business",
    image: "combined-shape.png",
    icon: "icon-bussiness"
  },
  {
    key: "motorcycle",
    image: "motorcycle.png",
    icon: "icon-motocycle"
  },
  {
    key: "sport_cars",
    image: "car-muscle.png",
    icon: "icon-sprot-cars"
  },
  {
    key: "driver",
    image: "car-steering-wheel.png",
    icon: "icon-driver"
  }
];

const baseValidateForm = {
  key: Yup.string(),
  addOption: Yup.boolean(),
  allowSubCategory: Yup.boolean(),
  includeDriver: Yup.boolean(),
  subCategory: Yup.string()
    .when("allowSubCategory", {
      is: true,
      then: Yup.string()
        .required("Sub category is required")
    }),
  pickupLocation: Yup.string()
    .when("allowSubCategory", {
      is: false,
      then: Yup.string()
        .required("Pickup location is required")
    }),
  destinationArr: Yup.array()
    .when("allowSubCategory", {
      is: false,
      then: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Address is required")
          })
        )
        .required("Must 1 destination")
        .min(1, "Minimum of 1 destinationArr")
    }),
  promotionTemp: Yup.string()
    .matches(
      NO_SPECIAL_CHARACTER,
      "Promotion code does not contain special characters"
    )
    .max(30, "Promotion code has to be between 1 and 30 characters long"),
  vanSize: Yup.number().nullable(true).transform(cv => isNaN(cv) ? undefined : cv)
    .when(["allowSubCategory", "key", "addOption"], {
      is: (allowSubCategory, key, addOption) => allowSubCategory || (!allowSubCategory && key === "driver") || !addOption,
      then: Yup.number().transform(cv => isNaN(cv) ? undefined : cv),
      otherwise: Yup.number()
        .transform(cv => isNaN(cv) ? undefined : cv)
        .required("Van size is required")
        .integer("Van size must be an integer")
        .min(2, "Van size has to be between 2 and 17 people")
        .max(17, "Van size has to be between 2 and 17 people")
      // .nullable(true)
    }),
  partySize: Yup.number().nullable(true).transform(cv => isNaN(cv) ? undefined : cv)
    .when("addOption", {
      is: true,
      then: Yup.number()
        .transform(cv => isNaN(cv) ? undefined : cv)
        .required("Party size is required")
        .integer("Party size must be an integer")
        .min(1, "Party size has to be between 1 and 17 people")
        .max(17, "Party size has to be between 1 and 17 people")
        .nullable(true)
    }),
  luggage: Yup.number()
    .transform(cv => isNaN(cv) ? undefined : cv)
    .min(0, "Amount of luggage has to be between 0 and 150 kilograms")
    .max(150, "Amount of luggage has to be between 0 and 150 kilograms")
    .nullable(true),
  checkIn: Yup.string().required("Check in is required"),
  note: Yup.string().max(
    500,
    "Note for driver size (Maximum at 500 characters)"
  ),
  rentalPeriodValue: Yup.number().nullable(true).transform(cv => isNaN(cv) ? undefined : cv)
    .when("allowSubCategory", {
      is: true,
      then: Yup.number()
        .transform(cv => isNaN(cv) ? undefined : cv)
        .required("Time rental is required")
        .integer("Time rental must be an integer")
        .positive("Time rental must be a positive")
        .nullable(true)
    }),
  driverLicense: Yup.string()
    .when(["allowSubCategory", "includeDriver"], {
      is: (allow, include) => allow && !include,
      then: Yup.string()
        .required("Driver license is required")
    }),
  raceCourse: Yup.string()
    .when("allowSubCategory", {
      is: true,
      then: Yup.string().required("Race course is required")
    })
};

export const validateBookingForm = Yup.object().shape({ ...baseValidateForm });
export const validateBookingFormWithMotorcycle = Yup.object().shape(
  {
    ...baseValidateForm,
    partySize: Yup.number().nullable(true).transform(cv => isNaN(cv) ? undefined : cv)
      .when("addOption", {
        is: true,
        then: Yup.number()
          .transform(cv => isNaN(cv) ? undefined : cv)
          .required("Party size is required")
          .integer("Party size must be an integer")
          .min(1, "Party size has to be between 1 and 2 people")
          .max(2, "Party size has to be between 1 and 2 people")
          .nullable(true)
      }),
    vehicle: Yup.string().required("Vehicle size is required")
  });

export const validateBookingFormWithSportCar = Yup.object().shape(
  {
    ...baseValidateForm,
    partySize: Yup.number().nullable(true).transform(cv => isNaN(cv) ? undefined : cv)
      .when("addOption", {
        is: true,
        then: Yup.number()
          .transform(cv => isNaN(cv) ? undefined : cv)
          .required("Party size is required")
          .integer("Party size must be an integer")
          .min(1, "Party size has to be between 1 and 4 people")
          .max(4, "Party size has to be between 1 and 4 people")
          .nullable(true)
      }),
    vehicle: Yup.string().required("Vehicle size is required")
  });

export const validateBookingFormWithDriver = Yup.object().shape({
  key: Yup.string(),
  addOption: Yup.boolean(),
  allowSubCategory: Yup.boolean(),
  includeDriver: Yup.boolean(),
  pickupLocation: Yup.string()
    .when("allowSubCategory", {
      is: false,
      then: Yup.string()
        .required("Pickup location is required")
    }),
  destinationArr: Yup.array()
    .when("allowSubCategory", {
      is: false,
      then: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Address is required")
          })
        )
        .required("Must 1 destination")
        .min(1, "Minimum of 1 destinationArr")
    }),
  promotionTemp: Yup.string()
    .matches(
      NO_SPECIAL_CHARACTER,
      "Promotion code does not contain special characters"
    )
    .max(30, "Promotion code has to be between 1 and 30 characters long"),
  // vanSize, partySize not need validate in driver
  luggage: Yup.number().nullable(true)
    .transform(cv => isNaN(cv) ? undefined : cv)
    .min(0, "Amount of luggage has to be between 0 and 150 kilograms")
    .max(150, "Amount of luggage has to be between 0 and 150 kilograms")
  ,
  checkIn: Yup.string().required("Check in is required"),
  note: Yup.string().max(
    500,
    "Note for driver size (Maximum at 500 characters)"
  ),
  // raceCourse is not in tab driver
  rentalPeriodValue: Yup.number().nullable(true)
    .transform(cv => isNaN(cv) ? undefined : cv)
    .required("Time rental is required")
    .integer("Time rental must be an integer")
    .positive("Time rental must be a positive")
    .nullable(true),
  driverLicense: Yup.string()
    .when("includeDriver", {
      is: true,
      then: Yup.string()
        .required("Driver license is required")
    })
});

export const switchValidation = (key) => {
  switch (key) {
    case "driver":
      return validateBookingFormWithDriver;

    case "motorcycle":
      return validateBookingFormWithMotorcycle;

    case "sport_cars":
      return validateBookingFormWithSportCar;

    case "luxury":
    case "business":
    case "van":
      return validateBookingForm;
  }
};

const rentalOption = [
  {
    label: "Day rental",
    value: "days"
  },
  {
    label: "Hour rental",
    value: "hours"
  }
];

const limitTime = (date) => {
  let diffMinutes = moment(date).diff(moment(), "minutes", false);
  let diffDate = moment(date).diff(moment(), "days", false);
  // console.log("DIFFERENT MINUTES", moment(date).format(), " with ", moment().format(), " minutes ", diffMinutes, "diff date", diffDate);
  // console.log("Return ", diffDate >= 1 && diffMinutes > 30);
  return diffDate >= 1 && diffMinutes > 30;
};

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const { showErrorBookingForm = false, bookingData = {} } = nextProps;
    // console.log("this.form--------", this.form);
    if (showErrorBookingForm) {
      // console.log("showErrorBookingForm--------", showErrorBookingForm, bookingData);
      this.form.current.validateForm(bookingData);
    }
  }

  render() {
    const {
      categoryList = [],
      subCategoryList: subCategoryDropdown = [],
      vehicleList = [],
      raceCourseList = [],
      driverLicenseList = [],
      bookingData = {},
      bookingData: {
        key = "driver", //keyword of category
        promotion = "",
        listVanSizes = [],
        addOption = false
      },
      estimatePrice = { unit: "€", value: 0 },
      estimateDistance: { totalDistance = 0, totalDuration = 0 },
      apiError = [],
      recommendRideList = [],
      popperPlacement = "bottom-start",
      showErrorBookingForm = false,
      loadingBlock: {
        loadingCategory = true,
        loadingSubCategory = true,
        loadingRaceCourse = true,
        loadingVehicle = true,
        loadingPrice = true
      },
      getSubCategory = (category) => {
      },
      getVehicle = (category, subcategory) => {
      },
      getRaceCourse = () => {
      },
      getDriverLicense = () => {
      },
      onChangeDestination = () => {
      },
      onSaveBookingData = () => {
      },
      onEstimatePrice = (values) => {
        console.log(values);
      },
      onBookNow = () => {
      },
      onChangeRecommendRide = () => {
      }
    } = this.props;
    const debounceEstimatePrice = _.debounce(onEstimatePrice, 1500);

    return (
      <div className={"booking-form-wrapper"}>
        <Scrollbars
          // This will activate auto hide
          autoHide
          autoHeight
          autoHeightMin={0}
          autoHeightMax={903}
          // Hide delay in ms
          autoHideTimeout={1000}
        >
          <Formik
            ref={this.form}
            initialValues={
              {
                ...bookingData,
                addOption,
                listVanSizes,
                vanSizeSelected: "",
                promotion: promotion,
                promotionTemp: promotion //promotion temp, when click add promotion button will save value
              }
            }
            enableReinitialize={true}
            validationSchema={switchValidation(key)}
            validateOnChange={true} // !!!DO NOT CHANGE
            validateOnBlur={true}
            onSubmit={e => {
              e["promotion"] = e.promotionTemp;
              this.props.onSubmit(e);
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              }) => (

              <form className={"form"}
                    onSubmit={handleSubmit}
                    onChange={() => {
                      // console.log("FORM ON CHANGE-------------", values);
                      // onSaveBookingData(values);
                    }}
              >
                {loadingCategory || categoryList.length === 0 ? <Skeleton height={56}/> :
                  <div className={"category-list d-flex justify-content-around"}>
                    {categoryList.map((category, index) => {
                      const { name = "", key = "" } = category;
                      let findImage = _.find(categoryImage, { key });
                      return (
                        <div key={key}
                             className={ClassNames(`category-item text-center`, key, { "active": index === _.findIndex(categoryList, { _id: values.category }) })}
                             onClick={(e) => {
                               e.preventDefault();
                               this.form.current.resetForm();
                               const { _id = "", allowSubCategory = false, key = "", listVanSizes = [] } = category;

                               let listTemp = [];
                               listVanSizes.forEach(function(element) {
                                 listTemp.push({ label: element, value: element });
                               });

                               // !!! trick data here
                               let temp = {
                                 ...initialState.get("bookingData").toJS(),
                                 addOption,
                                 key,//key is keyword of subcategory
                                 indexSelectedCategory: index,
                                 category: _id,
                                 allowSubCategory,
                                 listVanSizes: listTemp,

                                 // !TEMP TURN OFF FOR CURRENT LOGIC
                                 isOnlyDriver: key === "driver",
                                 includeDriver: key === "driver"
                               };

                               console.log("Booking data will change if change category", temp);
                               onSaveBookingData(temp);

                               //clear recommend ride when switch category other
                               onChangeRecommendRide([]);

                               //need do this object because formik change variable is slow 1 step
                               debounceEstimatePrice(temp);

                               //category has sub category will call api get subCategory
                               if (category && category.allowSubCategory || key === "driver") {
                                 const { key = "" } = category;
                                 getSubCategory(key);
                                 getRaceCourse();
                                 getDriverLicense();
                               }
                             }}>
                          <i className={ClassNames("icon", findImage && findImage.icon)}/>
                          <div className={"category-name"}>{name}</div>
                        </div>);
                    })}
                  </div>
                }

                <div className={"title"}>Booking for a ride now!</div>

                <div className={"show-sub-category"}
                  // hidden={(values.indexSelectedCategory >= 0 && categoryList.length >= 0 && categoryList[values.indexSelectedCategory] && !categoryList[values.indexSelectedCategory].allowSubCategory)
                  // || values.indexSelectedCategory < 0}
                     hidden={!(_.find(categoryList, { _id: values.category }) || { allowSubCategory: false }).allowSubCategory}
                >

                  <Selection
                    loading={loadingSubCategory}
                    name={"subCategory"}
                    title={"Type of vehicle"}
                    prependLabel={`<i class="${_.result(_.find(categoryImage, { key: values.key }), "icon", "")}"/>`}
                    value={_.find(subCategoryDropdown, { value: values.subCategory }) || ""}
                    options={subCategoryDropdown}
                    placeholder={`Choose ${categoryList && values.indexSelectedCategory >= 0 && categoryList[values.indexSelectedCategory] ? categoryList[values.indexSelectedCategory].name.toLowerCase() : ""} type`}
                    error={errors.subCategory}
                    touched={touched.subCategory || showErrorBookingForm}
                    getOptionLabel={option => option.label}
                    getOptionValue={option => option.value}
                    formatOptionLabel={formatOptionLabel}
                    onChange={(option) => {
                      const { value = "" } = option;

                      handleChange(values);
                      setFieldValue("subCategory", value);
                      setFieldValue("objSubCategory", option);
                      setFieldValue("vehicle", "");

                      getVehicle(values.category, option.value);
                      //need do this object because formik change variable is slow 1 step
                      debounceEstimatePrice({
                        ...values,
                        subCategory: option.value,
                        objSubCategory: option,
                        vehicle: ""
                      });
                    }}
                  />

                </div>

                <div className={"show-vehicle-list"}
                     hidden={_.isEmpty(values.subCategory)}
                >{loadingVehicle ?
                  <Skeleton height={336}/>
                  :
                  <AccordionRadioList list={vehicleList}
                                      activeKey={_.findIndex(vehicleList, { value: values.vehicle })}
                                      textEmpty={"List vehicle is empty"}
                                      handleChange={handleChange}
                                      touched={touched.vehicle || showErrorBookingForm}
                                      error={errors.vehicle}
                                      onChange={item => {
                                        // console.log(values);
                                        const { value = "" } = item;
                                        setFieldValue("vehicle", value);

                                        debounceEstimatePrice({
                                          ...values,
                                          vehicle: value
                                        });
                                        // onSaveBookingData({ ...values, vehicle: value });
                                      }}
                  />
                }
                </div>

                <div className={"show-recommend-ride"} hidden={_.isEmpty(recommendRideList)}>
                  <div className={"title-sub"}>Recommended for your ride</div>
                  <Scrollbars
                    // This will activate auto hide
                    autoHide
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={470}
                    // Hide delay in ms
                    autoHideTimeout={1000}
                  >
                    {recommendRideList.map(ride => <RecommendRideItem {...ride}
                                                                      onBookNow={(bookItem) => {
                                                                        onBookNow(bookItem);
                                                                      }}/>)}
                  </Scrollbars>
                </div>
                <div className={"show-race-course"} hidden={!values.allowSubCategory}>
                  <Selection
                    loading={loadingRaceCourse}
                    name={"raceCourse"}
                    prependLabel={"<i class=\"icon color-orange icon-marker\"/>"}
                    value={_.find(raceCourseList, { _id: values.raceCourse }) || ""}
                    error={errors.raceCourse}
                    touched={touched.raceCourse || showErrorBookingForm}
                    options={raceCourseList}
                    placeholder={`Choose race course`}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option._id}
                    onChange={(option) => {
                      const { _id = "" } = option;
                      setFieldValue("raceCourse", _id);
                      setFieldValue("destinationArr[0]", option);

                      values.destinationArr[0] = option;
                      values["raceCourse"] = _id;

                      let temp = { ...values };
                      onChangeDestination(temp);
                      debounceEstimatePrice(temp);
                    }}
                  />

                </div>
                <div className={"location-wrapper"}
                     hidden={values.allowSubCategory}>
                  <AddressItem
                    name={"pickupLocation"}
                    id={"pickupLocation"}
                    value={values.pickupLocation}
                    error={errors.pickupLocation}
                    touched={touched.pickupLocation || showErrorBookingForm}
                    placeholder={"Enter pickup location"}
                    prependLabel={`<i class="color-blue icon-circle1"/>`}
                    onBlur={handleBlur}
                    onSelect={(address) => {
                      setFieldValue("objPickupLocation", address);
                      setFieldValue("pickupLocation", address.address);

                      //need do this object because formik change variable is slow 1 step
                      let temp = { ...values, objPickupLocation: address, pickupLocation: address.address };
                      onChangeDestination(temp);
                      debounceEstimatePrice(temp);
                    }}
                    onChange={(value) => {
                      setFieldValue("objPickupLocation", {});
                      setFieldValue("pickupLocation", value);

                      let temp = { ...values, pickupLocation: value, objPickupLocation: {} };
                      console.log(temp);
                      // onSaveBookingData(temp);
                    }}
                  />

                  <MultiDestination
                    name={"destinationArr"}
                    errors={errors.destinationArr}
                    touched={touched.destinationArr || showErrorBookingForm}
                    value={values.destinationArr}
                    prependLabel={`<i class="color-orange icon-address"/>`}
                    onBlur={handleBlur}
                    onAdd={(list) => {
                      console.log("MultiDestination list", list);
                      setFieldValue("destinationArr", list);
                      let temp = { ...values, destinationArr: list };
                      onChangeDestination(temp);
                    }}
                    onDelete={(list) => {
                      setFieldValue("destinationArr", list);
                      let temp = { ...values, destinationArr: list };
                      onChangeDestination(temp);
                      debounceEstimatePrice(temp);
                    }}
                    onChange={list => {
                      setFieldValue("destinationArr", list);
                      let temp = { ...values, destinationArr: list };
                      console.log("onChange---------");
                      onChangeDestination(temp);
                      // debounceEstimatePrice(temp);
                    }}
                    onSelect={list => {
                      setFieldValue("destinationArr", list);
                      let temp = { ...values, destinationArr: list };
                      onChangeDestination(temp);
                      if (!_.isEmpty(values.destinationArr[0].name))
                        debounceEstimatePrice(temp);
                    }}
                  />
                </div>

                <div className={"rental-period-wrapper"}
                     hidden={!values.allowSubCategory && key !== "driver"}
                >
                  <div className={"row"}>
                    <div className={"col-md-6"}>
                      <Selection
                        name={"rentalPeriodLabel"}
                        prependLabel={"<i class=\"icon icon-calendar\"/>"}
                        defaultValue={rentalOption[0]}
                        options={rentalOption}
                        value={_.find(rentalOption, { value: values.rentalPeriod.label })}
                        placeholder={values.rentalPeriod.label}
                        getOptionLabel={option => option.label}
                        getOptionValue={option => option.value}
                        onChange={(option) => {
                          let temp = values.rentalPeriod;
                          temp["label"] = option.value;
                          setFieldValue("rentalPeriod", temp);
                          debounceEstimatePrice(values);
                        }}
                      />
                    </div>
                    <div className={"col-sm-6"}>
                      <InputForm
                        name={"rentalPeriodValue"}
                        placeholder={"Time rental"}
                        value={values.rentalPeriod.value}
                        error={errors.rentalPeriodValue}
                        type="number"
                        min={0}
                        touched={touched.rentalPeriodValue || showErrorBookingForm}
                        onChange={(e) => {
                          let temp = values.rentalPeriod;
                          temp["value"] = e.target.value;
                          setFieldValue("rentalPeriod", temp);
                          setFieldValue("rentalPeriodValue", e.target.value);
                          debounceEstimatePrice(values);
                        }}
                        onBlur={handleBlur}
                        prependLabel={`<i class="color-bluey-grey icon-combined-shape"/>`}
                      />
                    </div>
                  </div>
                </div>

                <div className={"checkin-wrapper"}>
                  <div className={"row"}>
                    <div className={"col-sm-6"}>
                      <Datepicker
                        name={"checkIn"}
                        selected={values.checkIn}
                        error={errors.checkIn}
                        touched={touched.checkIn || showErrorBookingForm}
                        prependLabel={`<i class="color-bluey-grey icon-calendar1"/>`}
                        minDate={moment().toDate()}
                        minTime={limitTime(values.checkIn)
                          ? moment(values.checkIn).set("hour", 0).set("minutes", 0).toDate()
                          : moment().toDate()
                        }
                        maxTime={moment(values.checkIn).set("hour", 23).set("minutes", 59).toDate()}
                        dateFormat="MM/dd/yyyy"
                        placeholderText={"Check in date"}
                        popperPlacement={popperPlacement}
                        onSelect={date => {
                          let diffThirtyMinutes = moment(date).diff(moment(), "minutes", false);
                          // console.log("diffThirtyMinutes", diffThirtyMinutes);
                          if (diffThirtyMinutes <= 30) {
                            let addTime = moment(new Date()).add(30, "minutes").toDate();
                            setFieldValue("checkIn", addTime);
                            debounceEstimatePrice({ ...values, checkIn: addTime });
                          } else {
                            setFieldValue("checkIn", date);
                            debounceEstimatePrice({ ...values, checkIn: date });
                          }
                        }}
                      />
                    </div>
                    <div className={"col-sm-6"}>
                      <Datepicker
                        name={"checkIn"}
                        selected={values.checkIn}
                        error={errors.checkIn}
                        touched={touched.checkIn || showErrorBookingForm}
                        prependLabel={`<i class="color-bluey-grey icon-combined-shape"/>`}
                        minDate={moment().toDate()}
                        minTime={limitTime(values.checkIn)
                          ? moment(values.checkIn).set("hour", 0).set("minutes", 0).toDate()
                          : moment().toDate()
                        }
                        maxTime={moment(values.checkIn).set("hour", 23).set("minutes", 59).toDate()}
                        dateFormat="HH:mm"
                        placeholderText={"Check in time"}
                        showTimeSelectOnly={true}
                        showTimeSelect={true}
                        popperPlacement={popperPlacement}
                        onSelect={date => {
                          setFieldValue("checkIn", date);
                          debounceEstimatePrice({ ...values, checkIn: date });
                        }}
                        onChange={date => {
                          setFieldValue("checkIn", date);
                          debounceEstimatePrice({ ...values, checkIn: date });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {bookingData && addOption &&
                <div className={"add-option"}>
                  <div className={"line-break"}/>
                  <div className={"row"}>
                    <div className={"col-md-6"}
                         hidden={key === "driver"}
                    >
                      <InputForm
                        name={"partySize"}
                        placeholder="Party size"
                        value={values.partySize}
                        error={errors.partySize}
                        type="number"
                        touched={touched.partySize || showErrorBookingForm}
                        onChange={evt => {
                          handleChange(evt);
                          values[evt.target.name] = evt.target.value;
                          onSaveBookingData({ ...values });
                          debounceEstimatePrice({ ...values });
                        }}
                        onBlur={handleBlur}
                        prependLabel={`<i class="color-bluey-grey icon-ui-interface-user-user-interface-accesability-help"/>`}
                      />
                    </div>
                    <div className={"col-md-6"}
                         hidden={values.allowSubCategory || values.key === "driver"}
                    >
                      <InputForm name={"luggage"}
                                 placeholder={"Luggage"}
                                 type={"number"}
                                 value={values.luggage}
                                 error={errors.luggage}
                                 touched={touched.luggage || showErrorBookingForm}
                                 onChange={evt => {
                                   handleChange(evt);
                                   values[evt.target.name] = evt.target.value;
                                   onSaveBookingData({ ...values });
                                   debounceEstimatePrice({ ...values });
                                 }}
                                 onBlur={handleBlur}
                                 prependLabel={`<i class="color-bluey-grey icon-vali"/>`}
                      />
                    </div>
                    <div className={"col-md-6"}>
                      <InputForm
                        name={"promotionTemp"}
                        placeholder="Promotion code"
                        value={values.promotionTemp}
                        error={errors.promotionTemp}
                        touched={touched.promotionTemp || showErrorBookingForm}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        prependLabel={`<i class="color-bluey-grey icon-coupon-percent"/>`}
                      />
                      <span className={"btn add-button"}
                            onClick={(e) => {
                              // e.preventDefault();
                              setFieldValue("promotion", values.promotionTemp);
                              debounceEstimatePrice({ ...values, promotion: values.promotionTemp });
                            }}
                      >Apply promo code
                      </span>
                    </div>
                    <div className={"col-md-6"}
                         hidden={values.allowSubCategory || values.key === "driver"}
                    >
                      <Selection
                        name={"rentalPeriodLabel"}
                        prependLabel={`<i class="color-bluey-grey icon-vali"/>`}
                        options={values.listVanSizes}
                        value={_.find(values.listVanSizes, { value: values.vanSize }) || ""}
                        error={errors.vanSize}
                        touched={touched.vanSize || showErrorBookingForm}
                        placeholder={"Van size"}
                        getOptionLabel={option => option.label}
                        getOptionValue={option => option.value}
                        onChange={(option) => {
                          const { value = 0 } = option;
                          setFieldValue("vanSize", value);
                          values["vanSize"] = value;
                          onSaveBookingData(values);
                          debounceEstimatePrice({ ...values });
                        }}
                      />
                      {/*<InputForm name={"vanSize"}*/}
                      {/*placeholder={"Van size"}*/}
                      {/*type={"text"}*/}
                      {/*value={values.vanSize}*/}
                      {/*error={errors.vanSize}*/}
                      {/*touched={touched.vanSize}*/}
                      {/*onChange={evt => {*/}
                      {/*handleChange(evt);*/}
                      {/*values[evt.target.name] = evt.target.value;*/}
                      {/*debounceEstimatePrice({ ...values });*/}
                      {/*}}*/}
                      {/*onBlur={handleBlur}*/}
                      {/*prependLabel={`<i class="color-bluey-grey icon-vali"/>`}*/}
                      {/*/>*/}
                    </div>
                  </div>

                  <TextareaCounter
                    name="description"
                    placeholder="Note"
                    rows={4}
                    value={values.description}
                    error={errors.description}
                    touched={touched.description || showErrorBookingForm}
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    prependLabel={`<i class="color-bluey-grey icon-note1"/>`}
                  />
                </div>
                }

                <div className={"include-driver-wrapper"}
                     hidden={values.indexSelectedCategory >= 0 && categoryList.length >= 0 && categoryList[values.indexSelectedCategory] && !categoryList[values.indexSelectedCategory].allowSubCategory}>
                  <Checkbox
                    name={"includeDriver"}
                    className={"include-driver"}
                    checked={values.includeDriver}
                    onChange={evt => {
                      handleChange(evt);
                      setFieldValue("driverLicense", "");
                      console.log(evt.target.checked);
                      values[evt.target.name] = evt.target.checked;
                      debounceEstimatePrice(values);
                    }}
                    label={"Include driver?"}/>
                </div>

                <div className={"driver-license-wrapper"}
                     hidden={
                       (!values.allowSubCategory || (values.allowSubCategory && values.includeDriver))
                       && (values.indexSelectedCategory >= 0 && categoryList.length >= 0 && categoryList[values.indexSelectedCategory] && categoryList[values.indexSelectedCategory].key !== "driver")
                     }>
                  <Selection
                    name={"driverLicense"}
                    prependLabel={"<i class=\"icon icon-license\"/>"}
                    value={_.find(driverLicenseList, { "_id": values.driverLicense }) || ""}
                    error={errors.driverLicense}
                    touched={touched.driverLicense || showErrorBookingForm}
                    options={driverLicenseList}
                    placeholder={`Driving license`}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option._id}
                    onChange={(option) => {
                      setFieldValue("driverLicense", option._id);
                      values["driverLicense"] = option._id;
                      debounceEstimatePrice({ ...values });
                    }}
                  />
                </div>

                {addOption &&
                <div className={"estimate-price"}>
                  <div className={"line-break"}/>
                  <div className={"row estimate-upper-section"}
                       hidden={values.indexSelectedCategory >= 0 && categoryList.length >= 0 && categoryList[values.indexSelectedCategory] && categoryList[values.indexSelectedCategory].allowSubCategory}
                  >
                    <div className={"col"}>
                      <div className={"estimate-title"}>
                        Estimate Distance
                      </div>
                      <div className={"estimate-title"}>
                        Estimate Time
                      </div>
                    </div>
                    <div className={"col"}>
                      <div className={"estimate-response text-right color-blue"}>
                        {totalDuration > 0 ? `${parseFloat(totalDistance / 1000)}km` : ""}
                      </div>
                      <div className={"estimate-response text-right"}>
                        {totalDuration > 0 ?
                          <span>
                                <span
                                  hidden={parseInt(totalDuration / 60 / 24 / 60) === 0}>{`${parseInt(totalDuration / 60 / 24 / 60)}days`}, </span>
                                <span
                                  hidden={parseInt(totalDuration / 60 / 60 % 24) === 0}>{`${parseInt(totalDuration / 60 / 60 % 24)}hrs, `}</span>
                                <span>{`${parseInt((totalDuration / 60 % 60))}mins`}</span>
                              </span>
                          :
                          ""
                        }
                      </div>
                    </div>
                  </div>
                  <div className={"row"}>
                    <div className={"col"}>
                      <div className={"estimate-title"}>
                        Estimate Price
                      </div>
                      <u className={"estimate-view-pricing pointer"}>View Pricing</u>
                    </div>
                    <div className={"col"}>
                      {loadingPrice ?
                        <Skeleton/>
                        :
                        <div className={"estimate-total text-right"}>
                          {estimatePrice.value}{estimatePrice.unit}
                        </div>
                      }
                    </div>
                  </div>
                </div>
                }

                {(apiError && apiError.length > 0) ? apiError.map((error) => {
                  return (
                    <div key={error.errorCode} className="errors">
                      <span className="icon-error"/>
                      <div className="error-item">
                        <span>{error.errorMessage}</span>
                      </div>
                    </div>
                  );
                }) : []}

                <BaseButton type={"submit"} className={"btn-block btn-primary"} content={"Offer your ride"}/>

              </form>
            )}
          </Formik>
        </Scrollbars>
      </div>

    );
  }
}

BookingForm.propTypes = {
  popperPlacement: PropTypes.string,
  showErrorBookingForm: PropTypes.bool,
  validateOnLoad: PropTypes.bool,
  onBookNow: PropTypes.func,
  onChangeRecommendRide: PropTypes.func
};

export default BookingForm;
