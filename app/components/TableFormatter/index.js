import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import { DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupText, UncontrolledDropdown } from "reactstrap";
import moment from "moment";
import NumberFormat from "react-number-format";
import _ from "lodash";

class CheckboxTable extends React.Component {
  componentDidMount() {
    this.update(this.props.checked);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.update(props.checked);
  }

  update(checked) {
    ReactDOM.findDOMNode(this).indeterminate = checked === "indeterminate";
  }

  render() {
    return (
      <input className='react-bs-select-all'
             type='checkbox'
             name={"checkbox" + this.props.rowIndex}
             id={"checkbox" + this.props.rowIndex}
             checked={this.props.checked}
             onChange={this.props.onChange}/>
    );
  }
}

const SearchBar = (props) => {
  const {
    placeholderSearch = "",
    value = "",
    handleChange = () => {
    },
    handleSubmit = () => {
    }
  } = props;
  return (
    <div className="search-bar">
      <InputGroup className={"form-input"}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <span className="icon-search1" onClick={handleSubmit}/>
          </InputGroupText>
        </InputGroupAddon>
        <Input
          {...props}
          className={"input-form"}
          type="text"
          placeholder={placeholderSearch}
        />
        <InputGroupAddon addonType="append">
          <button type={"submit"} className="btn btn-primary search" onClick={handleSubmit}>Search</button>
        </InputGroupAddon>
      </InputGroup>

    </div>
  );
};

const ActionFormatter = (props) => {
  return (
    <UncontrolledDropdown className="action-dropdown" onClick={(e) => {
      e.stopPropagation();
    }}>
      <DropdownToggle>
        <i className="icon-ellypsis"/>
      </DropdownToggle>
      {props.menu}
    </UncontrolledDropdown>
  );
};
const checkPrev = (page) => {
  return page === 0;
};
const checkNext = (page, limit, total) => {
  //

  let temp = (page + 1) * limit;
  return temp >= total;
};

const changePagination = (type, props) => {
  let { page: currentPage = 0 } = props;
  let newPage;
  if (type === "prev") {
    newPage = currentPage - 1;
  } else {
    newPage = currentPage + 1;
  }
  let newProps = { ...props };
  newProps["page"] = newPage;
  props.changePagination(newProps);
};

const PaginationFormatter = (props) => {

  let toOffset;
  if ((props.total - props.offset) >= props.limit) {
    toOffset = props.offset + props.limit;
  } else {
    toOffset = props.offset + (props.total - props.offset);
  }

  return (
    <div className="showed-items ml-auto">
      <span className="counter">
        {props.total === 0 ? 0 : (props.offset + 1) || 0}-{toOffset || 0} of {props.total || 0} items showed
      </span>

      <button type="button" className="btn prev" id="prev-pagination"
              disabled={checkPrev(props.page)}
              onClick={() => {
                changePagination("prev", props);
              }}>
        <span className="icon-chevron-left"/>
      </button>
      {/* <UncontrolledTooltip
            container={'prev-pagination'}
            className="base-tooltip"
            hideArrow={true}
            placement="bottom"
            target="prev-pagination" delay={{ show: 10, hide: 0 }}>Previous</UncontrolledTooltip> */}


      <button type="button" className="btn next" id="next-pagination"
              disabled={checkNext(props.page, props.limit, props.total)}
              onClick={() => {
                changePagination("next", props);
              }}>
        <span className="icon-chevron-right"/>
      </button>
      {/* <UncontrolledTooltip
            container={'next-pagination'}
            className="base-tooltip"
            hideArrow={true}
            placement="bottom"
            target="next-pagination"
            delay={{ show: 10, hide: 0 }}>Next</UncontrolledTooltip> */}
    </div>
  );
};

const NameAndImageFormatter = (image = "", name = "") => {
  return (
    <div className="name-and-image d-lg-table">
      <div className={"d-table-cell align-middle"}>
        <img src={image}
             onError={(e) => {
               e.target.onerror = null;
               e.target.src = "./avatar-default.jpg";
             }} alt="img"/>
      </div>
      <div className={"d-table-cell align-middle"}>
        <span>{name}</span>
      </div>
    </div>
  );
};

