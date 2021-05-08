import { Layout } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/auth/action";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Login from "../Login/Login";
import WalletType from "../WalletType/WalletType";
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
      <Layout>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                token ? (
                  <Redirect to={ROUTES.login} />
                ) : (
                  <Redirect to={ROUTES.walletType} />
                )
              }
            />
            <PrivateRoute path={ROUTES.login} exact>
              <Login />
            </PrivateRoute>
            <AppLayout>
              <PrivateRoute isAuth={token} path={ROUTES.walletType} exact>
                <WalletType />
              </PrivateRoute>
              <PrivateRoute isAuth={token} path={ROUTES.transactionType} exact>
                <TransactionType />
              </PrivateRoute>
            </AppLayout>
          </Switch>
        </Router>
      </Layout>
    );
};

export default AuthProvider;
