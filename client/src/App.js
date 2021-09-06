import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Feed from './containers/Feed';
import { initializeCheckins } from './reducers/checkinReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCheckins());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Slurpin</h1>
      <Router>
        <Switch>
          <Route path="/feed" component={Feed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
