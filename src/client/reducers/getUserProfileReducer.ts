import { UserProfileState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: UserProfileState = {
  userProfile: null,
  isLoading: false,
  error: '',
};

const getUserProfileReducer = (state = initialState, action: Action): UserProfileState => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE:
      return { ...state, isLoading: true };
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, userProfile: action.response || null };
    case actionTypes.GET_USER_PROFILE_FAILURE:
      return { ...state, isLoading: false, error: action.response || '' };
    default:
      return state;
  }
};

export default getUserProfileReducer;
