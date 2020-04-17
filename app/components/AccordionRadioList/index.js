/**
 *
 * AccordionRadioList
 *
 */

import React from "react";
import "./style.scss";
import _ from "lodash";
import { Card } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class AccordionRadioList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      list = [],
      activeKey = -1,
      textEmpty = "Empty list",
      touched = false,
      error = "",
      onChange = () => {
      },
      handleChange = () => {
      }
    } = this.props;

    return (
      <div className={"accordion-radio-list-wrapper"}>
        <Scrollbars
          // This will activate auto hide
          autoHide
          autoHeight
          autoHeightMin={0}
          autoHeightMax={360}
          // Hide delay in ms
          autoHideTimeout={1000}
          ref={this.scrollbarRef}
        >
          {_.isEmpty(list)
            ? <div className={"check-list-wrapper"}>{textEmpty}</div>
            : list.map((item, key) => {
              const { label = "", image = "", description1 = "" } = item;
              return (
                <div className={"check-list-wrapper"} key={key}>
                  <Card border="light" key={key} className={"item-content"}
                        onClick={() => {
                          // console.log(list[key]);
                          onChange(list[key]);
                        }}
                  >
                    <div className={"d-table align-items-center"}>
                      <div className={"d-table-cell align-middle image"}>

                        <img src={image}
                             className={"align-self-center"}
                             alt={"car"}
                             onError={e => {
                               e.target.onerror = null;
                               e.target.src = "./missing-car.png";
                             }}
                        />

                      </div>
                      <div className={"d-table-cell align-middle label"}>
                        <div className={"name"}>{label}</div>
                        <div className={"description"}>{description1}</div>
                      </div>
                      <div className={"d-table-cell align-middle radio-wrapper"}>
                        <input type="radio" name="radio" checked={activeKey.toString() === key.toString()}
                               onChange={(e) => {
                                 console.log("input onChange", e);
                                 handleChange(e);
                               }}
                        />
                        <span className="check-mark align-self-center"/>
                      </div>
                    </div>

                  </Card>
                </div>);
            })}

          {touched && error &&
          <div className={"error-text mb-2"}>
            <i className={"icon-error"}/>
            <span>{error}</span>
          </div>
          }
        </Scrollbars>
      </div>
    );
  }
}

AccordionRadioList.propTypes = {
  textEmpty: PropTypes.string
};

export default AccordionRadioList;
