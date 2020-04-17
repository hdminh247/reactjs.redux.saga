/**
 *
 * Asynchronously loads the component for BlogItem
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
