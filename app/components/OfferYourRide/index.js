/**
 *
 * OfferYourRide
 *
 */

import React from "react";
import "./styles.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Selection from "../Selection";
import InputForm from "../InputForm";
import TextareaCounter from "../TextareaCounter";
import SubmitButton from "../SubmitButton";
import * as PropTypes from "prop-types";
import _ from "lodash";

const validateForm = Yup.object().shape({
  key: Yup.string(),
  allowSubCategory: Yup.boolean(),
  estimation: Yup.string()
    .required("Please enter price"),
  vehicle: Yup.string()
    .when(["allowSubCategory", "key"], {
      is: (allowSubCategory, key) => allowSubCategory || (!allowSubCategory && key === "driver"),
      then: Yup.string(),
      otherwise: Yup.string().required("Please select vehicle")
    })
});

/* eslint-disable react/prefer-stateless-function */
class OfferYourRide extends React.PureComponent {
  render() {
    let {
      formikRef = null,
      apiError = [],
      driverVehicleList = [],
      jobDetail = {},
      jobDetail: {
        category = {},
        earningAndPayment = {},
        estimation = {
          unit: "$",
          value: 0
        }
      },
      onSubmit = () => {
      }
    } = this.props;

    const { allowSubCategory = false, key = "" } = category;

    return (
      <div className={"offer-your-ride-wrapper"}>
        <div className={"title"}>Offer your ride</div>
        <div className={"detail"}>
          <div className={"price-limit"}>Price limit</div>
          {!_.isEmpty(jobDetail) && !_.isEmpty(estimation) && <div className={"price text-center"}>
            {estimation.value}{estimation.unit}
          </div>
          }

          <Formik
            ref={formikRef}
            initialValues={{
              estimation: "",
              vehicle: "",
              description: "",
              allowSubCategory,
              key
            }}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={(evt, { resetForm }) => {
              console.log("submit");
              onSubmit(evt, resetForm);
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
                <Selection
                  isHidden={key === "driver" || allowSubCategory}
                  title={"Choose your vehicle"}
                  name={"vehicle"}
                  value={_.find(driverVehicleList, { _id: values.vehicle }) || ""}
                  options={driverVehicleList}
                  placeholder={"Choose your vehicle"}
                  prependLabel={`<i class="icon icon-money"/>`}
                  error={errors.veapiPutDriverLisencehicle}
                  touched={touched.vehicle}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option._id}
                  onChange={(option) => {
                    const { _id = "" } = option;
                    setFieldValue("vehicle", _id);
                  }}
                />

                <InputForm label={"Your price"}
                           name={"estimation"}
                           type={"number"}
                           placeholder={"Your bidding price here"}
                           prependLabel={`<i class="icon icon-money"/>`}
                           value={values.estimation}
                           error={errors.estimation}
                           touched={touched.estimation}
                           onChange={handleChange}
                           onBlur={handleBlur}
                />

                <TextareaCounter title={"Note for customer"}
                                 name={"description"}
                                 type={"text"}
                                 value={values.description}
                                 error={errors.description}
                                 touched={touched.description}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 rows={4}
                />

                <SubmitButton
                  className="btn-login btn-orange"
                  content={"Request to drive"}/>

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

              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

OfferYourRide.propTypes = {
  driverVehicleList: PropTypes.array
};

export default OfferYourRide;
