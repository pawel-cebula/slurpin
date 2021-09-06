import checkinService from '../services/checkins';

const checkinReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CHECKINS':
      return action.checkins;
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

export default checkinReducer;
