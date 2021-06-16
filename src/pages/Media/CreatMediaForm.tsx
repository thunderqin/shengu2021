import React, { useEffect, useState } from "react";
import { Button, Input, Table, Modal, Form, Select, Card } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;

const creatMediaForm = (props: {  form: any; submit: any; }) => {
  const {  form, submit } = props;
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={submit}>
      <Form.Item name="id" label="id" rules={[{ required: true }]}>
          <Input disabled={true} placeholder="账号名称"/>
        </Form.Item>
        <Form.Item name="name" label="账号名称" rules={[{ required: true }]}>
          <Input placeholder="账号名称"/>
        </Form.Item>
        <Form.Item name="platform" label="平台" rules={[{ required: true }]}>
          <Input placeholder="最少2个字符"/>
        </Form.Item>
        <Form.Item
          name="fans"
          label="粉丝数"
          rules={[{ required: true }]}
        >
            <Input placeholder="最少2个字符"/>
        </Form.Item>
        <Form.Item name="url" label="url" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="type" label="类型" rules={[{ required: true }]}>
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="tags"
          label="tag"
          rules={[{ required: true }]}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item name="stars" label="stars" rules={[{ required: true }]}>
          <Input placeholder="" />
        </Form.Item>
      </Form>
  );
};

export default creatMediaForm;
