import Layout from "antd/lib/layout/layout";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ROUTES } from "../../constants/routes";
import AppHeader from "../AppHeader/AppHeader";

const AppLayout = ({ children }) => {
  const history = useHistory();
  const [current, setCurrent] = useState(ROUTES.transactionType);

  const toggleSelectedMenu = (current) => {
    setCurrent(current.key);
    history.push(current.key);
  };

  return (
    <Layout>
      <AppHeader
        // handleOpenAddWalletType={handleOpenAddWalletType}
        // handleOpenAddWallet={handleOpenAddWallet}
        toggleSelectedMenu={toggleSelectedMenu}
        current={current}
      />
      {children}
    </Layout>
  );
};

export default AppLayout;
