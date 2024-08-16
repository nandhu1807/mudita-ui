import { PastCompetitionsState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: PastCompetitionsState = {
  pastCompetition: [],
  isLoading: false,
  error: '',
};

const getPastCompetitionReducer = (state = initialState, action: Action): PastCompetitionsState => {
  switch (action.type) {
    case actionTypes.GET_PAST_COMPETITION:
      return { ...state, isLoading: true };
    case actionTypes.GET_PAST_COMPETITION_SUCCESS:
      return { ...state, isLoading: false, pastCompetition: action.response?.competitions || [] };
    case actionTypes.GET_PAST_COMPETITION_FAILURE:
      return { ...state, isLoading: false, error: action.response || '' };
    default:
      return state;
  }
};

export default getPastCompetitionReducer;
