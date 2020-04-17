/**
 *
 * Asynchronously loads the component for Payout
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
