import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

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
      style={{ marginLeft: 'auto' }}
    >
      <Menu.Item key="feed">
        <Link to="/feed">Feed</Link>
      </Menu.Item>
      <Menu.Item key="places">
        <Link to="/places">Places</Link>
      </Menu.Item>
      <Menu.Item key="checkin" style={{ marginLeft: 'auto' }}>
        <Link to="/new-checkin">New checkin</Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
);

export default Header;
