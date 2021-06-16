import React, { useEffect, useState } from "react";
import {Button} from 'antd'

export const columns = [
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
      title: "价格",
      dataIndex: "childs",
      render: (pricelist)=>{
        return (
          <>
            {
               pricelist.map(p=>(
                <div key={p.id}>{p.id}--{p.position}--{p.price}--<Button>修改价格</Button></div>
              ))
            }
          </>
        )
      }
    },
    {
      title: "操作",
      dataIndex: "operations",
      render: (pricelist)=>{
        return (
          <>
            <Button type="primary" onClick={()=>{alert(1)}}>修改</Button>
          </>
        )
      }
    },
  ]