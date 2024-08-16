import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface UpcomingCompetitionResponse {
  data: any;
}

interface GetUpcomingCompetitionSuccessAction {
  type: typeof actions.GET_UPCOMING_COMPETITION_SUCCESS;
  response: UpcomingCompetitionResponse['data'];
}

interface GetUpcomingCompetitionFailureAction {
  type: typeof actions.GET_UPCOMING_COMPETITION_FAILURE;
  error: string;
}

export default function* getUpcomingCompetitionSaga(): SagaIterator {
  try {
    const api = constants.getUpcomingCompetition;
    const response: UpcomingCompetitionResponse = yield call(callFetchApi, api, { status: 'FUTURE' }, 'GET',);

    yield put<GetUpcomingCompetitionSuccessAction>({
      type: actions.GET_UPCOMING_COMPETITION_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetUpcomingCompetitionFailureAction>({
      type: actions.GET_UPCOMING_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching upcoming competitions.',
    });
  }
}
