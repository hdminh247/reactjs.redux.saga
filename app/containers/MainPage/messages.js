/*
 * MainPage Messages
 *
 * This contains all the text for the MainPage component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.MainPage";
export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is MainPage container !"
  },
  seamlessTitle: {
    id: `${scope}.seamlessTitle`,
    defaultMessage: "Seamless airport travel"
  },
  seamlessContent: {
    id: `${scope}.seamlessContent`,
    defaultMessage: "Relax with 1 hour of complimentary wait time and flight tracking."
  },
  inclusiveTitle: {
    id: `${scope}.inclusiveTitle`,
    defaultMessage: "All-inclusive pricing"
  },
  inclusiveContent: {
    id: `${scope}.inclusiveContent`,
    defaultMessage: "Count on all-inclusive rates, confirmed before booking."
  },
  rideTitle: {
    id: `${scope}.rideTitle`,
    defaultMessage: "Ride flexibility"
  },
  rideContent: {
    id: `${scope}.rideContent`,
    defaultMessage: "Change or cancel for free up until 1 hour prior to pickup."
  }
});
