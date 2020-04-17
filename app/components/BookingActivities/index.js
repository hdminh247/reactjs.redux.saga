/**
 *
 * BookingActivities
 *
 */

import React from "react";
import "./styles.scss";
import _ from "lodash";
import InfoForm from "../InfoForm";
import moment from "moment";
import ClassNames from "classnames";
import PropTypes from "prop-types";

const renderContentActivities = (actDetail, index, isTop = false, actActivity) => {
  let {
    _id: idActivity = "",
    activity: {
      content = "", name = "",
      actions = []
    },
    data: format = [],
    createdAt = null
  } = actDetail;

  // todo: call api do this activity base activity id

  format.map((obj, index) => {
    let { firstName = "", lastName = "", _id = "", type = "" } = obj;
    if (_.isEmpty(type) === true) {
      content = content.replace(
        `{${index}}`,
        `${firstName} ${lastName}`
      );
    } else {
      content = content.replace(
        `{${index}}`,
        `${firstName} ${lastName}`
      );
    }
  });
  return (
    <div key={index}
         className={ClassNames("activity-wrapper d-flex",
           { "disabled": !isTop }
         )}>
      <i className={"icon activity-icon color-blue icon-circle1"}/>
      <div className={"activity-content flex-fill"}>
        <div className={"upper row"}>
          <div className={"col-md-6"}>
            <div className={"activity-type"}>{name}</div>
            <div className={"activity-create-at"}>
              <InfoForm content={moment(createdAt).format("MM/DD/YYYY")}
                        classNameIcon={"icon-calendar1"}/>
              <InfoForm content={moment(createdAt).format("hh:mm")}
                        classNameIcon={"icon-time1"}/>
            </div>
          </div>
          <div className={"col-md-6 text-right"}>
            {actions.filter(s => {
              const { name = "" } = s;
              return name !== "Cancel";
            }).map((value, index) => {
              let { name = "", action = "" } = value;
              return (
                <button
                  disabled={!isTop}
                  key={index}
                  className={"btn btn-activity"}
                  onClick={(e) => {
                    e.preventDefault();
                    actActivity(idActivity, action);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
        <div className={"info"}>{content}</div>

      </div>
    </div>);
};

/* eslint-disable react/prefer-stateless-function */
class BookingActivities extends React.PureComponent {
  render() {
    const {
      activities = [],
      title = "",
      actActivity = () => {
      }
    } = this.props;
    // console.log(activities);
    return (
      <div className={"booking-activities-wrapper "}>
        {title && <div className={"title"}>{title}</div>}
        <div className={"activities-wrapper bg-grey"}>
          {activities.length > 0 && activities.map((act, index1) => {
            const { data = [] } = act;
            // let cloneData = [...data];//clone array (shadow copy in es6)
            return (data.length > 0 && data.map((actDetail, index2) => {
              return renderContentActivities(actDetail, index2, index1 === 0 && index2 === 0, actActivity);
            }));

          })}
        </div>
      </div>
    );
  }
}

BookingActivities.propTypes = {
  activities: PropTypes.array.isRequired,
  title: PropTypes.string,
  actActivity: PropTypes.func
};

export default BookingActivities;
