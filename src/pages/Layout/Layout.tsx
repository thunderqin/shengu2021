import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Layout.css";
import { useHistory } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MyLayout = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const gotoPage = (pageId: string)=>{
    history.push('/home/'+pageId)
  }

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">神谷大logo</div>
        <Menu theme="dark" onClick={(e)=>{gotoPage(e.key)}} mode="inline" defaultSelectedKeys={["media"]}>
          <Menu.Item key="media" icon={<UserOutlined />}>
            媒体页
          </Menu.Item>
          <Menu.Item key="order" icon={<VideoCameraOutlined />}>
            订单页
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {
                setCollapsed(!collapsed);
              },
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
