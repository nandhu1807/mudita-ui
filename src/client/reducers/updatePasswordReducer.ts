import actionTypes from '../utils/actionTypes';

const initialState: any = {
  updatePassword: null,
  isLoading: false,
  error: '',
};

const updatePasswordReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.UPDATE_PASSWORD:
      return { ...state, isLoading: true };
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, updatePassword: action.response, error: '' };
    case actionTypes.UPDATE_PASSWORD_FAILURE:
      return { ...state, isLoading: false, error: action.response as string };
    default:
      return state;
  }
};

export default updatePasswordReducer;
