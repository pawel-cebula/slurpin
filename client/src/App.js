import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Feed from './containers/Feed';
import Header from './components/Header';
import Footer from './components/Footer';
import { initializeCheckins } from './reducers/checkinReducer';

const { Content } = Layout;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCheckins());
  }, [dispatch]);

  return (
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
          <Router>
            <Switch>
              <Route path="/feed" component={Feed} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </Content>
    </Layout>
  );
}

export default App;
