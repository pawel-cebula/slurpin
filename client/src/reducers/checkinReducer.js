import checkinService from '../services/checkins';

const checkinReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CHECKINS':
      return action.checkins;
    case 'ADD_CHECKIN':
      return [action.checkin, ...state];
    case 'LIKE_CHECKIN':
      return state.map((checkin) =>
        checkin.id === action.checkinId
          ? { ...checkin, likes: checkin.likes + 1 }
          : checkin
      );
    case 'UNLIKE_CHECKIN':
      return state.map((checkin) =>
        checkin.id === action.checkinId
          ? { ...checkin, likes: checkin.likes - 1 }
          : checkin
      );
    default:
      return state;
  }
};

export const initializeCheckins = () => async (dispatch) => {
  const checkins = await checkinService.getAll();
  dispatch({
    type: 'INIT_CHECKINS',
    checkins,
  });
};

export const addCheckin = (checkin) => async (dispatch) => {
  const newCheckin = await checkinService.addNew(checkin);
  dispatch({
    type: 'ADD_CHECKIN',
    checkin: newCheckin,
  });
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
