/**
 *
 * Asynchronously loads the component for CarManagement
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
