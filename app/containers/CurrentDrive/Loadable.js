/**
 *
 * Asynchronously loads the component for CurrentDrive
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
