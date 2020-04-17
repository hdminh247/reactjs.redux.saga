/**
 *
 * StepSixSignUp
 *
 */

import React from "react";
import "./style.scss";
import { Formik } from "formik";
import MyFormGroup from "../FormGroup";
import { ListGroupItem } from "reactstrap";
import Checkbox from "../Checkbox";
import ListGroup from "react-bootstrap/ListGroup";
import SubmitButton from "../SubmitButton";
import Link from "react-router-dom/es/Link";
import GhostButton from "../GhostButton";
import { urlLink } from "../../helper/route";
import _ from "lodash";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
/* eslint-disable react/prefer-stateless-function */
class StepSixSignUp extends React.PureComponent {
  render() {
    const {
      apiError = [],
      driverInfoQuestion = [],
      onSubmit = () => {
      }
    } = this.props;
    return (
      <div className={"step-six-wrapper"}>
        <MyFormGroup title={"Finish Setting Up"} progress={90}>
          <Formik
            initialValues={{
              question: driverInfoQuestion
            }}
            enableReinitialize={true}
            validationSchema={{}}
            onSubmit={evt => {
              const { question = [] } = evt;
              let temp = question.map(ques => {
                const { answer = "", _id = "" } = ques;
                return { question: _id, answer };
              });
              let answerList = JSON.stringify(temp);

              onSubmit({ answerList });
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
                <ListGroup flush className={"question-list"}>
                  {driverInfoQuestion.length > 0 && driverInfoQuestion.map((question, index) => {
                    const { content = "" } = question;
                    return (
                      <ListGroupItem key={index} className={"question-item"}>
                        <div className={"row"}>
                          <div className={"content col-sm-8"}>{content}</div>
                          <div className={"col-sm-4"}>
                            <Checkbox
                              type={"radio"}
                              name={`question[${index}].answer`}
                              label={"Yes"}
                              checked={values.question[index] && values.question[index]["answer"] === true}
                              onChange={evt => {
                                setFieldValue(evt.target.name, true);
                              }}
                            />
                            <Checkbox
                              type={"radio"}
                              name={`question[${index}].answer`}
                              label={"No"}
                              checked={values.question[index] && values.question[index]["answer"] === false}
                              onChange={evt => {
                                setFieldValue(evt.target.name, false);
                              }}
                            />
                          </div>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
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
                    content={"Next"}
                    disabled={values.question.filter(ques => _.isBoolean(ques.answer)).length !== values.question.length}
                  />

                  <Link to={urlLink.root}>
                    <GhostButton title={"Cancel"}
                                 className={"btn-block btn-cancel"}
                    />
                  </Link>
                </div>
              </form>

            )}
          </Formik>

        </MyFormGroup>
      </div>
    );
  }
}

StepSixSignUp.propTypes = {};

export default StepSixSignUp;
