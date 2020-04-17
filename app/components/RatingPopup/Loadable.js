/**
 *
 * Asynchronously loads the component for RatingPopup
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
