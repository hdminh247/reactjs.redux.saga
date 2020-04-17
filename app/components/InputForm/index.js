/**
 *
 * InputForm
 *
 */
import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ClassNames from "classnames";
import "./style.scss";
import { listError } from "helper/data";
import _ from "lodash";

function InputForm(props) {

  return (
    <div className={ClassNames("input-form-wrapper",
      props.disabled && "disabled",
      { "prepend-label": props.prependLabel }
    )}>
      {props.label && (<label className="form-label" htmlFor={props.name}>{props.label}</label>)}

      <div className={"input-group form-input"}>

        {props.prependLabel && (
          <div className={ClassNames("input-group-prepend")}>
            <span className={ClassNames("input-group-text",
              props.touched && props.error && "error-form")}
                  dangerouslySetInnerHTML={{ __html: props.prependLabel }}/>
          </div>
        )}

        <input
          className={ClassNames("input-form form-control",
            props.touched && props.error && "error-form",
            !props.showPassword && "hide-password")}
          min={props.min}
          max={props.max}
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          placeholder={props.placeholder}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />

        {(props.value && props.value.length > 0) ? (
          <div className={ClassNames("icon-append", { "show": props.showPassword })} onClick={props.togglePassword}>
            {
              !props.showPassword ? <i className={props.iconClassShow}/> : <i className={props.iconClassHide}/>
            }
          </div>
        ) : []}


      </div>

      {(_.isBoolean(props.touched) && props.touched && props.error) && (
        <div className={"error-text"}>
          <i className={"icon-error"}/>
          <span>{props.error}</span>
        </div>
      )}
    </div>
  );
}

InputForm.propTypes = {};
export default InputForm;
