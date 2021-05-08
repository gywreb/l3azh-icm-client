import React from "react";
import { Provider } from "react-redux";

import AuthProvider from "./components/AuthProvider/AuthProvider";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider />
    </Provider>
  );
};

export default App;
