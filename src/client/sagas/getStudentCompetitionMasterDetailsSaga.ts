import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface StudentCompetitionMasterDetailsResponse {
  data: any;
}

interface GetStudentCompetitionMasterDetailsAction {
  type: typeof actions.GET_STUDENT_COMPETITION_MASTER_DETAILS;
  payload: {
    competitionId: string;
  };
}

interface GetStudentCompetitionMasterDetailsSuccessAction {
  type: typeof actions.GET_STUDENT_COMPETITION_MASTER_DETAILS_SUCCESS;
  response: StudentCompetitionMasterDetailsResponse['data'];
}

interface GetStudentCompetitionMasterDetailsFailureAction {
  type: typeof actions.GET_STUDENT_COMPETITION_MASTER_DETAILS_FAILURE;
  error: string;
}

export default function* getStudentCompetitionMasterDetailsSaga(
  action: GetStudentCompetitionMasterDetailsAction,
): SagaIterator {
  try {
    let api = constants.getStudentCompetitionMasterDetails;
    api = api.replace(':competitionId', action.payload.competitionId);

    const response: StudentCompetitionMasterDetailsResponse = yield call(callFetchApi, api, {}, 'GET');

    yield put<GetStudentCompetitionMasterDetailsSuccessAction>({
      type: actions.GET_STUDENT_COMPETITION_MASTER_DETAILS_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetStudentCompetitionMasterDetailsFailureAction>({
      type: actions.GET_STUDENT_COMPETITION_MASTER_DETAILS_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching student competition master details.',
    });
  }
}
