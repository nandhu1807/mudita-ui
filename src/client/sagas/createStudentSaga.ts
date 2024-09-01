import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface CreateCompetitionResponse {
  data: any;
}

interface CreateCompetitionPayload {
  createCompetition: {
    name: string;
    date: string;
  };
}

interface AddStudentAction {
  type: typeof actions.ADD_STUDENT;
  payload: CreateCompetitionPayload;
}

const postCreateCompetition = (api: string, payload: CreateCompetitionPayload['createCompetition']) =>
  call(callFetchApi, api, {}, 'POST', payload);

export default function* createStudentSaga(action: AddStudentAction): SagaIterator {
  try {
    const apiEndpoint = constants.createStudent;

    const response: CreateCompetitionResponse = yield postCreateCompetition(
      apiEndpoint,
      action.payload.createCompetition,
    );

    yield put({
      type: actions.ADD_STUDENT_SUCCESS,
      response: response.data,
    });
    yield put({
      type: actions.GET_ALL_STUDENTS,
    });
  } catch (error) {
    yield put({
      type: actions.ADD_STUDENT_FAILURE,
      error: (error as Error).message || 'An error occurred while creating the competition.',
    });
  }
}
