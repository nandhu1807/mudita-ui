import actionTypes from '../utils/actionTypes';
import { AuthLoginState, AuthLoginReducerAction, AuthDetails } from './types';

const initialState: AuthLoginState = {
  authDetails: null,
  isLoading: false,
  error: '',
};

const authLoginReducer = (state = initialState, action: AuthLoginReducerAction): AuthLoginState => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return { ...state, isLoading: true };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return { ...state, isLoading: false, authDetails: action.response as AuthDetails };
    case actionTypes.AUTH_LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error as string };
    default:
      return state;
  }
};

export default authLoginReducer;
