import { UpcomingCompetitionsState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: UpcomingCompetitionsState = {
  upcomingCompetition: [],
  isLoading: false,
  error: '',
};

const getUpcomingCompetitionReducer = (state = initialState, action: Action): UpcomingCompetitionsState => {
  switch (action.type) {
    case actionTypes.GET_UPCOMING_COMPETITION:
      return { ...state, isLoading: true };
    case actionTypes.GET_UPCOMING_COMPETITION_SUCCESS:
      return { ...state, isLoading: false, upcomingCompetition: action.response?.competitions || [] };
    case actionTypes.GET_UPCOMING_COMPETITION_FAILURE:
      return { ...state, isLoading: false, error: action.response || '' };
    default:
      return state;
  }
};

export default getUpcomingCompetitionReducer;
