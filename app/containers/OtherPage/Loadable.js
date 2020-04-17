/**
 *
 * Asynchronously loads the component for OtherPage
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
