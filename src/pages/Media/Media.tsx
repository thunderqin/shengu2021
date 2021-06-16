import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  message,
  Button,
  Table,
  Modal,
  Select,
  Form,
  Popover,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CheckForm from "./CheckForm";
import {
  insetForm,
  getPlatFormList,
  getTagsList,
  getMediaPrice,
  getMediaDetail,
  editMediaDetail,
  addMediaDetail,
  addPrice,
  editPrice,
  getMediaList,
} from "../../serve/media";
const { Option } = Select;
// import {columns} from './config';
import CreatMediaForm from "./CreatMediaForm";
import PriceModal from "./PriceModal";
import { useGetPlatForm, useGetTable, useGetTags } from "./hooks";

type IOptions = { key: string; label: string };

const Media = () => {
  const [isModifyShow, setIsModifyShow] = useState(false);
  const [modifyData, setModifydata] = useState([]);
  const platform = useGetPlatForm();
  const tags = useGetTags();
  const [activeTags, setActiveTags] = useState("阿里");
  const [activePlatform, setActivePlatForm] = useState("微博");
  const [dataSource, loading, getTableList] = useGetTable(activeTags, activePlatform);
  let modifyIdRef = useRef("");
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [creatForm] = Form.useForm();
  const [priceForm] = Form.useForm();
  const [isShowPriceModalKey, setIsShowPriceModalKey] = useState('');

  const props = {
    name: "file",
    action: "https://shaoxliu.cn/api/media/import",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      console.log("info");
      if (info.file.status === "done") {
        console.log(info);
        setIsModifyShow(true);
        modifyIdRef.current = info.file.response.data.key || "";
        setModifydata(info.file.response.data.data.new || []);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const addPriceSubmitHandle = async () => {
    const params = priceForm.getFieldValue();
    console.log(params);
    const result =  await addPrice(params);
    message.success(result.status_code === 200? '成功': '失败');
    await getTableList();
    setIsShowPriceModalKey('')
  };
  const modifyPriceSubmitHandle = async () => {
    const params = priceForm.getFieldValue();
    console.log(params);
    const result =  await editPrice(params);
    message.success(result.status_code === 200? '成功': '失败');
    await getTableList();
    setIsShowPriceModalKey('')

  };

  

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
      title: "价格",
      dataIndex: "childs",
      render: (pricelist) => {
        return (
          <>
            {pricelist.map((p) => (
              <div key={p.id}>
                {p.id}--{p.position}--{p.price}--
                <Popover
                  trigger='click'
                  title="修改价格"
                  visible={isShowPriceModalKey === `price${p.id}`}
                  content={
                    <PriceModal form={priceForm} submit={modifyPriceSubmitHandle} />
                  }
                >
                  <Button
                    onClick={()=>{
                      setIsShowPriceModalKey(`price${p.id}`);
                      priceForm.setFieldsValue(p)
                    }}
                  >修改价格</Button>
                </Popover>
              </div>
            ))}
          </>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operations",
      render: (_, record) => {
        console.log("record", record);
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setIsShowAddModal(true);
                creatForm.setFieldsValue(record);
              }}
            >
              修改信息
            </Button>
            <Popover 
              title="添加价格"
              trigger="click"
              visible={isShowPriceModalKey === `row${record.id}`}
              content={
                <PriceModal form={priceForm} submit={addPriceSubmitHandle} />
              }
            >
              <Button type="primary" onClick={() => {
                setIsShowPriceModalKey(`row${record.id}`);
                priceForm.setFieldsValue({id: record.id, price: '', position: ''})
              }}>
                添加价格
              </Button>
            </Popover>
          </>
        );
      },
    },
  ];

  const checkModify = async () => {
    console.log(modifyIdRef.current);
    const res = await insetForm({ key: modifyIdRef.current });
    console.log("res", res);
    setIsModifyShow(false);
    if (res?.status_code === 200) {
      message.success("修改成功");
    }
  };

  const createHandle = async () => {
    const params = creatForm.getFieldValue();

    console.log(params);
    let result = null;

    if (params.id) {
      result = await editMediaDetail(params);
    } else {
      result = await addMediaDetail(params);
    }

    setIsShowAddModal(false);
    if (result?.status_code === 200) {
      message.success("修改成功");
    } else {
      message.error("修改失败");
    }
  };

  return (
    <div id="media" style={{ position: "relative" }}>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <Button
          style={{ marginRight: 20 }}
          type="primary"
          onClick={() => {
            setIsShowAddModal(true);
            creatForm.resetFields();
          }}
        >
          新增自媒体
        </Button>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Modal
          visible={isModifyShow}
          width={1200}
          title={"确认修改范围"}
          onOk={checkModify}
          onCancel={() => {
            setIsModifyShow(false);
          }}
        >
          <CheckForm dataSource={modifyData}></CheckForm>
        </Modal>
        <Modal
          visible={isShowAddModal}
          title="新增/修改"
          onOk={() => {
            creatForm.submit();
          }}
          onCancel={() => setIsShowAddModal(false)}
        >
          <CreatMediaForm
            form={creatForm}
            submit={createHandle}
          ></CreatMediaForm>
        </Modal>
      </div>
      <div style={{ marginBottom: 30 }}>
        <Select
          style={{ width: 200, marginRight: 20 }}
          value={activePlatform}
          onChange={(newVal) => {
            setActivePlatForm(newVal);
          }}
        >
          {platform.map((pf) => (
            <Option key={pf.key} value={pf.label}>
              {pf.label}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          value={activeTags}
          onChange={(newVal) => {
            setActiveTags(newVal);
          }}
        >
          {tags?.map((pf) => (
            <Option key={pf.key} value={pf.label}>
              {pf.label}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        ></Table>
      </div>
    </div>
  );
};

export default Media;
