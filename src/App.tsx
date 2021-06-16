import React, { useState } from "react";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Media from "./pages/Media/Media";
import Users from "./pages/Users/Users";
import Order from './pages/Order/order'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  // const [name, setName] = useState('');
  // const [passWord, setPassWord] = useState('');

  // return (
  //   <div className="App">
  //     <Input value={name} onChange={(e) => { setName(e.target.value)}}></Input>
  //     <Input value={name} onChange={(e) => { setPassWord(e.target.value)}}></Input>
  //     <Button>888</Button>
  //   </div>
  // )
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/home/:path?" exact>
            <Layout>
              <Switch>
                <Route path="/home/media" exact component={Media} />
                <Route path="/home/order" component={Order} />
              </Switch>
            </Layout>
          </Route>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
