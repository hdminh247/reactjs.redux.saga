/**
 *
 * Asynchronously loads the component for LoginPopup
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
