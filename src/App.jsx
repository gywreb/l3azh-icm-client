import Layout from "antd/lib/layout/layout";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import AuthProvider from "./components/AuthProvider/AuthProvider";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <AuthProvider />
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
