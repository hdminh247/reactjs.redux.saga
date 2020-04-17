/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION } from "./constants";
import { GET_TOP_PROMOTION_LIST, GET_TOP_PROMOTION_LIST_ERROR, GET_TOP_PROMOTION_LIST_SUCCESS } from "../HomePage/constants";
import _ from "lodash";

export const initialState = fromJS({
  topBookingList: [
    {
      image: "pic.png",
      name: "2017-BMW-7",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 200,
      unit: "$"
    },
    {
      image: "pic1.png",
      name: "2017-BMW-7",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 200,
      unit: "$"
    },
    {
      image: "pic2.png",
      name: "2017-BMW-8",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 800,
      unit: "$"
    },
    {
      image: "pic3.png",
      name: "2017-BMW-8",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 800,
      unit: "$"
    },
    {
      image: "pic.png",
      name: "2017-BMW-8",
      star: 3,
      luggage: 10,
      seat: 4,
      price: 800,
      unit: "$"
    }
  ],
  featuredDestinationsList: [
    {
      destination: "Austria",
      image: "./austria.png"
    },
    {
      destination: "Korea",
      image: "./korea.png"
    },
    {
      destination: "Viet Nam",
      image: "./vietnam.png"
    }, {
      destination: "Austria",
      image: "./austria.png"
    },
    {
      destination: "Korea",
      image: "./korea.png"
    },
    {
      destination: "Viet Nam",
      image: "./vietnam.png"
    }
  ],
  topPromotion: [
    {
      image: "./carousel1.png",
      title: "The Great Getaway Sale",
      content: "Plan your seasonal escape with at least 15% off stays 1 June-31 August"
    },
    {
      image: "./carousel2.png",
      title: "The Great Getaway Sale",
      content: "Plan your seasonal escape with at least 15% off stays 1 June-31 August"
    },
    {
      image: "./carousel1.png",
      title: "The Great Getaway Sale",
      content: "Plan your seasonal escape with at least 15% off stays 1 June-31 August"
    },
    {
      image: "./carousel2.png",
      title: "The Great Getaway Sale",
      content: "Plan your seasonal escape with at least 15% off stays 1 June-31 August"
    }]
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_TOP_PROMOTION_LIST_SUCCESS:
      let topPromotion = [];
      if (_.isArray(action.response)) {
        topPromotion = action.response.map(promotion => {
          const { data = {} } = promotion;
          const { image = "", title = "", content = "" } = data;
          return { ...data, image, title, content };
        });
      }

      return state
        .set("topPromotion", fromJS(topPromotion));

    case GET_TOP_PROMOTION_LIST:
    case GET_TOP_PROMOTION_LIST_ERROR:
      return state
        .set("hotList", fromJS([]));
    default:
      return state;
  }
}

export default mainPageReducer;
