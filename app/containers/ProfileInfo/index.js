/**
 *
 * ProfileInfo
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { changeImage, changeStoreData, getCurrentUser, putCurrentUser, putDriverLicense } from "./actions";
import { changeStoreData as changeStoreDataProfile } from "../UserProfile/actions";
import makeSelectProfileInfor from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import "./style.scss";
import InputForm from "components/InputForm";
import SubmitButton from "components/SubmitButton";
import Datepicker from "components/Datepicker";
import Selection from "components/Selection";

import { Formik } from "formik";
import * as Yup from "yup";

import ClassNames from "classnames";
import moment from "moment";
import _ from "lodash";
import { getCountryList } from "../StepSignUp/actions";
import InputPhoneForm from "../../components/InputPhoneForm";
import TotalRatings from "../../components/TotalRatings";

import SuccessPopup from "../../components/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup";
import { getDriverLicense } from "../HomePage/actions";
import { REGEX_NAME } from "../../helper/regex";

/* eslint-disable react/prefer-stateless-function */
const validateForm = Yup.object().shape({
  "email": Yup.string()
    .email("Invalid email")
    .required("Please enter email"),
  "firstName": Yup.string()
    .min(1, "First name has to be between 1 and 30 characters long")
    .max(30, "First name has to be between 1 and 30 characters long")
    .required("Please enter Firstname")
    .matches(REGEX_NAME, "Invalid first name (no number and special characters)"),
  "lastName": Yup.string()
    .min(1, "Last name has to be between 1 and 30 characters long")
    .max(30, "Last name has to be between 1 and 30 characters long")
    .required("Please enter Lastname")
    .matches(REGEX_NAME, "Invalid first name (no number and special characters)"),
  "phoneNumber": Yup.string()
    .min(7, "Phone number must contain at least 7 characters")
    .required("Please enter Phone Number")
});

const genderList = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  },
  {
    label: "Other",
    value: "na"
  }
];

function flowFilter(array, substr) {
  return _.filter(array, _.flow(
    _.identity,
    _.values,
    _.join,
    _.toLower,
    _.partialRight(_.includes, substr)
  ));
}

