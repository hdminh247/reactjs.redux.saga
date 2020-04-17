import React from "react";
import FormGroup from "../../components/FormGroup";
import { Formik } from "formik";
import SubmitButton from "../../components/SubmitButton";
import * as Yup from "yup";
import GhostButton from "../GhostButton";
import Datepicker from "../Datepicker";
import moment from "moment";
import { Link } from "react-router-dom";
import "./style.scss";
import InputPhoneForm from "../InputPhoneForm";

const validateForm = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Please enter phone number")
    .min(6, "Invalid phone number (At least 6)"),
  dob: Yup.string()
    .required("Please enter phone DOB")
});

function StepOneSignUp(props) {
  const {
    apiError = [],
    onSubmit = (evt) => {
    },
    countryList = []
  } = props;
  return (
    <div className={"step-one-wrapper"}>
      <FormGroup title={"Finish Setting Up"} progress={25}>
        <Formik
          initialValues={{
            dob: "",
            phoneNumber: "",
            countryCode: "",
            countryIcon: ""
          }}
          enableReinitialize={true}
          validationSchema={validateForm}
          onSubmit={evt => {
            console.log("evt", evt);
            onSubmit(evt);
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
              <div className={"input-form-wrapper"}>
                <div className="form-label">Birthday</div>

                <div className={"form-input row"}>
                  <div className={"col-4"}>
                    <Datepicker selected={values.dob}
                                maxDate={moment().subtract(18, "years").toDate()}
                                dateFormat={"MM"}
                                placeholderText={"Month"}
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                prependLabel={`<i class="color-blue icon-calendar"/>`}
                                onChange={date => {
                                  setFieldValue("dob", moment(date).toDate());
                                }}
                                onSelect={date => {
                                  setFieldValue("dob", moment(date).toDate());
                                }}
                    />
                  </div>
                  <div className={"col-4"}>
                    <Datepicker selected={values.dob}
                                maxDate={moment().subtract(18, "years").toDate()}
                                dateFormat={"dd"}
                                placeholderText={"Day"}
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                prependLabel={`<i class="color-blue icon-calendar"/>`}
                                onChange={date => {
                                  setFieldValue("dob", moment(date).toDate());
                                }}
                                onSelect={date => {
                                  setFieldValue("dob", moment(date).toDate());
                                }}
                    />
                  </div>
                  <div className={"col-4"}>
                    <Datepicker selected={values.dob}
                                maxDate={moment().subtract(18, "years").toDate()}
                                dateFormat={"yyyy"}
                                placeholderText={"Year"}
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                prependLabel={`<i class="color-blue icon-calendar"/>`}
                                onChange={date => {
                                  setFieldValue("dob", moment(date).toDate());
                                }}
                                onSelect={date => {
                                  setFieldValue("dob", moment(date).toDate());
                                }}
                    />
                  </div>
                  <div className={"col-12"}>
                    {touched.dob && errors.dob && (
                      <div className={"error-text"}>
                        <i className={"icon-error"}/>
                        <span>{errors.dob}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <InputPhoneForm label={"Cell phone"}
                              name={"phoneNumber"}
                              type={"number"}
                              value={values.phoneNumber}
                              error={errors.phoneNumber}
                              touched={touched.phoneNumber}
                              valueCountryCode={values.countryCode}
                              iconCountry={values.countryIcon}
                              placeholder={"Enter your mobile phone"}
                              prependLabelPhone={true}
                              listCountryCode={countryList}
                              prependLabel={`<i class="color-blue icon-phone1"/>`}
                              onChangeCountryCode={country => {
                                setFieldValue("countryCode", country.countryCode);
                                setFieldValue("countryIcon", country.icon);
                              }}
                              onChange={evt => {
                                handleChange(evt);
                              }}
                              onBlur={handleBlur}
              />

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

StepOneSignUp.propTypes = {};

export default StepOneSignUp;
