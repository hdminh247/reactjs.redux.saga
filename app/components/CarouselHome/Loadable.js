/**
 *
 * Asynchronously loads the component for CarouselHome
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
