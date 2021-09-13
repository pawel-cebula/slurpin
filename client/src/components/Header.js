import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Header = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
    window.location.reload();
  };

  const userButtons = () => {
    if (user.token) {
      return (
        <Menu.Item key="logout" style={{ marginLeft: 'auto' }}>
          <span
            role="button"
            tabIndex={0}
            onClick={handleLogout}
            onKeyDown={handleLogout}
          >
            Logout
          </span>
        </Menu.Item>
      );
    }
    return (
      <>
        <Menu.Item key="register" style={{ marginLeft: 'auto' }}>
          <NavLink to="/register">Register</NavLink>
        </Menu.Item>
        <Menu.Item key="login">
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
      </>
    );
  };

  return (
    <Layout.Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div className="logo" />
      <Menu className="navigation" theme="dark" mode="horizontal">
        <Menu.Item key="feed">
          <NavLink to="/feed">Feed</NavLink>
        </Menu.Item>
        <Menu.Item key="places">
          <NavLink to="/places">Places</NavLink>
        </Menu.Item>
        <Menu.Item key="checkin">
          <NavLink to="/new-checkin">New checkin</NavLink>
        </Menu.Item>
        {userButtons()}
      </Menu>
    </Layout.Header>
  );
};

export default Header;
