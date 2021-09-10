import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Layout, notification } from 'antd';
import Feed from './containers/Feed';
import Header from './components/Header';
import Footer from './components/Footer';
import Places from './containers/Places';
import { initializeLikes } from './reducers/userReducer';
import PlaceDetail from './containers/PlaceDetail';
import NewCheckin from './containers/NewCheckin';
import { removeError, removeSuccess } from './reducers/notificationReducer';
import { initializePlaces } from './reducers/placeReducer';

const { Content } = Layout;

function App() {
  const userId = useSelector((state) => state.user.id);
  const success = useSelector((state) => state.notification.success);
  const error = useSelector((state) => state.notification.error);
  const dispatch = useDispatch();

  const notificationSettings = {
    duration: 5,
    style: { marginTop: '60px' },
  };

  useEffect(() => {
    dispatch(initializeLikes(userId));
    dispatch(initializePlaces());
  }, [dispatch]);

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
          {/* {success && (
            <Alert type="success" showIcon closable message={success} />
          )}
          {error && <p>{error}</p>} */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Switch>
              <Route path="/feed" component={Feed} />
              <Route path="/places/:id" component={PlaceDetail} />
              <Route path="/places" component={Places} />
              <Route path="/new-checkin" component={NewCheckin} />
            </Switch>
          </div>
          <Footer />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
