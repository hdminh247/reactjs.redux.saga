/*
 *
 * EarningPayout reducer
 *
 */

import { fromJS } from "immutable";
import { CHANGE_STORE_DATA, DEFAULT_ACTION } from "./constants";
import {
  GET_PAYOUT_ACCOUNT_ERROR,
  GET_PAYOUT_ACCOUNT_SUCCESS,
  GET_PAYOUT_CITY_ERROR,
  GET_PAYOUT_CITY_SUCCESS,
  GET_PAYOUT_COUNTRY_ERROR,
  GET_PAYOUT_COUNTRY_SUCCESS,
  GET_PAYOUT_STATE_ERROR,
  GET_PAYOUT_STATE_SUCCESS,
  GET_REVENUE_CHART_ERROR,
  GET_REVENUE_CHART_SUCCESS,
  GET_STATISTIC_EARNING_ERROR,
  GET_STATISTIC_EARNING_SUCCESS,
  GET_TRANSACTION_EARNING_LIST_ERROR,
  GET_TRANSACTION_EARNING_LIST_SUCCESS
} from "../HomePage/constants";
import _ from "lodash";
import moment from "moment";

export const initialState = fromJS({
  optionLineChart: {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 1000,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        stacked: true
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500
        }
      }]
    },
    tooltips: {
      position: "nearest",
      displayColors: false,
      borderWidth: 0,
      cornerRadius: 0,
      backgroundColor: "rgba(0,0,0,1)",
      titleFontSize: 0,
      bodyFontSize: 32,
      footerFontSize: 14,
      footerFontColor: "rgba(255,255,255,0.5)",
      width: 300,
      callbacks: {
        title: () => {
          return "";
        },
        label: (tooltipItem, data) => {
          // console.log(tooltipItem);
          const { yLabel = "" } = tooltipItem;
          return yLabel + "€";
        },
        footer: (tooltipItem, data) => {
          // console.log(tooltipItem);
          const [{ xLabel = "" }] = tooltipItem;
          return xLabel;
        }
      }
    }
  },
  paramsChart: {
    month: moment().month(),
    year: moment().year(),
    startYear: moment().subtract(3, "years").year(),
    endYear: moment().subtract(-1, "years").year()
  },
  paramsTransaction: {
    sortBy: "date",
    sortType: "descending"
  },
  transactionList: [],
  statistic: {
    accepted: 0,
    amount: 0,
    completed: 0
  },
  revenueChart: {
    "labels": [
      "Error"
    ],
    "datasets": [
      {
        lineTension: 0,
        pointRadius: 0,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "white",
        pointBorderColor: "rgba(51, 55, 75, 0.3)",
        pointHoverBorderWidth: 6,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(20, 136, 232, 1)",
        "data": [
          0
        ]
      }
    ]
  },
  accountBank: {
    balance: { amount: 0, unit: "€" },
    paymentAccount: {
      method: "paypal"
    },
    payoutAccount: {}
  }
});

function earningPayoutReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case CHANGE_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));

    case GET_TRANSACTION_EARNING_LIST_SUCCESS:
      const { data = [] } = action.response;
      return state.set("transactionList", fromJS(data));
    case GET_TRANSACTION_EARNING_LIST_ERROR:
      return state.set("transactionList", fromJS([]));

    case GET_REVENUE_CHART_SUCCESS:
      let maxValueInDatasets = 0;
      let { datasets = [] } = action.response;
      datasets.forEach(set => maxValueInDatasets = _.max(set.data));
      //suggestMax value need to more than maximum data in all datasets
      return state.setIn(["optionLineChart", "scales", "yAxes", 0, "ticks", "suggestedMax"], maxValueInDatasets + 200)
        .set("revenueChart", fromJS(_.merge(initialState.get("revenueChart").toJS(), action.response)));
    case GET_REVENUE_CHART_ERROR:
      return state.set("revenueChart", fromJS(initialState.get("revenueChart")));

    case GET_STATISTIC_EARNING_SUCCESS:
      return state.set("statistic", fromJS(action.response));
    case GET_STATISTIC_EARNING_ERROR:
      return state.set("statistic", fromJS(initialState.get("statistic")));


    // PAYOUT
    case GET_PAYOUT_ACCOUNT_SUCCESS:
      return state.set("accountBank", fromJS(action.response));
    case GET_PAYOUT_ACCOUNT_ERROR:
      return state.set("accountBank", fromJS(initialState.get("accountBank")));

    case GET_PAYOUT_COUNTRY_SUCCESS:
      return state.set("payoutCountryList", fromJS(action.response));
    case GET_PAYOUT_COUNTRY_ERROR:
      return state.set("payoutCountryList", fromJS([]));

    case GET_PAYOUT_STATE_SUCCESS:
      return state.set("payoutStateList", fromJS(action.response));
    case GET_PAYOUT_STATE_ERROR:
      return state.set("payoutStateList", fromJS([]));

    case GET_PAYOUT_CITY_SUCCESS:
      return state.set("payoutCityList", fromJS(action.response));
    case GET_PAYOUT_CITY_ERROR:
      return state.set("payoutCityList", fromJS([]));
    default:
      return state;
  }
}

export default earningPayoutReducer;
