import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { Layout, notification } from 'antd';
import Feed from './pages/Feed';
import Header from './components/Header';
import Footer from './components/Footer';
import Places from './pages/Places';
import { initializeLikes, initializeUser } from './reducers/userReducer';
import PlaceDetail from './pages/PlaceDetail';
import NewCheckin from './pages/NewCheckin';
import { removeError, removeSuccess } from './reducers/notificationReducer';
import { initializePlaces } from './reducers/placeReducer';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import { initializeCheckins } from './reducers/checkinReducer';
import EditCheckin from './pages/EditCheckin';
import UserProfile from './pages/UserProfile';
import EditUser from './pages/EditUser';

const { Content } = Layout;

function App() {
  const user = useSelector((state) => state.user);
  const success = useSelector((state) => state.notification.success);
  const error = useSelector((state) => state.notification.error);
  const dispatch = useDispatch();

  const notificationSettings = {
    duration: 5,
    style: { marginTop: '60px' },
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      dispatch(initializeUser());
    }
  }, []);

  useEffect(() => {
    if (user.token) {
      dispatch(initializeLikes(user.id));
      dispatch(initializePlaces());
      dispatch(initializeCheckins());
    }
  }, [dispatch, user.token]);

  useEffect(() => {
    if (success) {
      notification.success({
        ...notificationSettings,
        description: success,
      });
      setTimeout(() => dispatch(removeSuccess()), 5000);
    }
    if (error) {
      notification.error({
        ...notificationSettings,
        description: error,
      });
      setTimeout(() => dispatch(removeError()), 5000);
    }
  }, [success, error]);

  return (
    <Router>
      <Layout className="App">
        <Header />
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 128 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Switch>
              <PrivateRoute path="/feed">
                <Feed />
              </PrivateRoute>
              <PrivateRoute path="/places/:id">
                <PlaceDetail />
              </PrivateRoute>
              <PrivateRoute path="/places">
                <Places />
              </PrivateRoute>
              <PrivateRoute path="/new-checkin">
                <NewCheckin />
              </PrivateRoute>
              <PrivateRoute path="/checkins/:id/edit">
                <EditCheckin />
              </PrivateRoute>
              <PrivateRoute path="/users/:id/edit">
                <EditUser />
              </PrivateRoute>
              <PrivateRoute path="/users/:id">
                <UserProfile />
              </PrivateRoute>
              <Route path="/register" component={Register} />
              <Route path="/login">
                {!user.token ? <Login /> : <Redirect to="/feed" />}
              </Route>
              <Route exact path="/">
                {user.token ? <Feed /> : <Redirect to="login" />}
              </Route>
            </Switch>
          </div>
          <Footer />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
