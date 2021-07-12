import { Button, Form, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransType,
  deleteTransType,
  getTransType,
  updateTransType,
} from "../../../store/transactionType/action";
import AppOverlayLoader from "../../AppOverlayLoader/AppOverlayLoader";
import styles from "./TransactionTypeList.module.scss";

const TransactionTypeList = () => {
  const dispatch = useDispatch();
  const { list, loading, listLoading } = useSelector(
    (state) => state.transType
  );
  const [isTransTypeVisible, setIsTransTypeVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "idTransType",
      key: "idTransType",
    },
    {
      title: "Tên Loại Giao Dịch",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      key: "action",
      align: "right",
      render: (transType) => {
        console.log(transType);
        return (
          <>
            <Button
              className={styles.actionBtn}
              type="primary"
              size="large"
              onClick={() => {
                setIsEditing(true);
                setCurrentEditingId(transType.idTransType);
                handleOpenAddTransType();
                form.setFieldsValue({
                  categoryName: transType.categoryName,
                  type: transType.type,
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
              onClick={() => handleDeleteTransType(transType.idTransType)}
            >
              XÓA
            </Button>
          </>
        );
      },
    },
  ];

  const handleDeleteTransType = (id) => {
    dispatch(deleteTransType(id));
  };

  useEffect(() => {
    dispatch(getTransType());
  }, [dispatch]);

  const handleOpenAddTransType = () => {
    setIsTransTypeVisible(true);
  };

  const onFinish = (values) => {
    isEditing
      ? dispatch(updateTransType({ idTransType: currentEditingId, ...values }))
      : dispatch(createTransType(values));
  };

  if (listLoading)
    return (
      <AppOverlayLoader
        isLoading={listLoading}
        loadText="Loading Transaction types"
      />
    );
  else
    return (
      <div className={styles.list_container}>
        <div className={styles.addBtn_container}>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={handleOpenAddTransType}
          >
            THÊM LOẠI GIAO DỊCH
          </Button>
        </div>
        <Table
          dataSource={list}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
        <Modal
          title="THÊM LOẠI GIAO DỊCH"
          visible={isTransTypeVisible}
          onCancel={() => {
            setIsTransTypeVisible(false);
            setIsEditing(false);
          }}
          onOk={form.submit}
          okText={isEditing ? "SỬA" : "LƯU"}
          cancelText="HỦY"
          confirmLoading={loading}
        >
          <Form
            form={form}
            initialValues={{ categoryName: "" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên Loại Giao Dịch"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "Please input transaction type name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại"
              rules={[
                { required: true, message: "Please select transaction type!" },
              ]}
            >
              <Select placeholder="Xin hãy chọn loại">
                <Select.Option value="Thu">Thu</Select.Option>
                <Select.Option value="Chi">Chi</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
};

export default TransactionTypeList;
