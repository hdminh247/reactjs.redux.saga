/**
 *
 * Asynchronously loads the component for BaseTable
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
