/**
 *
 * Asynchronously loads the component for ResetPasswordSuccessPage
 *
 */
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
