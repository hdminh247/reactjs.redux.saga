import React from "react";
import { Redirect, Route } from "react-router-dom";

export const CustomRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <Component {...props} {...rest} />
    )}/>);
};
export default class PrivateRoute extends React.Component {
  render() {
    const { path, component } = this.props;
    const token = localStorage.getItem("token");
    return (
      (token !== "" && token !== null)
        ? <CustomRoute path={path} component={component} {...this.props} />
        : <Redirect to="/"/>
    );
  }
}
