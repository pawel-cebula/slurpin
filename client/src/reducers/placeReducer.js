import placeService from '../services/places';

const placeReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PLACES':
      return action.places;
    default:
      return state;
  }
};

export const initializePlaces = () => async (dispatch) => {
  const places = await placeService.getAll();
  dispatch({
    type: 'INIT_PLACES',
    places,
  });
};

export default placeReducer;