const DriverOnlyFormatter = (avatar = "", firstName = "", lastName = "") => {
  return (
    <div className="name-and-image">
      {_.isEmpty(firstName + lastName) ? null :
        <div className="image-true">
          <img src={avatar} onError={(e) => {
            e.target.onerror = null;
            e.target.src = "./avatar-default.jpg";
          }} alt="img"/>
          <span>{firstName + lastName}</span></div>
      }
    </div>
  );
};

const CustomMultiSelect = (props) => {
  const { type, checked, disabled, onChange, rowIndex } = props;
  /*
   * If rowIndex is 'Header', means this rendering is for header selection column.
   */
  if (rowIndex === "Header") {
    return (
      <div className='base-checkbox-square'>
        <CheckboxTable {...props} />
        <label htmlFor={"checkbox" + rowIndex}>
          <div className='check'/>
        </label>
      </div>);
  } else {
    return (
      <div className='base-checkbox-square'>
        <input
          type={type}
          name={"checkbox" + rowIndex}
          id={"checkbox" + rowIndex}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e, rowIndex)}
          ref={input => {
            if (input) {
              input.indeterminate = props.indeterminate;
            }
          }}/>
        <label htmlFor={"checkbox" + rowIndex}>
          <div className='check'/>
        </label>
      </div>);
  }
};

const AvatarFormatter = (cell, row, field = "fileName") => {
  return (
    <img
      src={cell && cell[field] ? cell[field] : "./avatar-default.jpg"}
      onError={e => {
        e.target.onerror = null;
        e.target.src = "./avatar-default.jpg";
      }}
      alt="avatar"
      onClick={() => {
        this.props.history.push(urlLink.viewMember + "?id=" + row._id);
      }}
    />
  );
};

const ImgFormatter = (img, id, urlLink) => {
  return (
    <img
      src={img ? img : "./avatar-default.jpg"}
      onError={e => {
        e.target.onerror = null;
        e.target.src = "./avatar-default.jpg";
      }}
      alt="avatar"
      onClick={() => {
        this.props.history.push(urlLink + "?id=" + id);
      }}
    />
  );
};

const DateFormatter = (props) => {
  const { date = undefined, format = "DD/MM/YYYY" } = props;
  return (
    <div className="date-formatter">{moment(date).format(format)}</div>
  );
};

const StatusFormat = (cell) => {
  return (
    <div className="status">
      <div
        className={"content " + (cell === true ? "active" : "inactive")}>{cell === true ? "Active" : "Inactive"}</div>
    </div>
  );
};

const ManyStatusFormat = (status, paymentStatus) => {
  return (
    <div className="status">
      <div className={"many-status"}>{status}</div>
      <div className={"many-status"}>{paymentStatus}</div>
    </div>
  );
};

const PaymentFormat = (cell) => {
  return <div className="status">
    <div className="content active">{cell ? cell : "-"}</div>
  </div>;
};

const CustomerFormat = (cell) => {

  const {
    firstName = "",
    lastName = ""
  } = cell;

  return (
    <div>{firstName} {lastName}</div>
  );
};

const PriceFormatter = cell => {
  const { value = 0, unit = "$" } = cell;
  return (
    <NumberFormat
      className={"price"}
      value={cell && !_.isUndefined(value) ? value : 0}
      displayType={"text"}
      suffix={unit}
      decimalScale={2}
      fixedDecimalScale={!!(cell && value > 0)}
    />
  );
};

export const RatingFormatter = (cell) => {
  if (_.isNumber(cell) && cell > 0) {
    return <div><span className={"icon star-yellow icon-star-full"}/>{cell}</div>;
  }
  return <div><span className={"icon star-grey icon-star-full"}/>- -</div>;
};

export {
  ActionFormatter,
  AvatarFormatter,
  DateFormatter,
  ImgFormatter,
  CustomMultiSelect, NameAndImageFormatter, DriverOnlyFormatter,
  StatusFormat, PaymentFormat, ManyStatusFormat,
  PaginationFormatter, CustomerFormat, PriceFormatter,
  SearchBar
};
