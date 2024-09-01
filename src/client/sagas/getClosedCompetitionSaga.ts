import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface ClosedCompetitionResponse {
  data: any;
}

interface GetClosedCompetitionAction {
  type: typeof actions.GET_CLOSED_COMPETITION;
  payload: {
    status: string;
    role: string;
  };
}

interface GetClosedCompetitionSuccessAction {
  type: typeof actions.GET_CLOSED_COMPETITION_SUCCESS;
  response: ClosedCompetitionResponse['data'];
}

interface GetClosedCompetitionFailureAction {
  type: typeof actions.GET_CLOSED_COMPETITION_FAILURE;
  error: string;
}

export default function* getClosedCompetitionSaga(action: GetClosedCompetitionAction): SagaIterator {
  try {
    const api = constants.getUpcomingCompetition;
    const response: ClosedCompetitionResponse = yield call(callFetchApi, api, { status: 'CLOSED', type: action.payload.role }, 'GET');

    yield put<GetClosedCompetitionSuccessAction>({
      type: actions.GET_CLOSED_COMPETITION_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetClosedCompetitionFailureAction>({
      type: actions.GET_CLOSED_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching closed competitions.',
    });
  }
}
