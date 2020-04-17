/**
 *
 * Asynchronously loads the component for StepThreeSignUp
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
