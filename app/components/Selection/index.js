/**
 *
 * Selection
 *
 */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Select from "react-select";
import ClassNames from "classnames";
import "./style.scss";
import { listError } from "helper/data";
import makeAnimated from "react-select/animated";
import _, { findIndex, indexOf } from "lodash";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

export const formatOptionLabel = (props) => {
  if (props) {
    const { label = "", image = "" } = props;

    return (
      <div className="sub-category">
        <div className="img-wrapper">
          <img
            src={image}
            onError={e => {
              e.target.onerror = null;
              e.target.src = "./avatar-default.jpg";
            }}
            alt="avatar"
          />
        </div>
        <div className="info-text d-inline-block align-top">
          <div className="">{`${label}`}</div>
        </div>
      </div>);
  }
  return null;
};

function checkApiError(name, error) {
  if (!_.isEmpty(error)) {
    let index = findIndex(listError, val => val.name === name);
    if (index > -1) {
      if (indexOf(listError[index].error, error[0].errorCode) > -1) {
        return true;
      }
    }
    return false;
  }
}

function Selection(props) {
  const { error, disabled = false, isHidden = false, className = "", loading = false } = props;

  return (
    <div className={ClassNames("selection-wrapper", className, { "d-none": isHidden })}>
      {props.title && (
        <label className={"form-label"} htmlFor={props.name}>
          {props.title}
        </label>
      )}
      {loading ?
        <Skeleton height={40}/>
        : <div className={"input-wrapper"}>
          {props.prependLabel && (
            <span className={ClassNames("icon-prepend",
              props.touched && props.error && "error-form")}
                  dangerouslySetInnerHTML={{ __html: props.prependLabel }}/>

          )}
          <div>
            {
              props.isAsyncList !== true && (
                <Select
                  {...props}
                  isDisabled={disabled}
                  className={ClassNames("f-select-container",
                    disabled,
                    props.prependLabel && "more-padding-left",
                    ((props.touched && props.error) || checkApiError(props.name, props.apiError)) && "error-form")}
                  options={props.options}
                  isMulti={props.type === "isMulti"}
                  value={props.value}
                  classNamePrefix={`f-select`}
                  name={props.name}
                  isSearchable={false}
                  placeholder={props.placeholder}
                  closeMenuOnSelect={true}
                  closeMenuOnScroll={false}
                  onBlur={props.onBlur}
                  onFocus={(e) => {
                    window.isInputFocus = true;
                    //console.log(e)
                  }}
                  onInputChange={(str, action) => {
                    //console.log(str, action)
                  }}
                />
              )
            }

            {props.isAsyncList === true && (
              <AsyncSelect
                {...props}
                isDisabled={disabled}
                className={ClassNames("f-select-container", disabled,
                  ((props.touched && props.error) || checkApiError(props.name, props.apiError)) && "error-form")}
                options={props.options}
                defaultOptions={props.defaultOptions}
                loadOptions={props.loadOptions}
                isClearable={false}
                type={props.type}
                formatOptionLabel={formatOptionLabel}
                value={props.value}
                classNamePrefix={`f-select`}
                blurInputOnSelect
                name={props.name}
                isSearchable={true}
                closeMenuOnSelect={true}
                closeMenuOnScroll={false}
                onBlur={props.onBlur}
                onFocus={() => {
                  window.isInputFocus = true;
                }}
                components={makeAnimated()}
              />
            )}
          </div>
        </div>
      }


      {(_.isBoolean(props.touched) && props.touched && props.error) && (
        <div className={"error-text"}>
          <i className={"icon-error"}/>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

Selection.propTypes = {
  isHidden: PropTypes.bool,
  loading: PropTypes.bool
};
export default Selection;
