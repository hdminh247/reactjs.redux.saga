import React from "react";
//Lib
import DatePicker from "react-datepicker";
import "./style.scss";
import "../InputForm/style.scss";
import ClassNames from "classnames";
import InputForm from "../InputForm";

//custom input datapicker
const InputDatepicker = (props) => {
  return (
    <div className={"input-date-picker-wrapper"}>
      <InputForm {...props} readOnly={true}/>
    </div>
  );
};

export default class Datepicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _label: ""
    };
  }

  render() {
    const {
      isHidden = false,
      className = "",
      selected,
      touched = false,
      error = "",
      minDate,
      maxDate,
      //------------Time---------
      minTime,
      maxTime,
      showTimeSelectOnly = false,
      showTimeSelect = false,
      //----------Month-----------
      showMonthDropdown = false,
      //-----------Year--------------
      showYearDropdown = false,
      scrollableYearDropdown = true,
      yearDropdownItemNumber = 15,
      dateFormat = "MM/dd/yyyy",
      placeholderText = "Select a date",
      popperPlacement = "bottom-start",
      prependLabel = "",
      onSelect = (e) => {
      }
    } = this.props;

    const ExampleCustomInput = (props) => {
      return <InputDatepicker {...props} {...this.props}/>;
    };

    return (
      <div className={ClassNames("date-picker-wrapper form-input", { "hidden": isHidden })}>
        <DatePicker
          {...this.props}
          popperPlacement={popperPlacement}
          popperModifiers={{
            flip: {
              enabled: false
            },
            // preventOverflow: {
            //   enabled: true,
            //   escapeWithReference: false,
            //   boundariesElement: "viewport"
            // }
          }}
          className={ClassNames("input-form form-control", className, touched && error && "error-form")}
          prependLabel={prependLabel}
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          placeholderText={placeholderText}
          //Time
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          //Month
          showMonthDropdown={showMonthDropdown}
          dropdownMode="select"
          //Year
          showYearDropdown={showYearDropdown}
          scrollableYearDropdown={scrollableYearDropdown}
          yearDropdownItemNumber={yearDropdownItemNumber}
          //--------
          dateFormat={dateFormat}
          customInput={<ExampleCustomInput/>}
          onSelect={date => {
            onSelect(date);
          }}
          onChange={date => {
            onSelect(date);
          }}

        />

      </div>
    );
  }
}
