const initialState = {
  success: null,
  error: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SUCCESS':
      return {
        ...state,
        success: action.success,
      };
    case 'REMOVE_SUCCESS':
      return {
        ...state,
        success: null,
      };
    case 'ADD_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addSuccess = (success) => ({ type: 'ADD_SUCCESS', success });
export const removeSuccess = () => ({ type: 'REMOVE_SUCCESS' });
export const addError = (error) => ({ type: 'ADD_ERROR', error });
export const removeError = () => ({ type: 'REMOVE_ERROR' });

export default notificationReducer;
