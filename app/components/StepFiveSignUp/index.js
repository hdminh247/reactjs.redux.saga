/**
 *
 * StepFiveSignUp
 *
 */

import React from "react";
import "./style.scss";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import FormGroup from "../FormGroup";
import SubmitButton from "../SubmitButton";
import GhostButton from "../GhostButton";
import Selection from "../Selection";
import * as Yup from "yup";
import InputForm from "../InputForm";
import ClassNames from "classnames";
import moment from "moment";
import Datepicker from "../Datepicker";
import _ from "lodash";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const validateForm = Yup.object().shape({
  licenseAndCertification: Yup.string()
    .required("Driver’s License certification is required"),
  licenseNumber: Yup.string()
    .required("Driver’s License number is required"),
  expiredAt: Yup.string()
    .required("Expired date is required")
});

/* eslint-disable react/prefer-stateless-function */
class StepFiveSignUp extends React.PureComponent {
  render() {
    const {
      apiError = [],
      driverLicenseList = [],
      onSubmit = () => {
      }
    } = this.props;

    return (
      <div className={"step-five-wrapper"}>
        <FormGroup title={"Finish Setting Up"} progress={70}>
          <Formik
            initialValues={{
              licenseAndCertification: "",
              licenseNumber: "",
              expiredAt: "",
              file: "",
              fileBaseBlob: ""
            }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={values => {
              let temp = { ...values };
              temp["expiredAt"] = moment(temp["expiredAt"]).format("MM/DD/YYYY");

              let formData = new FormData();
              Object.keys(temp).map(key => {
                formData.append(key, temp[key]);
              });
              onSubmit(formData);
            }}
          >
            {({
                values,
                setFieldValue,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (

              <form onSubmit={handleSubmit}>
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Selection
                      title={"Driving License Type"}
                      name={"licenseAndCertification"}
                      value={_.find(driverLicenseList, { "_id": values.licenseAndCertification }) || ""}
                      options={driverLicenseList}
                      placeholder={"Driving License Type"}
                      prependLabel={`<i class="icon-license"/>`}
                      error={errors.licenseAndCertification}
                      touched={touched.licenseAndCertification}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option._id}
                      onChange={(option) => {
                        setFieldValue("licenseAndCertification", option._id);
                      }}
                    />
                  </div>
                  <div className={"col-md-6"}>
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
                               prependLabel={`<i class="icon-license"/>`}
                    >
                    </InputForm>
                  </div>
                  <div className={"col-md-6"}>
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
                      onSelect={date => {
                        setFieldValue("expiredAt", date);
                      }}
                    />
                  </div>
                  <div className={"col-md-12"}>
                    <div className={"input-form-wrapper"}>
                      <label className="form-label" htmlFor="licenseNumber">Driver’s License images</label>
                      <div className={ClassNames("image-upload")}>
                        <div className={"license-image"}>
                          <img id="target" src={values.fileBaseBlob}
                               hidden={_.isEmpty(values.fileBaseBlob)}
                               alt={"driverLicense"}
                          />
                        </div>
                        <label className={"label"} htmlFor={"fileInput"}>
                          <i className={"icon icon-camera1"}/>
                        </label>
                        <input className={"d-none"}
                               accept="image/x-png,image/gif,image/jpeg"
                               onChange={(e) => {
                                 e.preventDefault();
                                 let reader = new FileReader();
                                 let file = e.target.files[0];
                                 reader.onloadend = () => {
                                   setFieldValue("file", file);
                                   setFieldValue("fileBaseBlob", reader.result);
                                 };
                                 reader.readAsDataURL(file);
                               }}
                               id={"fileInput"}
                               type={"file"}
                               name={"file"}/>
                      </div>
                    </div>
                  </div>
                </div>
                {(apiError && apiError.length > 0) ? apiError.map((error) => {
                  return (
                    <div key={error.errorCode} className="errors">
                      <span className="icon-error"/>
                      <div className="error-item">
                        <span>{error.errorMessage}</span>
                      </div>
                    </div>
                  );
                }) : null}

                <div className={"footer-submit"}>
                  <SubmitButton
                    className="btn-login btn-orange"
                    content={"Next"}/>

                  <Link to={"/"}>
                    <GhostButton title={"Cancel"} className={"btn-block btn-cancel"}/>
                  </Link>
                </div>
              </form>

            )}
          </Formik>

        </FormGroup>
      </div>
    );
  }
}

StepFiveSignUp.propTypes = {};

export default StepFiveSignUp;
