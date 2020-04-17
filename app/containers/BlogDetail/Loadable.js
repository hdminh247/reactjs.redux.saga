/**
 *
 * Asynchronously loads the component for BlogDetail
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
