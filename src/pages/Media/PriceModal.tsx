import React, { useEffect, useState } from "react";
import { Button, Input, Table, Modal, Form, Select, Card } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

export default function (props: {  form: any; submit: any; }){
  const {  form, submit } = props;
  return (

    <Form {...layout} form={form} name="control-hooks" onFinish={submit}>
        <Form.Item name="id" label="id">
          <Input disabled={true} placeholder="不需要填写"/>
        </Form.Item>
        <Form.Item name="position" label="平台" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
        <Form.Item name="price" label="价格" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
  );
};


