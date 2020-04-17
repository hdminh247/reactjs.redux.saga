/**
 *
 * RatingPopup
 *
 */

import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import "./style.scss";
import "../../containers/Auth/style.scss";
import * as Yup from "yup";
import SubmitButton from "../SubmitButton";
import RatingItemDriver from "../RatingItemDriver";
import TextareaCounter from "../TextareaCounter";
import { Formik } from "formik";

const validateForm = Yup.object().shape({});

function RatingPopup(props) {
  const {
    visible = false,
    apiError = [],
    onSubmit = () => {
    },
    toggle = (value) => {
    },
    jobDetail = {},
    ratingList = [],
    ratingDriver = () => {
    }
  } = props;

  const { assignedCompany = {} } = jobDetail;
  const { ownedBy = {} } = assignedCompany;
  const { firstName = "", lastName = "", avatar = "" } = ownedBy;

  return (
    <Modal className={"modal-wrapper rating-popup-wrapper"}
           isOpen={visible}
           size={"lg"}
           centered={true}>
      <ModalHeader toggle={toggle}>
        <div className={"title"}>Rating & Review</div>
      </ModalHeader>
      <Formik
        initialValues={{
          content: ""
        }}
        enableReinitialize={true}
        validationSchema={validateForm}
        onSubmit={(evt) => {
          let temp = {};
          console.log(ratingList);
          ratingList.map(rtl => {
            const { key = "", value = 0 } = rtl;
            temp[key] = parseInt(value);
          });

          temp = { ...temp, ...evt };
          // console.log(temp);

          onSubmit(temp);
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
            <ModalBody>
              {/*<button className="close" onClick={toggle}>&times;</button>*/}
              <div className={"img-wrapper "}>
                <img className={"avatar rounded-circle img-fluid"}
                     src={avatar}
                     alt={"avatar"}
                     onError={e => {
                       e.target.onerror = null;
                       e.target.src = "./avt-default.png";
                     }}
                />
              </div>
              <div className={"text-center name"}>
                {firstName} {lastName}
              </div>
              <div className={"table-responsive rating-table"}>
                {ratingList.map((rt, index) => {
                  return <RatingItemDriver {...rt}
                                           onChange={(value) => {
                                             ratingList[index]["value"] = value;
                                             // console.log(ratingList);
                                             ratingDriver(ratingList);
                                           }}
                  />;
                })}

              </div>
              <TextareaCounter
                title={"Comments"}
                name="content"
                placeholder="Enter your message"
                rows={7}
                value={values.content}
                error={errors.content}
                touched={touched.content}
                onChange={evt => {
                  handleChange(evt);
                }}
                onBlur={handleBlur}
              />
            </ModalBody>
            <ModalFooter>
              <SubmitButton className={"btn-orange btn-block"} content={"Rate & Review"}
                            onClick={() => {

                            }}/>
            </ModalFooter>
          </form>

        )}
      </Formik>
    </Modal>
  );
}

RatingPopup.propTypes = {
  ratingDriver: PropTypes.func,
  ratingList: PropTypes.array
};

export default RatingPopup;
