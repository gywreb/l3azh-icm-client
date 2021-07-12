import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/auth/action";
import { Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Login from "../Login/Login";
import TransactionType from "../TransactionType/TransactionType";
import { ROUTES } from "../../constants/routes";
import AppLoader from "../AppLoader/AppLoader";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const AuthProvider = () => {
  const dispatch = useDispatch();
  const { loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);

  if (loading) return <AppLoader />;
  else
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            token ? (
              <Redirect to={ROUTES.login} />
            ) : (
              <Redirect to={ROUTES.transactionType} />
            )
          }
        />
        <PrivateRoute path={ROUTES.login} exact>
          <Login />
        </PrivateRoute>
        <AppLayout>
          {/* <PrivateRoute isAuth={token} path={ROUTES.walletType} exact>
            <WalletType />
          </PrivateRoute> */}
          <PrivateRoute isAuth={token} path={ROUTES.transactionType} exact>
            <TransactionType />
          </PrivateRoute>
        </AppLayout>
      </Switch>
    );
};

export default AuthProvider;
