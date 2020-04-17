/*
 * ChangeLocaleLoading Messages
 *
 * This contains all the text for the ChangeLocaleLoading container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ChangeLocaleLoading";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ChangeLocaleLoading container!"
  },
  loadingTitle: {
    id: `${scope}.loadingTitle`,
    defaultMessage: "Changing locale..."
  }
});
