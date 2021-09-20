import errorCodes from '../constants/errorCodes';
import placeService from '../services/places';
import { addError } from './notificationReducer';

const initialState = {
  isLoading: false,
  loaded: false,
  data: null,
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_PLACES_REQUEST':
      return { ...state, isLoading: true, loaded: false, data: null };
    case 'INIT_PLACES_SUCCESS':
      return { ...state, isLoading: false, loaded: true, data: action.data };
    case 'INIT_PLACES_FAILURE':
      return { ...state, isLoading: false, loaded: false, data: null };
    default:
      return state;
  }
};

export const initializePlaces = () => async (dispatch) => {
  try {
    dispatch({ type: 'INIT_PLACES_REQUEST' });
    const places = await placeService.getAll();
    dispatch({ type: 'INIT_PLACES_SUCCESS', data: places });
  } catch (error) {
    dispatch({ type: 'INIT_PLACES_FAILURE' });
    dispatch(addError(errorCodes.failedFetch));
  }
};

export default placeReducer;
