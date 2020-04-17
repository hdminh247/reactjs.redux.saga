import React from "react";
import "./styles.scss";
import "../InputForm/style.scss";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import _ from "lodash";

export default class TextareaCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      counter = false, prependLabel = "",
      className = "",
      placeholder = "",
      value = "",
      onChange = () => {
      },
      onBlur = () => {

      },
      maxLength = 500,
      error = "", touched = false, title = ""
    } = this.props;

    return (
      <div
        className={ClassNames("base-textarea-counter",
          "input-form-wrapper",
          className,
          { "prepend-label": prependLabel },
          { "error-form": touched && !_.isEmpty(error) }
        )}
        {...this.props}
      >
        <div className="title">{title}</div>
        <div className={ClassNames("text-area-wrapper input-group form-input",
          touched && error && "error-form",
          prependLabel && "prepend")}>
          {prependLabel && (
            <div className={ClassNames("input-group-prepend")}>
            <span className={ClassNames("input-group-text", "align-self-start",
              touched && error && "error-form")}
                  dangerouslySetInnerHTML={{ __html: prependLabel }}/>
            </div>
          )}
          <textarea
            className={ClassNames("form-control input-form", touched && error && "error-form")}
            {...this.props}
            onBlur={onBlur}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <span className="counter" hidden={!counter}>
            {value
              ? maxLength - value.length
              : maxLength}/{maxLength}
          </span>
        </div>
        {_.isBoolean(touched) && touched && error && (
          <div className={"error-text"}>
            <i className={"icon-error"}/>
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
}
TextareaCounter.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string
};
