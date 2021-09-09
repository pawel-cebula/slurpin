import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import checkinReducer from './reducers/checkinReducer';
import placeReducer from './reducers/placeReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  places: placeReducer,
  checkins: checkinReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
