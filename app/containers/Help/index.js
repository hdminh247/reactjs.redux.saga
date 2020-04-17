/**
 *
 * Help
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";
import "../Auth/style.scss";

import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectHelp from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { Link } from "react-router-dom";
import { urlLink } from "../../helper/route";
import { Formik } from "formik";
import FormGroup from "../../components/FormGroup";
import InputForm from "../../components/InputForm";
import SubmitButton from "../../components/SubmitButton";
import * as Yup from "yup";
import { REGEX_NAME } from "../../helper/regex";
import TextareaCounter from "../../components/TextareaCounter";
import { requestHelp } from "../HomePage/actions";
import ImageList from "../../components/ImageList";
import { changeStoreData, defaultAction } from "./actions";


const validateForm = Yup.object().shape({
  "email": Yup.string()
    .email("Invalid email")
    .required("Please enter email"),
  "name": Yup.string()
    .required("Name is required")
    .matches(REGEX_NAME, "Invalid name (no number and special characters)")
    .min(1, "Invalid name (At least 1 characters)")
    .max(30, "Invalid name (Maximum at 30 characters)"),
  "message": Yup.string()
    .required("Message is required")
});

/* eslint-disable react/prefer-stateless-function */
export class Help extends React.PureComponent {
  UNSAFE_componentWillMount() {
    this.props.defaultAction();
  }

  render() {
    const {
      apiError = [],
      helpRequest: {
        name = "",
        email = "",
        message = "",
        images = []
      }
    } = this.props.help;
    return (
      <div className={"help-wrapper authenticate-wrapper"}>
        <Helmet>
          <title>Help center</title>
          <meta name="description" content="Description of Help"/>
        </Helmet>

        <div className={"container"}>
          <div className={"left-wrapper"}>
            <Link to={urlLink.root}>
              <img src={"logo-white-square.png"} className={"logo"} alt="logo"/>
            </Link>
            <h1 className={"title"}>Help Center</h1>
            <div className={"line-break"}/>
            <div className={"contact"}>Contact us</div>
            <div className={"phone"}><a href="tel:1900 1009">1900 1009</a></div>
          </div>
          <div className={"right-wrapper"}>
            <FormGroup title={"Send Us Your Question"}>
              <Formik
                ref={ref => (this.formik = ref)}
                initialValues={{
                  name,
                  email,
                  message,
                  images
                }}
                enableReinitialize={true}
                validationSchema={validateForm}
                onSubmit={(evt, { resetForm }) => {
                  // console.log("submit", evt);
                  let formData = new FormData();
                  Object.keys(evt).map(key => {
                    if (key !== "images")
                      formData.append(key, evt[key]);
                  });

                  evt.images.map(item => {
                    const { file = "" } = item;
                    formData.append("file", file);
                  });

                  // console.log(formData);
                  this.props.submit(formData)
                    .then(() => {
                      resetForm();
                      this.props.defaultAction();
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
                    <InputForm label={"Name"}
                               name={"name"}
                               value={values.name}
                               error={errors.name}
                               apiError={apiError}
                               touched={touched.name}
                               onChange={evt => {
                                 handleChange(evt);
                                 this.props.changeStoreData(["helpRequest", evt.target.name], evt.target.value);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Enter your name"}
                               prependLabel={`<i class="icon-user1"/>`}
                    />
                    <InputForm label={"Email address"}
                               name={"email"}
                               type={"email"}
                               value={values.email}
                               error={errors.email}
                               touched={touched.email}
                               onChange={evt => {
                                 handleChange(evt);
                                 this.props.changeStoreData(["helpRequest", evt.target.name], evt.target.value);
                               }}
                               onBlur={handleBlur}
                               placeholder={"Enter your email"}
                               prependLabel={`<i class="blue icon-mail"/>`}
                    />

                    <TextareaCounter
                      title={"Message"}
                      name="message"
                      placeholder="Enter your message"
                      rows={4}
                      value={values.message}
                      error={errors.message}
                      touched={touched.message}
                      onChange={evt => {
                        handleChange(evt);
                        this.props.changeStoreData(["helpRequest", evt.target.name], evt.target.value);
                      }}
                      onBlur={handleBlur}
                      prependLabel={`<i class="color-blue icon-note1"/>`}
                    />

                    <ImageList
                      name={"file"}
                      imageList={values.images}
                      values={values}
                      handleBlur={handleBlur}
                      maxLength={4}
                      maxImage={10}
                      onChange={list => {
                        // setFieldValue("images", list);
                        this.props.changeStoreData(["helpRequest", "images"], list);
                      }}
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

                    <SubmitButton
                      className="btn-login btn-orange"
                      content={"Submit"}/>

                  </form>

                )}
              </Formik>

            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

Help.propTypes = {
  defaultAction: PropTypes.func,
  submit: PropTypes.func,
  changeStoreData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  help: makeSelectHelp()
});

function mapDispatchToProps(dispatch) {
  return {
    defaultAction: () => {
      dispatch(defaultAction());
    },
    submit: formData => {
      return new Promise((resolve, reject) => {
        dispatch(requestHelp(formData, resolve, reject));
      });
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "help", reducer });
const withSaga = injectSaga({ key: "help", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Help);