export class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileDriver: ""
    };
  }

  UNSAFE_componentWillMount() {
    //call api get current user
    this.props.getCurrentUser();
    this.props.getCountryList();
    this.props.getDriverLicense();
    this.props.changeStoreData("isEdit", false);
  }

  onImageChange = (e, role) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let extension = file.type;
    if (extension !== "image/png" && extension !== "image/jpeg") {
      console.log(extension);
      this.props.changeStoreData("errorAPI", [{ errorMessage: "Should only upload \".png, .jpg\" files" }]);
      this.props.changeStoreData("showPopupError", true);
      return false;
    }
    reader.onloadend = () => {
      if (role === "customer") {
        this.setState({
          file: file
        });
      } else {
        this.setState({
          fileDriver: file
        });
      }
      this.props.changeImage(reader.result, role);
    };
    reader.readAsDataURL(file);
  };

  render() {
    const {
      dataUser: {
        email = "",
        firstName = "",
        lastName = "",
        phoneNumber = "",
        dob = undefined,
        gender = "",
        avatar = "avt-default.png",
        countryCode = "",
        company = "",
        role = ["customer"],
        currentProgress = 1
      },
      showPopupError = false,
      showSuccessModal = false,
      errorAPI = [],
      isEdit = false,
      driverLicenseList = [],
      licenseImage = ""
    } = this.props.profileInfor;
    const countryList = this.props.profileInfor.countryList;

    // CERTIFICATION
    const { licensesAndCertifications = [] } = company;
    let proofs = [], pathCertification = "";
    console.log("licensesAndCertifications", licensesAndCertifications);
    if (!_.isEmpty(licensesAndCertifications)) {
      [{ proofs = [] }] = licensesAndCertifications;
    }
    console.log("proofs", proofs);
    if (!_.isEmpty(proofs)) {
      [{ path: pathCertification = "" }] = proofs;
    }

    const {
      file = "",
      fileDriver = ""
    } = this.state;
    console.log("proofs", proofs);
    console.log("pathCertification", pathCertification);
    console.log("licenseImage", licenseImage);
    console.log("image to show", !_.isEmpty(pathCertification) ? pathCertification : licenseImage);
    return (
      <div className={"profile-infor-wrapper"}>
        <Helmet>
          <title>Profile Info</title>
          <meta name="description" content="Description of ProfileInfor"/>
        </Helmet>
        <div className={"header-profile"}>
          <div className={"profile-pic"}>
            <img alt={"avatar"} id="target" className={"avatar-user"} src={avatar}/>
            <div className={ClassNames("image-upload", { "d-none": isEdit === false })}>
              <label htmlFor={"file-input"}>
                <i className={"icon icon-camera1"}/>
              </label>
              <input onChange={(e) => {
                this.onImageChange(e, "customer");
              }} id={"file-input"} type={"file"} name={"file"} accept={".png, .jpg, .jpeg"}/>
            </div>
          </div>
          <button className={ClassNames("btn btn-edit", { "d-none": isEdit === true })} onClick={() => {
            this.props.changeStoreData("isEdit", true);
          }}><i className="icon-pencil-1"/><span className={"text"}>Edit Profile</span></button>
        </div>
        <div className={ClassNames({ "edit-profile": isEdit === false })}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={
              {
                email,
                firstName,
                lastName,
                phoneNumber,
                dob: _.isEmpty(dob) ? undefined : moment(dob).toDate(),
                gender,
                countryCode,
                countryId: "",
                licenseAndCertification: licensesAndCertifications.length ? licensesAndCertifications[0].licensesAndCertification : {
                  name: "",
                  _id: ""
                },
                licenseNumber: licensesAndCertifications.length ? licensesAndCertifications[0].licenseNumber : "",
                expiredAt: licensesAndCertifications.length ? moment(licensesAndCertifications[0].expiredAt).toDate() : undefined,
                proofs: licensesAndCertifications.length ? licensesAndCertifications[0].proofs : []
              }
            }
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={evt => {
              this.props.changeStoreDataProfile("user", {
                "verifyData": {
                  "countryCode": evt.countryCode,
                  "phoneNumber": evt.phoneNumber
                }
              });
              let temp = {
                ...evt,
                dob: evt.dob ? moment(evt.dob).format("MM/DD/YYYY") : ""
              };
              let formData = new FormData();
              formData.append("file", file);
              Object.keys(temp).map(key => {
                formData.append(key, temp[key]);
              });

              this.props.putCurrentUser(formData)
                .then((res) => {

                  //!IF CURRENT USER IS COMPANY
                  if (_.indexOf(role, "company") >= 0) {
                    let formDataDriver = new FormData();

                    const { licenseAndCertification = {}, expiredAt = "", licenseNumber = "" } = evt;
                    const { _id: licenseAndCertificationId = "" } = licenseAndCertification;
                    let dataForDriver = {
                      companyLicenseId: "",
                      licenseAndCertification: licenseAndCertificationId,
                      licenseNumber: licenseNumber,
                      expiredAt: moment(expiredAt).format("MM/DD/YYYY"),
                      imageArrId: [], //!id image to delete
                      file: ""
                    };

                    // !IS NOT SETUP LICENSE IN STEP SETUP, WILL POST DATA
                    if (currentProgress < 6) {

                    }
                    //!ALREADY SETUP LICENSE IN STEP SETUP, WILL PUT DATA
                    else {
                      let companyLicenseId = "";
                      if (!_.isEmpty(licensesAndCertifications)) {
                        [{ _id: companyLicenseId = "" }] = licensesAndCertifications;
                      }
                      dataForDriver.companyLicenseId = companyLicenseId;

                      if (!_.isEmpty(licenseImage)) {

                        dataForDriver.file = fileDriver;

                        if (!_.isEmpty(evt.proofs))
                          dataForDriver.imageArrId = evt.proofs.map(item => {
                            const { _id = "" } = item;
                            return _id;
                          });
                      }


                      Object.keys(dataForDriver).map((key) => {
                        console.log(dataForDriver[key]);
                        formDataDriver.append(key, dataForDriver[key]);
                      });

                      this.props.putDriverLicense(companyLicenseId, formDataDriver);
                    }
                  } else {
                    this.props.changeStoreData("showSuccessModal", true);
                  }
                });


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
                /* and other goodies */
              }) => (
              <form onSubmit={handleSubmit}>
                {company.isApproved && company.avgRating && <TotalRatings value={company.avgRating.rating}/>}
                <div className={ClassNames("row", { "view-col": !isEdit })}>
                  <div className={ClassNames("col-6", { "full-col": isEdit })}>
                    <InputForm label={"First name"}
                               name={"firstName"}
                               type={"text"}
                               value={values.firstName}
                               error={errors.firstName}
                               touched={touched.firstName}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Enter your first name"}
                               prependLabel={`<i class="icon-user1"/>`}
                               disabled={!isEdit}>
                    </InputForm>
                  </div>
                  <div className={ClassNames("col-6", { "full-col": isEdit })}>
                    <InputForm
                      label={"Last name"}
                      name={"lastName"}
                      type={"text"}
                      value={values.lastName}
                      error={errors.lastName}
                      touched={touched.lastName}
                      onChange={evt => {
                        handleChange(evt);
                      }}
                      onBlur={handleBlur}
                      placeholder={"Enter your last name"}
                      prependLabel={`<i class="icon-user1"/>`}
                      disabled={!isEdit}>
                    </InputForm>
                  </div>
                </div>
                <InputForm label={"Email"}
                           name={"email"}
                           type={"email"}
                           value={values.email}
                           error={errors.email}
                           touched={touched.email}
                           onChange={evt => {
                             handleChange(evt);
                           }}
                           onBlur={handleBlur}
                           placeholder={"Enter your email"}
                           prependLabel={`<i class="icon-mail"/>`}
                           disabled={!isEdit}>
                </InputForm>
                <InputPhoneForm label={"Phone number"}
                                name={"phoneNumber"}
                                type={"number"}
                                value={values.phoneNumber}
                                error={errors.phoneNumber}
                                isHidden={!isEdit && _.isEmpty(values.phoneNumber)}
                                touched={touched.phoneNumber}
                                valueCountryCode={values.countryCode}
                                iconCountry={flowFilter(values.countryCode !== "" && countryList, values.countryCode).length >= 1 ? flowFilter(countryList, values.countryCode).find(x => x._id === values.countryId) : ""}
                                listCountryCode={countryList}
                                prependLabel={`<i class="icon-phone1"/>`}
                                placeholder={"Enter your mobile phone"}
                                prependLabelPhone={true}
                                disabled={!isEdit}
                                onChangeCountryCode={country => {
                                  setFieldValue("countryCode", country.countryCode);
                                  setFieldValue("countryId", country._id);
                                }}
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                />
                <div className={ClassNames("row", { "view-col": !isEdit })}>
                  <div className={ClassNames("col-6", { "full-col": isEdit })}>
                    <Datepicker
                      label={"Date of Birth"}
                      name={"dob"}
                      maxDate={moment().subtract(18, "years").toDate()}
                      prependLabel={`<i class="icon-calendar1"/>`}
                      dateFormat="MM/dd/yyyy"
                      placeholderText={"Enter your date of birth"}
                      selected={values.dob}
                      showMonthDropdown={true}
                      showYearDropdown={true}
                      isHidden={!isEdit && values.dob === undefined}
                      onSelect={date => {
                        setFieldValue("dob", date);
                      }}
                      disabled={!isEdit}
                    />
                  </div>
                  <div className={ClassNames("col-6", { "full-col": isEdit })}>
                    <Selection
                      title={"Gender"}
                      name={"gender"}
                      value={_.findIndex(genderList, { "value": values.gender }) >= 0 ? genderList[_.findIndex(genderList, { "value": values.gender })] : undefined}
                      // prependLabel={`<i class="icon-user1"/>`}
                      options={genderList}
                      placeholder={"Enter your gender"}
                      prependLabel={`<i class="icon-user1"/>`}
                      error={errors.gender}
                      touched={touched.gender}
                      getOptionLabel={option => option.label}
                      getOptionValue={option => option.value}
                      isHidden={!isEdit && values.gender === ""}
                      onChange={(option) => {
                        setFieldValue("gender", option.value);
                      }}
                      disabled={!isEdit}
                    />
                  </div>
                </div>

                {company.isApproved &&
                <div className={"driver-license-wrapper"}>
                  <div className={"driver-license-detail"}>
                    <div className={ClassNames("row", { "view-col": !isEdit })}>
                      {/* {company && licensesAndCertifications && licensesAndCertifications[0]} */}
                      <div className={"col-sm-6"}>
                        <Selection
                          title={"Driving License Type"}
                          name={"licenseAndCertification"}
                          value={values.licenseAndCertification}
                          options={driverLicenseList}
                          placeholder={"Driving License Type"}
                          prependLabel={`<i class="icon-license"/>`}
                          error={errors.licenseAndCertification}
                          touched={touched.licenseAndCertification}
                          getOptionLabel={option => option.name}
                          getOptionValue={option => option._id}
                          disabled={!isEdit}
                          onChange={(option) => {
                            setFieldValue("licenseAndCertification", option);
                          }}
                        />
                      </div>
                      <div className={"col-sm-6"}>
                        <InputForm label={"Driver’s License No."}
                                   placeholder={"Driver’s License No."}
                                   name={"licenseNumber"}
                                   type={"text"}
                                   value={values.licenseNumber}
                                   error={errors.licenseNumber}
                                   touched={touched.licenseNumber}
                                   onChange={evt => {
                                     handleChange(evt);
                                   }}
                                   onBlur={handleBlur}
                                   disabled={!isEdit}
                                   prependLabel={`<i class="icon-license"/>`}
                        />
                      </div>
                      <div className={"col-sm-6"}>
                        <Datepicker
                          label={"Driver’s License EXP"}
                          placeholderText={"Driver’s License EXP"}
                          name={"expiredAt"}
                          error={errors.expiredAt}
                          touched={touched.expiredAt}
                          minDate={moment().toDate()}
                          prependLabel={`<i class="icon-calendar1"/>`}
                          dateFormat="MM/dd/yyyy"
                          selected={values.expiredAt}
                          showMonthDropdown={true}
                          showYearDropdown={true}
                          disabled={!isEdit}
                          onSelect={date => {
                            setFieldValue("expiredAt", date);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={"driver-license-image"}>
                    <label>Driver’s License images</label>
                    <div className={"cover-image"}>
                      <div className={ClassNames("image-upload")}>
                        <div className={ClassNames({ "d-none": isEdit === false })}>
                        <label htmlFor={"file-input-driver"}>
                          <i className={"icon icon-camera1"}/>
                        </label>
                        <input id={"file-input-driver"}
                               type={"file"}
                               name={"fileProfile"}
                               accept={".png, .jpg"}
                               onChange={(e) => {
                                 this.onImageChange(e, "driver");
                               }}
                        />
                        </div>
                        <img alt={"license"}
                             className={"license-image"}
                             src={!_.isEmpty(licenseImage) ? licenseImage : pathCertification}/>
                      </div>
                    </div>
                  </div>
                </div>
                }
                <div className={ClassNames("row", { "view-col": !isEdit })}>
                  <div className={"col-md-6"}>
                    <SubmitButton
                      className={ClassNames("btn-login btn-orange", { "d-none": isEdit === false })}
                      content={"Update"} onClick={() => {
                    }}/>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <SuccessPopup visible={showSuccessModal}
                      title={"Profile Info"}
                      content={"Your profile has been changed!"}
                      toggle={value => {
                        this.props.changeStoreData("showSuccessModal", false);
                        this.props.changeStoreData("isEdit", false);
                      }}/>
        <ErrorPopup visible={showPopupError}
                    title={"Profile Info"}
                    onSubmit={() => {
                      this.props.changeStoreData("showPopupError", false);
                      this.props.changeStoreData("isEdit", true);
                    }}
                    content={errorAPI && errorAPI.length > 0 && errorAPI[0] && errorAPI[0].errorMessage}/>
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  dispatch: PropTypes.func,
  getCurrentUser: PropTypes.func,
  putCurrentUser: PropTypes.func,
  getCountryList: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeImage: PropTypes.func,
  getDriverLicense: PropTypes.func,
  putDriverLicense: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  profileInfor: makeSelectProfileInfor()
});

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
    putCurrentUser: (dataUser) => {
      return new Promise((resolve, reject) => {
        dispatch(putCurrentUser(dataUser, resolve, reject));
      });

    },
    getCountryList: () => {
      dispatch(getCountryList());
    },
    changeImage: (avatar, role) => {
      dispatch(changeImage(avatar, role));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeStoreDataProfile: (key, value) => {
      dispatch(changeStoreDataProfile(key, value));
    },
    getDriverLicense: () => {
      dispatch(getDriverLicense());
    },
    putDriverLicense: (companyLicenseId, dataForm) => {
      dispatch(putDriverLicense(companyLicenseId, dataForm));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "profileInfor", reducer });
const withSaga = injectSaga({ key: "profileInfor", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ProfileInfo);
