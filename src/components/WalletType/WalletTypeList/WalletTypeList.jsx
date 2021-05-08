import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWalletType,
  deleteWalletType,
  getWalletList,
  updateWalletType,
} from "../../../store/walletType/action";
import styles from "./WalletTypeList.module.scss";

const WalletTypeList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.walletType);
  const [isWalletTypeVisible, setIsWalletTypeVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "idWalletType",
      key: "idWalletType",
    },
    {
      title: "Tên Ví",
      dataIndex: "type",
      key: "type",
    },
    {
      key: "action",
      align: "right",
      render: (walletType) => {
        console.log(walletType);
        return (
          <>
            <Button
              className={styles.actionBtn}
              type="primary"
              size="large"
              onClick={() => {
                setIsEditing(true);
                setCurrentEditingId(walletType.idWalletType);
                handleOpenAddWalletType();
                form.setFieldsValue({
                  type: walletType.type,
                });
              }}
            >
              SỬA
            </Button>
            <Button
              className={styles.actionBtn}
              type="primary"
              danger
              size="large"
              onClick={() => handleDeleteWalletType(walletType.idWalletType)}
            >
              XÓA
            </Button>
          </>
        );
      },
    },
  ];

  const handleDeleteWalletType = (id) => {
    dispatch(deleteWalletType(id));
  };

  useEffect(() => {
    dispatch(getWalletList());
  }, []);

  const handleOpenAddWalletType = () => {
    setIsWalletTypeVisible(true);
  };

  const onFinish = (values) => {
    isEditing
      ? dispatch(
          updateWalletType({ idWalletType: currentEditingId, ...values })
        )
      : dispatch(createWalletType(values));
  };

  return (
    <div className={styles.list_container}>
      <div className={styles.addBtn_container}>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={handleOpenAddWalletType}
        >
          THÊM LOẠI VÍ
        </Button>
      </div>
      <Table dataSource={list} columns={columns} pagination={{ pageSize: 5 }} />
      <Modal
        title="THÊM LOẠI VÍ"
        visible={isWalletTypeVisible}
        onCancel={() => {
          setIsWalletTypeVisible(false);
          setIsEditing(false);
        }}
        onOk={form.submit}
        okText={isEditing ? "SỬA" : "LƯU"}
        cancelText="HỦY"
      >
        <Form form={form} initialValues={{ type: "" }} onFinish={onFinish}>
          <Form.Item
            label="Tên Ví"
            name="type"
            rules={[
              { required: true, message: "Please input wallet type name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WalletTypeList;
