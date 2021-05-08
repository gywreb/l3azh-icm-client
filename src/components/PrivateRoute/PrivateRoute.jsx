import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { ROUTES } from "../../constants/routes";

const PrivateRoute = ({ isAuth, children, ...routeProps }) => {
  const { token } = useSelector((state) => state.auth);
  const { path } = routeProps;
  if (path === ROUTES.login)
    return (
      <Route
        {...routeProps}
        render={() =>
          isAuth || token ? <Redirect to={ROUTES.walletType} /> : children
        }
      />
    );
  else {
    return (
      <Route
        {...routeProps}
        render={() =>
          isAuth || token ? children : <Redirect to={ROUTES.login} />
        }
      />
    );
  }
};

export default PrivateRoute;
