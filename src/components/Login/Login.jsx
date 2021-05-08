import { Button, Form, Input } from "antd";
import React from "react";
import styles from "./Login.module.scss";
import AppLogo from "../../assets/images/app-logo.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/action";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    dispatch(login(values, history));
  };

  return (
    <div className={styles.login}>
      <div span={24} className={styles.login_banner}>
        <div>
          <img
            src={AppLogo}
            alt="app-login"
            className={styles.login_banner__logo}
          />
        </div>
      </div>
      <div className={styles.login_form}>
        <h1 className={styles.login_form__title}>ĐĂNG NHẬP</h1>
        <Form
          name="normal_login"
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          className={styles.login_form__body}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Hãy nhập email hợp lệ" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className={styles.login_form__input}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu hợp lệ!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
              className={styles.login_form__input}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.login_form__btn}
              loading={loading}
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div span={24} className={styles.login_banner__bottom} />
    </div>
  );
};

export default Login;
