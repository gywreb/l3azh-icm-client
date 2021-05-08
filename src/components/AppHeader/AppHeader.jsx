import { Button, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import Logo from "../../assets/images/app-logo.png";
import styles from "./AppHeader.module.scss";
import { WalletOutlined, TransactionOutlined } from "@ant-design/icons";
import { ROUTES } from "../../constants/routes";
import { appColor } from "../../constants/styles";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/action";

const AppHeader = ({ toggleSelectedMenu, current }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logout(history));
  };
  return (
    <Header className={styles.app_header}>
      <div className={styles.app_header__imageContainer}>
        <img src={Logo} alt="" style={{ width: 80, height: 80 }} />
        <h1>Xin chào Admin</h1>
      </div>
      <Menu
        onClick={toggleSelectedMenu}
        defaultSelectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item
          key={ROUTES.walletType}
          icon={<WalletOutlined color={appColor.mainColor} />}
        >
          QUẢN LÝ LOẠI VÍ
        </Menu.Item>
        <Menu.Item
          key={ROUTES.transactionType}
          icon={<TransactionOutlined color={appColor.mainColor} />}
        >
          QUẢN LÝ LOẠI GIAO DỊCH
        </Menu.Item>
      </Menu>
      <Button type="primary" size="large" shape="round" onClick={onLogout}>
        Đăng xuất
      </Button>
    </Header>
  );
};

export default AppHeader;
