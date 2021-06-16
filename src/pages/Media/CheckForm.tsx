import React, { useEffect, useState } from "react";
import { Table, Modal } from 'antd';

type IProps = {
    dataSource?: any[]
}

const columns = [
    {
      title: "链接或ID",
      dataIndex: "id",
    },
    {
      title: "平台",
      dataIndex: "platform",
    },
    {
      title: "账号名称",
      dataIndex: "name",
    },
    {
      title: "粉丝",
      dataIndex: "fans",
    },
    {
      title: "链接",
      dataIndex: "url",
    },
    {
      title: "类型",
      dataIndex: "type",
    },
    {
      title: "标签",
      dataIndex: "tags",
    },
    {
      title: "收藏或关注(万)",
      dataIndex: "stars",
    },
    {
      title: "非原创直发",
      dataIndex: "position",
    },
    {
      title: "非原创转发",
      dataIndex: "position",
    },
    {
      title: "非原创微任务直发",
      dataIndex: "position",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
  ]

export default (props: IProps)=>{
    const {dataSource} = props;
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
        ></Table>
    )
}
