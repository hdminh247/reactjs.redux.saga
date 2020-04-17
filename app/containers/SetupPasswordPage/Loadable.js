/**
 *
 * Asynchronously loads the component for SetupPasswordPage
 *
 */
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
