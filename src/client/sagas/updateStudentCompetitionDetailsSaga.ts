import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface UpdateStudentCompetitionResponse {
  data: any;
}

interface UpdateStudentCompetitionDetailsAction {
  type: typeof actions.UPDATE_STUDENT_COMPETITION;
  payload: {
    updateStudentCompetitionRecord: {
      competitionId: string;
    };
  };
}

interface UpdateStudentCompetitionSuccessAction {
  type: typeof actions.UPDATE_STUDENT_COMPETITION_SUCCESS;
  response: UpdateStudentCompetitionResponse['data'];
}

interface UpdateStudentCompetitionFailureAction {
  type: typeof actions.UPDATE_STUDENT_COMPETITION_FAILURE;
  error: string;
}

export default function* updateStudentCompetitionDetailsSaga(
  action: UpdateStudentCompetitionDetailsAction,
): SagaIterator {
  try {
    const api = constants.addStudentCompetition;
    const response: UpdateStudentCompetitionResponse = yield call(
      callFetchApi,
      api,
      {},
      'PUT',
      action.payload.updateStudentCompetitionRecord,
    );

    yield put<UpdateStudentCompetitionSuccessAction>({
      type: actions.UPDATE_STUDENT_COMPETITION_SUCCESS,
      response: response.data,
    });

    yield put({
      type: actions.GET_STUDENT_COMPETITION_MASTER_DETAILS,
      payload: {
        competitionId: action.payload.updateStudentCompetitionRecord.competitionId,
      },
    });
  } catch (error) {
    yield put<UpdateStudentCompetitionFailureAction>({
      type: actions.UPDATE_STUDENT_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while updating student competition details.',
    });
  }
}
