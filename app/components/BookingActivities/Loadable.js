/**
 *
 * Asynchronously loads the component for BookingActivities
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
