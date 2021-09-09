import personService from '../services/persons';

const initialState = {
  id: '68f6cfed-9351-4243-a74d-5512bd610447',
  likes: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_LIKES':
      return { ...state, likes: action.likes };
    case 'ADD_USER_LIKE':
      return { ...state, likes: [...state.likes, action.checkinId] };
    case 'DELETE_USER_LIKE':
      return {
        ...state,
        likes: state.likes.filter((l) => l !== action.checkinId),
      };
    default:
      return state;
  }
};

export const initializeLikes = (userId) => async (dispatch) => {
  const likes = await personService.getLikes(userId);
  dispatch({
    type: 'INIT_LIKES',
    likes,
  });
};

export const addUserLike = (checkinId) => ({
  type: 'ADD_USER_LIKE',
  checkinId,
});

export const deleteUserLike = (checkinId) => ({
  type: 'DELETE_USER_LIKE',
  checkinId,
});

export default userReducer;
