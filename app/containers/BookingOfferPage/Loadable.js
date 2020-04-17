/**
 *
 * Asynchronously loads the component for BookingOfferPage
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
