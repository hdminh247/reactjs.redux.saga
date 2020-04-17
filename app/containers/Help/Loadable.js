/**
 *
 * Asynchronously loads the component for Help
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
