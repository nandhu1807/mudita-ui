import { StudentCompetitionDetailsState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: StudentCompetitionDetailsState = {
  studentCompetitionDetails: null,
  isLoading: false,
  error: '',
};

const getStudentCompetitionDetailsReducer = (state = initialState, action: Action): StudentCompetitionDetailsState => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_COMPETITION_DETAILS:
      return { ...state, isLoading: true };
    case actionTypes.GET_STUDENT_COMPETITION_DETAILS_SUCCESS:
      return { ...state, isLoading: false, studentCompetitionDetails: action.response };
    case actionTypes.GET_STUDENT_COMPETITION_DETAILS_FAILURE:
      return { ...state, isLoading: false, error: action.response };
    case actionTypes.CLEAR_STUDENT_COMPETITION_DETAILS:
      return { ...state, isLoading: false, studentCompetitionDetails: null, error: '' };
    default:
      return state;
  }
};

export default getStudentCompetitionDetailsReducer;
