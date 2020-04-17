/**
 *
 * CarManagement
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles.scss";
import "../MyDrive/style.scss";

import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectCarManagement from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { Nav, NavItem } from "reactstrap";
import { getDriverVehicleList } from "../HomePage/actions";
import { changeStoreData } from "./actions";
import ClassNames from "classnames";
import _ from "lodash";
import InfoForm from "../../components/InfoForm";
import ImageGallery from "react-image-gallery";

/* eslint-disable react/prefer-stateless-function */
export class CarManagement extends React.PureComponent {
  UNSAFE_componentWillMount() {
    const { params = {} } = this.props.carManagement;
    this.props.getListVehicle(params);
  }

  render() {
    const {
      listVehicle = [],
      carSelected: {
        _id: carId = "",
        name = "",
        category = {},
        licensePlate = "",
        vanSize = 0,
        luggage = 0,
        totalTime = 0,
        totalTrip = 0,
        images = []
      }
    } = this.props.carManagement;

    const { name: nameCategory = "" } = category;
    const slideImages = images.map(image => {
      return {
        original: image,
        thumbnail: image
      };
    });


    const settingImgSlide = {
      showPlayButton: false,
      autoPlay: true,
      showNav: false,
      showFullscreenButton: false
    };
    return (
      <div className={"car-management-wrapper my-drive-wrapper"}>
        <Helmet>
          <title>Car Management</title>
          <meta name="description" content="Description of CarManagement"/>
        </Helmet>

        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-2"}>
              <div className={"menu-list-wrapper car-management"}>
                <header className={"title-menu"}>Vehicle list</header>
                <div className={"menu-list"}>
                  {listVehicle.length > 0 ?
                    <Nav className={"menu-ul"} vertical>
                      {listVehicle.map((item, index) => {
                        const { name = "" } = item;
                        return (
                          <NavItem className={"menu-li"}>
                            <div className={ClassNames("nav-link cursor-pointer", {
                              "active": _.findIndex(listVehicle, { _id: carId }) === index
                            })}
                                 onClick={() => {
                                   this.props.changeStoreData("carSelected", item);
                                 }}>
                              <span className={"text"}>{name}</span>
                            </div>
                          </NavItem>
                        );
                      })}
                    </Nav>
                    :
                    <div className={"car-empty"}>You are not have any car</div>}
                </div>
              </div>
            </div>
            <div className={"col-lg-4"}>
              <ImageGallery items={slideImages} {...settingImgSlide} />
            </div>

            {carId && <div className={"col-lg-6"}>
              <div className={"bg-grey car-info"}>
                <div className={"name"}>{name}</div>
                <div className={"category"}>{nameCategory} Car</div>
                <div className={"line-break"}/>
                <div className={"row detail"}>
                  <div className={"col-md-6"}>
                    <InfoForm title={"License Plate number"}
                              content={licensePlate}
                              classNameIcon={"icon-license"}/>
                  </div>
                  <div className={"col-md-6"}>
                    <InfoForm title={"Passenger"}
                              content={vanSize}
                              classNameIcon={"icon-people"}/>
                  </div>
                  <div className={"col-md-6"}>
                    <InfoForm title={"Amount of Luggage Afford"}
                              content={`${luggage}kg`}
                              classNameIcon={"icon-vali"}/>
                  </div>
                </div>
                <div className={"line-break"}/>
                <div className={"row"}>
                  <div className={"col-md-4"}>
                    <div className={"total"}>
                      <div className={"total-title"}>Total time (hrs)</div>
                      <div className={"total-value"}>{totalTime}</div>
                    </div>
                  </div>
                  <div className={"col-md-4"}>
                    <div className={"total"}>
                      <div className={"total-title"}>Total Trip success</div>
                      <div className={"total-value"}>{totalTrip}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

CarManagement.propTypes = {
  getListVehicle: PropTypes.func.isRequired,
  changeStoreData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  carManagement: makeSelectCarManagement()
});

function mapDispatchToProps(dispatch) {
  return {
    getListVehicle: params => {
      return new Promise((resolve, reject) => {
        dispatch(getDriverVehicleList(params, resolve, reject));
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

const withReducer = injectReducer({ key: "carManagement", reducer });
const withSaga = injectSaga({ key: "carManagement", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(CarManagement);
