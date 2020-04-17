/**
 *
 * StepFourSignUp
 *
 */

import React from "react";
import FormGroup from "../../components/FormGroup";
import { Formik } from "formik";
import SubmitButton from "../../components/SubmitButton";
import GhostButton from "../GhostButton";
import { Link } from "react-router-dom";
import "./style.scss";
import _ from "lodash";
import Selection from "../Selection";
import InputForm from "../InputForm";
import * as Yup from "yup";

export const validateFormAccountBank = Yup.object().shape({
  countryId: Yup.string()
    .required("Country is required"),
  stateId: Yup.string()
    .required("State is required"),
  cityId: Yup.string()
    .required("City is required"),
  zipcode: Yup.string()
    .required("Zip code is required"),
  addressLine1: Yup.string()
    .required("Address 1 is required"),
  accountNumber: Yup.string()
    .required("IBAN is required")
});
/* eslint-disable react/prefer-stateless-function */
class StepFourSignUp extends React.PureComponent {
  render() {
    const {
      apiError = [],
      payoutCountryList = [],
      payoutStateList = [],
      payoutCityList = [],
      getPayOutState = () => {
      },
      getPayOutCity = () => {
      },
      onSubmit = () => {
      }
    } = this.props;
    return (
      <div className={"step-four-wrapper"}>
        <FormGroup title={"Finish Setting Up"} progress={50}>
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={{
              "countryId": "",
              "stateId": "",
              "cityId": "",
              "zipcode": "",
              "addressLine1": "",
              "addressLine2": "",
              "accountNumber": ""
            }}
            enableReinitialize={true}
            validationSchema={validateFormAccountBank}
            onSubmit={evt => {
              console.log(evt);
              onSubmit(evt);
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
                  <div className={"col-6"}>
                    <Selection
                      title={"Country"}
                      name={"countryId"}
                      value={_.find(payoutCountryList, { "_id": values.countryId }) || ""}
                      options={payoutCountryList}
                      placeholder={"Country"}
                      prependLabel={`<i class="icon-address"/>`}
                      error={errors.countryId}
                      touched={touched.countryId}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option._id}
                      onChange={(option) => {
                        setFieldValue("countryId", option._id);
                        setFieldValue("stateId", "");
                        setFieldValue("cityId", "");
                        getPayOutState(option._id);
                      }}
                    />
                  </div>

                  <div className={"col-6"}>
                    <Selection
                      title={"State"}
                      name={"stateId"}
                      value={_.find(payoutStateList, { "_id": values.stateId }) || ""}
                      options={payoutStateList}
                      placeholder={"State"}
                      prependLabel={`<i class="icon-address"/>`}
                      error={errors.stateId}
                      touched={touched.stateId}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option._id}
                      onChange={(option) => {
                        setFieldValue("stateId", option._id);
                        setFieldValue("cityId", "");
                        getPayOutCity(values.countryId, option._id);
                      }}
                      disabled={_.isEmpty(values.countryId)}
                    />
                  </div>

                  <div className={"col-6"}>
                    <Selection
                      title={"City"}
                      name={"cityId"}
                      value={_.find(payoutCityList, { "_id": values.cityId }) || ""}
                      options={payoutCityList}
                      placeholder={"City"}
                      prependLabel={`<i class="icon-address"/>`}
                      error={errors.cityId}
                      touched={touched.cityId}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option._id}
                      onChange={(option) => {
                        setFieldValue("cityId", option._id);
                      }}
                      disabled={_.isEmpty(values.countryId) || _.isEmpty(values.stateId)}
                    />
                  </div>
                  <div className={"col-6"}>
                    <InputForm label={"Zipcode"}
                               name={"zipcode"}
                               type={"text"}
                               value={values.zipcode}
                               error={errors.zipcode}
                               touched={touched.zipcode}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Zipcode"}
                               prependLabel={`<i class="icon-address"/>`}
                    >
                    </InputForm>
                  </div>

                  <div className={"col-12"}>
                    <InputForm label={"Address 1"}
                               name={"addressLine1"}
                               type={"text"}
                               value={values.addressLine1}
                               error={errors.addressLine1}
                               touched={touched.addressLine1}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Address 1"}
                               prependLabel={`<i class="icon-arrow-address"/>`}
                    >
                    </InputForm>
                  </div>

                  <div className={"col-12"}>
                    <InputForm label={"Address 2"}
                               name={"addressLine2"}
                               type={"text"}
                               value={values.addressLine2}
                               error={errors.addressLine2}
                               touched={touched.addressLine2}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Address 2"}
                               prependLabel={`<i class="icon-arrow-address"/>`}
                    >
                    </InputForm>
                  </div>

                  <div className={"col-sm-6"}>
                    <InputForm label={"IBAN"}
                               name={"accountNumber"}
                               type={"text"}
                               value={values.accountNumber}
                               error={errors.accountNumber}
                               touched={touched.accountNumber}
                               onChange={evt => {
                                 handleChange(evt);
                               }}
                               onBlur={handleBlur}
                               placeholder={"IBAN"}
                               prependLabel={`<i class="icon-card"/>`}
                    >
                    </InputForm>
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

StepFourSignUp.propTypes = {};

export default StepFourSignUp;
