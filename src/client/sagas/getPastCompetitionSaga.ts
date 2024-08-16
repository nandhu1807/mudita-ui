import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface PastCompetitionResponse {
  data: any;
}

interface GetPastCompetitionSuccessAction {
  type: typeof actions.GET_PAST_COMPETITION_SUCCESS;
  response: PastCompetitionResponse['data'];
}

interface GetPastCompetitionFailureAction {
  type: typeof actions.GET_PAST_COMPETITION_FAILURE;
  error: string;
}

export default function* getPastCompetitionSaga(): SagaIterator {
  try {
    const api = constants.getUpcomingCompetition;
    const response: PastCompetitionResponse = yield call(callFetchApi, api, { status: 'PAST' }, 'GET');

    yield put<GetPastCompetitionSuccessAction>({
      type: actions.GET_PAST_COMPETITION_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetPastCompetitionFailureAction>({
      type: actions.GET_PAST_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching past competitions.',
    });
  }
}
