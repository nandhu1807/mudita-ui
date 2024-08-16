import { ClosedCompetitionsState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any
}

const initialState: ClosedCompetitionsState = {
  closedCompetition: [],
  isLoading: false,
  error: '',
};

const getClosedCompetitionReducer = (state = initialState, action: Action): ClosedCompetitionsState => {
  switch (action.type) {
    case actionTypes.GET_CLOSED_COMPETITION:
      return { ...state, isLoading: true };
    case actionTypes.GET_CLOSED_COMPETITION_SUCCESS:
      return { ...state, isLoading: false, closedCompetition: action.response?.competitions || [] };
    case actionTypes.GET_CLOSED_COMPETITION_FAILURE:
      return { ...state, isLoading: false, error: action.response || '' };
    default:
      return state;
  }
};

export default getClosedCompetitionReducer;
