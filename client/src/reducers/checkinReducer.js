import checkinService from '../services/checkins';
import { addError, addSuccess } from './notificationReducer';

const initialState = {
  isLoading: false,
  loaded: false,
  data: null,
};

const checkinReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_CHECKINS_REQUEST':
      return { ...state, isLoading: true, loaded: false, data: null };
    case 'INIT_CHECKINS_SUCCESS':
      return { ...state, isLoading: false, loaded: true, data: action.data };
    case 'INIT_CHECKINS_FAILURE':
      return { ...state, isLoading: false, loaded: false, data: null };
    case 'ADD_CHECKIN_REQUEST':
      return { ...state, isLoading: true, loaded: false };
    case 'ADD_CHECKIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: [action.checkin, ...state.data],
      };
    case 'ADD_CHECKIN_FAILURE':
      return { ...state, isLoading: false, loaded: false };
    case 'EDIT_CHECKIN':
      return {
        ...state,
        data: state.data.map((checkin) =>
          checkin.id === action.checkin.id ? action.checkin : checkin
        ),
      };
    case 'LIKE_CHECKIN':
      return {
        ...state,
        data: state.data.map((checkin) =>
          checkin.id === action.checkinId
            ? { ...checkin, likes: checkin.likes + 1 }
            : checkin
        ),
      };
    case 'UNLIKE_CHECKIN':
      return {
        ...state,
        data: state.data.map((checkin) =>
          checkin.id === action.checkinId
            ? { ...checkin, likes: checkin.likes - 1 }
            : checkin
        ),
      };
    default:
      return state;
  }
};

export const initializeCheckins = () => async (dispatch) => {
  try {
    dispatch({ type: 'INIT_CHECKINS_REQUEST' });
    const checkins = await checkinService.getAll();
    dispatch({ type: 'INIT_CHECKINS_SUCCESS', data: checkins });
  } catch {
    dispatch({ type: 'INIT_CHECKINS_FAILURE' });
    dispatch(addError('Failed to fetch checkins'));
  }
};

export const addCheckin = (checkin) => async (dispatch) => {
  try {
    dispatch({ type: 'ADD_CHECKIN_REQUEST' });
    const newCheckin = await checkinService.addNew(checkin);
    dispatch({ type: 'ADD_CHECKIN_SUCCESS', checkin: newCheckin });
    dispatch(addSuccess('Successfully added new checkin'));
  } catch {
    dispatch({ type: 'ADD_CHECKIN_FAILURE' });
    dispatch(addError('Failed to add new checkin'));
  }
};

export const editCheckin = (checkinId, checkin) => async (dispatch) => {
  try {
    const editedCheckin = await checkinService.edit(checkinId, checkin);
    dispatch({ type: 'EDIT_CHECKIN', checkin: editedCheckin });
    dispatch(addSuccess('Successfully edited the checkin'));
  } catch {
    dispatch(addError('Failed to edit the checkin'));
  }
};

export const likeCheckin = (checkinId, personId) => async (dispatch) => {
  await checkinService.like(checkinId, personId);
  dispatch({
    type: 'LIKE_CHECKIN',
    checkinId,
  });
};

export const unlikeCheckin = (checkinId, personId) => async (dispatch) => {
  await checkinService.unlike(checkinId, personId);
  dispatch({
    type: 'UNLIKE_CHECKIN',
    checkinId,
  });
};

export default checkinReducer;
