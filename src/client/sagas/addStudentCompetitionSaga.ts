import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface AddStudentCompetitionResponse {
  data: any;
}

interface AddStudentCompetitionPayload {
  createStudentCompetitionRecord: any;
}

interface AddStudentCompetitionAction {
  type: typeof actions.ADD_STUDENT_COMPETITION;
  payload: AddStudentCompetitionPayload;
}

const postStudentCompetition = (api: string, payload: any) => call(callFetchApi, api, {}, 'POST', payload);

export default function* addStudentCompetitionSaga(action: AddStudentCompetitionAction): SagaIterator {
  try {
    const apiEndpoint = constants.addStudentCompetition;

    const response: AddStudentCompetitionResponse = yield postStudentCompetition(
      apiEndpoint,
      action.payload.createStudentCompetitionRecord,
    );
    yield put({
      type: actions.ADD_STUDENT_COMPETITION_SUCCESS,
      response: response.data,
    });

    const userId = localStorage.getItem('studentId');
    if (userId) {
      yield put({
        type: actions.GET_ONGOING_COMPETITION,
        payload: { userId },
      });
    } else {
      console.warn('User ID not found in localStorage');
    }
  } catch (error) {
    yield put({
      type: actions.ADD_STUDENT_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while adding the student competition.',
    });
  }
}
