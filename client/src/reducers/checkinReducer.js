import checkinService from '../services/checkins';

const checkinReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CHECKINS':
      return action.checkins;
    case 'ADD_CHECKIN':
      return [...state, action.checkin];
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

export default checkinReducer;
