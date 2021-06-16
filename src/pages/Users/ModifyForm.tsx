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

const ModifyForm = (props: any)=>{
    const { form, adminList, submit } = props;
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form {...layout} form={form} name="control-hooks" onFinish={submit}>
        <Form.Item name="id" label="ID" rules={[{ required: true }]}>
          <Input disabled={true} placeholder="最少6个字符"/>
        </Form.Item>
        <Form.Item name="account" label="账号" rules={[{ required: true }]}>
          <Input placeholder="最少6个字符"/>
        </Form.Item>
        <Form.Item name="user_name" label="昵称" rules={[{ required: true }]}>
          <Input placeholder="最少6个字符"/>
        </Form.Item>
        <Form.Item
          name="admin_id"
          label="二级管理员"
          rules={[{ required: true }]}
        >
          <Select>
            {
                adminList?.map((admin: { id: string; user_name: string }) => (
                    <Option key={admin.id} value={admin.id}>
                        {admin.user_name}
                    </Option>
                ))
            }
          </Select>
        </Form.Item>
        <Form.Item name="user_role" label="角色" rules={[{ required: true }]}>
          <Select>
            <Option value="admin">二级管理员</Option>
            <Option value="project">项目</Option>
            <Option value="medium">媒介</Option>
            <Option value="accountant">财务</Option>
          </Select>
        </Form.Item>
        <Form.Item name="desc" label="描述" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input placeholder="最少6个字符" />
        </Form.Item>
        <Form.Item
          name="repassword"
          label="再次确认密码"
          rules={[{ required: true }]}
        >
          <Input placeholder="最少6个字符" />
        </Form.Item> */}
      </Form>
    )
  }

export default ModifyForm;
