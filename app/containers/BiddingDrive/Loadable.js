/**
 *
 * Asynchronously loads the component for BiddingDrive
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
