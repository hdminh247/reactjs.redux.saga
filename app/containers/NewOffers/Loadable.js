/**
 *
 * Asynchronously loads the component for NewOffers
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
