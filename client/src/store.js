import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import checkinReducer from './reducers/checkinReducer';
import placeReducer from './reducers/placeReducer';

const reducer = combineReducers({
  places: placeReducer,
  checkins: checkinReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
