import personService from '../services/persons';
import authService from '../services/auth';
import { addError, addSuccess } from './notificationReducer';
import errorCodes from '../constants/errorCodes';
import successCodes from '../constants/successCodes';

const userInfo = JSON.parse(localStorage.getItem('user'));

const initialState = userInfo
  ? {
      ...userInfo,
      likes: [],
    }
  : {
      id: null,
      username: null,
      email: null,
      token: null,
      likes: [],
    };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { id, email, username, token } = action.data;
      return { ...state, id, email, username, token };
    }
    case 'LOGOUT': {
      return initialState;
    }
    case 'REGISTER': {
      return state;
    }
    case 'EDIT_USER': {
      return { ...state, ...action.data };
    }
    case 'INIT_USER':
      return { ...state, ...action.data };
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

export const register = (username, email, password) => async (dispatch) => {
  try {
    await authService.register(username, email, password);
    dispatch({
      type: 'REGISTER',
    });
    dispatch(addSuccess(successCodes.registerUser));
  } catch (error) {
    const reason = error.response?.data?.error;
    const notification = reason.includes('duplicate username')
      ? errorCodes.duplicateUsername
      : reason.includes('duplicate email')
      ? errorCodes.duplicateEmail
      : errorCodes.failedRegister;
    dispatch(addError(notification));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const user = await authService.login(email, password);
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  } catch (error) {
    dispatch(addError(errorCodes.failedLogin));
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  return {
    type: 'LOGOUT',
  };
};

export const edit = (userId, user) => async (dispatch) => {
  try {
    const editedUser = await personService.editById(userId, user);
    const userStorage = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem(
      'user',
      JSON.stringify({ ...userStorage, ...editedUser })
    );
    dispatch({
      type: 'EDIT_USER',
      data: editedUser,
    });
    dispatch(addSuccess(successCodes.editUser));
  } catch (error) {
    dispatch(addError(errorCodes.failedEdit));
  }
};

export const initializeUser = (user) => ({
  type: 'INIT_USER',
  data: user,
});

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
