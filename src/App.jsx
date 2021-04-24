import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
