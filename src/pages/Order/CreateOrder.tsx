import React, { useEffect, useState } from "react";
import { Button, Input, Table, Modal, Form, InputNumber, DatePicker } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


export default function (props: {  form: any; submit: any; }){
  const {  form, submit } = props;
  return (

    <Form {...layout} form={form} name="control-hooks" onFinish={submit}>
        <Form.Item name="custom_name" label="公司">
          <Input placeholder="不需要填写"/>
        </Form.Item>
        <Form.Item name="project_name" label="项目A" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
        <Form.Item name="project_no" label="项目id" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
        <Form.Item name="budget" label="预算" rules={[{ required: true }]}>
          <InputNumber placeholder=""/>
        </Form.Item>
        <Form.Item name="charge_person" label="项目id" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
        <Form.Item name="project_time" label="时间" rules={[{ required: true }]}>
          <DatePicker/>
        </Form.Item>
        <Form.Item name="remark" label="备注" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
        <Form.Item name="price_id" label="选择价格" rules={[{ required: true }]}>
          <Input placeholder=""/>
        </Form.Item>
      </Form>
  );
};


