/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.HomePage";
export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Home page"
  },
  promotion: {
    id: `${scope}.promotion`,
    defaultMessage: "Promotion"
  },
  blog: {
    id: `${scope}.blog`,
    defaultMessage: "Blog"
  },
  help: {
    id: `${scope}.help`,
    defaultMessage: "Help"
  }
});
