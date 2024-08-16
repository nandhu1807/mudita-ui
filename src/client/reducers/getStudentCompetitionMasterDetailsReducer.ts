import { StudentCompetitionMasterDetailsState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: StudentCompetitionMasterDetailsState = {
  studentCompetitionMasterDetails: [],
  isLoadingDetails: false,
  studentError: '',
};

const getStudentCompetitionMasterDetailsReducer = (
  state = initialState,
  action: Action,
): StudentCompetitionMasterDetailsState => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS:
      return { ...state, isLoadingDetails: true };
    case actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS_SUCCESS:
      return { ...state, isLoadingDetails: false, studentCompetitionMasterDetails: action.response };
    case actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS_FAILURE:
      return { ...state, isLoadingDetails: false, studentError: action.response };
    default:
      return state;
  }
};

export default getStudentCompetitionMasterDetailsReducer;
