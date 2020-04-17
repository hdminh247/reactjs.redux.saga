/**
 *
 * Asynchronously loads the component for BookingMap
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
