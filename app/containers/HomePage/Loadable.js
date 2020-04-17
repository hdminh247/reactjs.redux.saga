import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: LoadingIndicator
});
