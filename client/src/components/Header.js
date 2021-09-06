import React from 'react';
import { Layout, Menu } from 'antd';

const Header = () => (
  <Layout.Header
    style={{
      position: 'fixed',
      zIndex: 1,
      width: '100%',
    }}
  >
    <div className="logo" />
    <Menu
      className="navigation"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ marginLeft: 'auto' }}
    >
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  </Layout.Header>
);

export default Header;
