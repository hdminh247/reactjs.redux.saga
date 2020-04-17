/**
 *
 * Asynchronously loads the component for TopBooking
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
