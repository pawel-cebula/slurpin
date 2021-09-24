import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Header = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    history.push('/');
    window.location.reload();
  };

  const userButtons = () => {
    if (user.token) {
      return (
        <>
          <Menu.Item key="profile" className="margin-left-auto">
            <NavLink to={`/users/${user.id}`} id="nav-profile">
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout" id="nav-logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      );
    }
    return (
      <>
        <Menu.Item key="register" className="margin-left-auto">
          <NavLink to="/register" id="nav-register">
            Register
          </NavLink>
        </Menu.Item>
        <Menu.Item key="login">
          <NavLink to="/login" id="nav-login">
            Login
          </NavLink>
        </Menu.Item>
      </>
    );
  };

  return (
    <Layout.Header className="header">
      <div className="container">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname.slice(1)]}
        >
          <Menu.Item key="feed">
            <NavLink to="/feed" id="nav-feed">
              Feed
            </NavLink>
          </Menu.Item>
          <Menu.Item key="places">
            <NavLink to="/places" id="nav-places">
              Places
            </NavLink>
          </Menu.Item>
          <Menu.Item key="checkin">
            <NavLink to="/new-checkin" id="nav-new-checkin">
              New checkin
            </NavLink>
          </Menu.Item>
          {userButtons()}
        </Menu>
      </div>
    </Layout.Header>
  );
};

export default Header;
