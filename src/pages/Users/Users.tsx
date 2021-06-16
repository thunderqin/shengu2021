import React, { useEffect, useState } from "react";
import { Button, Input, Table, Modal, Form, Select, Card, message, Divider } from "antd";
import "./Users.css";
import { queryUsers, editUser, addUser, queryAdminList, resetPassWord } from "../../serve/api";
import { useHistory } from "react-router-dom";
import AddUserForm from "./AddUserForm";
import ModifyForm from './ModifyForm';
import PassWordForm from  './PassWordForm';
const {Option} = Select;

const Users = () => {
  let history = useHistory();
  const [addForm] = Form.useForm();
  const [modifyForm] = Form.useForm();
  const [passWordForm] = Form.useForm();
  // const [columns, setColumns] = useState([]);
  const [isAddShow, setIsAddShow] = useState(false);
  const [isModifyShow, setIsModifyShow] = useState(false);
  const [isPassWordShow, setIsPassWordShow] = useState(false);
  
  const [dataSource, setDataSource] = useState([]);
  const [adminList, setAdminList] = useState([])

  type IResult = {
    id: string;
    account: String;
    desc: String;
    role_name: String;
    updated_at: String;
    user_name: String;
    user_role: String;
  };

  type IApiResult = {
    status_code: number;
    message: string;
    data: any
  }

  const modifyHandle = (record: IResult) => {
    console.log(record);
    setIsModifyShow(true);
    modifyForm.setFieldsValue(record);
    // modifyForm.setFieldsValue({ ...record, id: index });
  };

  const resetpwHandle = (record: IResult)=>{
    setIsPassWordShow(true);
    passWordForm.setFieldsValue({
      id: record.id,
      password: "",
      repassword: ""
    })
  }

  // const deleteHandle = (record: IResult, index?: number) => {
  //   console.log(record);
  // };

  const columns = [
    {
      title: "账号",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "角色",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "昵称",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: IResult) => {
        return (
          <>
            <Button type="primary" style={{marginRight: 12}} onClick={()=>{modifyHandle(record)}}>修改</Button>
            <Button 
               type="primary"
              onClick={() => {
                resetpwHandle(record);
              }}
            >
              重制密码
            </Button>
          </>
        );
      },
    },
  ];

  const refresh = (params: any) => {
    queryUsers(params).then((d) => {
      console.log(d);
      if (d?.data?.data) {
        setDataSource(d?.data?.data || []);
      }
    });
  };

  const getAdminList = async ()=>{
    const result = await queryAdminList();
    console.log('getAdminList', result)
    setAdminList(result.data)
  }

  useEffect(() => {
    console.log("dddd");
    refresh({});
    getAdminList()
  }, []);

  const addHandle = () => {
    setIsAddShow(true);
    addForm.resetFields();
  };

  const modifySubmit = (value: any) => {
    // modifyForm
    console.log(value);
    editUser(value).then(d=>{
      console.log(d)
      setIsModifyShow(false)
      if(d?.status_code){
        message.success('成功')
      }else{
        message.error(d?.message)
      }
    })
  };

  const addSubmit =  (value: any) => {
    addUser({ ...value }).then((result)=>{
      setIsAddShow(false);
      if(result.status_code === 200){
        refresh({});
      }else{
        message.error('添加失败')
      }
    })
  };

  const passWordSubmit = (value: any)=>{
    console.log(value)
    resetPassWord(value).then(result=>{
      setIsPassWordShow(false);
      if(result.status_code === 200){
        refresh({});
      }else{
        message.error('添加失败')
      }
    })
  }

  return (
    <Card id="users">
      <Modal 
        visible={isAddShow}
        onOk={()=>{addForm.submit()}}
        onCancel={()=>{setIsAddShow(false)}}
      >
        <AddUserForm
          form={addForm}
          submit={addSubmit}
          adminList={adminList}
        ></AddUserForm>
      </Modal>

      <Modal 
        visible={isPassWordShow}
        onOk={()=>{passWordForm.submit()}}
        onCancel={()=>{setIsPassWordShow(false)}}
      >
        <PassWordForm
          form={passWordForm}
          submit={passWordSubmit}
        ></PassWordForm>
      </Modal>
     
      <Modal 
        visible={isModifyShow}
        onOk={()=>{modifyForm.submit()}}
        onCancel={()=>{setIsModifyShow(false)}}
      >
        <ModifyForm
          form={modifyForm}
          adminList={adminList}
          submit={modifySubmit}
        ></ModifyForm>
      </Modal>
      <div>
        <Button type="primary" style={{marginBottom: 20}} onClick={addHandle}>
          新增用户
        </Button>
        <Button type="primary" style={{marginBottom: 20, marginLeft: 20}} onClick={()=>{history.push('/home/media')}}>
          去媒体页
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={dataSource}
        rowKey='id'
      ></Table>
    </Card>
  );
};

export default Users;
