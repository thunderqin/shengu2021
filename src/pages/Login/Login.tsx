import React, { useState } from "react";
import { Button, Input } from "antd";
import "./Login.css";
import {queryUsers,editUser,addUser,login} from '../../serve/api';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { token } from '../../store/index';
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const Login = () => {
  let history = useHistory();
  const [userName, setUserName] = useState("shengu001");
  const [passWord, setPassWord] = useState("123456");
  // onClick={() => { history.push('/home') }}
  const submit = () => {
    login({
      account: userName,
      password: passWord,
    }).then(function (response) {
      console.log(response);
      if(response?.data.token){
        localStorage.setItem('token', response?.data.token);
        history.push('./users');
      }
    })
  };

  return (
    <div id="login">
      <div className="box">
        <h1 style={{textAlign: "center"}}>神谷</h1>
        <br/>
        <div className="input-item">
          <Input
            value={userName}
            placeholder="请输入账号"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Input>
        </div>
        <div className="input-item">
          <Input
            value={userName}
            placeholder="请输入密码"
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          ></Input>
        </div>
        <div className="input-item">
          <Button className="submit-btn" type="primary" onClick={submit}>
            登陆
          </Button>
          {/* <Button className="submit-btn" type="primary" onClick={getUserList}>
            获取用户列表
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
