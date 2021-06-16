import React, { useEffect, useState } from "react";
import { Button, Input, Table, Modal, Form, Select, Card } from "antd";
import "./Users.css";
import { queryUsers, editUser, addUser, login } from "../../serve/api";
import { useHistory } from "react-router-dom";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;

const PasswordForm = (props: {  form: any; submit: any; }) => {
  const {  form, submit } = props;

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={submit}>
        <Form.Item name="id" label="用户ID" rules={[{ required: true }]}>
          <Input disabled={true} placeholder="不可修改" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input placeholder="最少6个字符" />
        </Form.Item>
        <Form.Item
          name="repassword"
          label="再次确认密码"
          rules={[{ required: true }]}
        >
          <Input placeholder="最少6个字符" />
        </Form.Item>
    </Form>
  );
};

export default PasswordForm;
