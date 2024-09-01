import { StudentMasterListState } from './types';
import actionTypes from '../utils/actionTypes';

interface Action {
  type: string;
  response?: any;
}

const initialState: StudentMasterListState = {
  studentList: [],
  isLoading: false,
  error: '',
};

const getAllStudentReducer = (state = initialState, action: Action): StudentMasterListState => {
  switch (action.type) {
    case actionTypes.GET_ALL_STUDENTS:
      return { ...state, isLoading: true };
    case actionTypes.GET_ALL_STUDENTS_SUCCESS:
      return { ...state, isLoading: false, studentList: action.response || [] };
    case actionTypes.GET_ALL_STUDENTS_FAILURE:
      return { ...state, isLoading: false, error: action.response || '' };
    default:
      return state;
  }
};

export default getAllStudentReducer;
