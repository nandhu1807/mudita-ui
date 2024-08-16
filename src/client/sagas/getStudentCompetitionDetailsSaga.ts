import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface StudentCompetitionDetailsResponse {
  data: any;
}

interface GetStudentCompetitionDetailsAction {
  type: typeof actions.GET_STUDENT_COMPETITION_DETAILS;
  payload: {
    competitionId: string;
    studentId: string;
  };
}

interface GetStudentCompetitionDetailsSuccessAction {
  type: typeof actions.GET_STUDENT_COMPETITION_DETAILS_SUCCESS;
  response: StudentCompetitionDetailsResponse['data'];
}

interface GetStudentCompetitionDetailsFailureAction {
  type: typeof actions.GET_STUDENT_COMPETITION_DETAILS_FAILURE;
  error: string;
}

export default function* getStudentCompetitionDetailsSaga(action: GetStudentCompetitionDetailsAction): SagaIterator {
  try {
    let api = constants.getStudentCompetitionDetailsByStudentId;
    api = api.replace(':competitionId', action.payload.competitionId);
    api = api.replace(':studentId', action.payload.studentId);

    const response: StudentCompetitionDetailsResponse = yield call(callFetchApi, api, {}, 'GET');

    yield put<GetStudentCompetitionDetailsSuccessAction>({
      type: actions.GET_STUDENT_COMPETITION_DETAILS_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetStudentCompetitionDetailsFailureAction>({
      type: actions.GET_STUDENT_COMPETITION_DETAILS_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching student competition details.',
    });
  }
}
