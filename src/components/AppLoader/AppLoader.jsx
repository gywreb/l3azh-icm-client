import React from "react";
import Loader from "react-loader-spinner";
import { appColor } from "../../constants/styles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Logo from "../../assets/images/app-logo.png";
import styles from "./AppLoader.module.scss";

const AppLoader = () => {
  return (
    <div className={styles.loader_container}>
      <img src={Logo} className={styles.loader_logo} />
      <Loader type="TailSpin" color={appColor.white} height={200} width={200} />
    </div>
  );
};

export default AppLoader;
