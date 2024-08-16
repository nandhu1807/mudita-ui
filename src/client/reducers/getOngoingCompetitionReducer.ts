import { OngoingCompetitionsState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: OngoingCompetitionsState = {
  ongoingCompetition: [],
  isLoading: false,
  error: '',
};

const getOngoingCompetitionReducer = (state = initialState, action: Action): OngoingCompetitionsState => {
  switch (action.type) {
    case actionTypes.GET_ONGOING_COMPETITION:
      return { ...state, isLoading: true };
    case actionTypes.GET_ONGOING_COMPETITION_SUCCESS:
      return { ...state, isLoading: false, ongoingCompetition: action.response?.competitions || [] };
    case actionTypes.GET_ONGOING_COMPETITION_FAILURE:
      return { ...state, isLoading: false, error: action.response || '' };
    default:
      return state;
  }
};

export default getOngoingCompetitionReducer;
