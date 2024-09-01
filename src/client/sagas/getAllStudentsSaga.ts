import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface GetAllStudentDetailsResponse {
  data: any;
}

interface GetAllStudentDetailsAction {
  type: typeof actions.GET_ALL_STUDENTS;
}

interface GetAllStudentDetailsSuccessAction {
  type: typeof actions.GET_ALL_STUDENTS_SUCCESS;
  response: GetAllStudentDetailsResponse['data'];
}

interface GetAllStudentDetailsFailureAction {
  type: typeof actions.GET_ALL_STUDENTS_FAILURE;
  error: string;
}

export default function* getAllStudentsSaga(action: GetAllStudentDetailsAction): SagaIterator {
  try {
    let api = constants.getAllStudents;
    const response: GetAllStudentDetailsResponse = yield call(callFetchApi, api, {}, 'GET');

    yield put<GetAllStudentDetailsSuccessAction>({
      type: actions.GET_ALL_STUDENTS_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetAllStudentDetailsFailureAction>({
      type: actions.GET_ALL_STUDENTS_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching student list.',
    });
  }
}
