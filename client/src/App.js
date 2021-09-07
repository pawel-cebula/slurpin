import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Feed from './containers/Feed';
import Header from './components/Header';
import Footer from './components/Footer';
import Places from './containers/Places';
import { initializeCheckins } from './reducers/checkinReducer';
import { initializePlaces } from './reducers/placeReducer';
import PlaceDetail from './containers/PlaceDetail';
import NewCheckin from './containers/NewCheckin';

const { Content } = Layout;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCheckins());
    dispatch(initializePlaces());
  }, [dispatch]);

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
