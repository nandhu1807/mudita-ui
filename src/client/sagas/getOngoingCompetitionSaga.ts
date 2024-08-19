import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface OngoingCompetitionResponse {
  data: any;
}

interface GetOngoingCompetitionAction {
  type: typeof actions.GET_ONGOING_COMPETITION;
  payload: {
    userId: string;
  };
}

interface GetOngoingCompetitionSuccessAction {
  type: typeof actions.GET_ONGOING_COMPETITION_SUCCESS;
  response: OngoingCompetitionResponse['data'];
}

interface GetOngoingCompetitionFailureAction {
  type: typeof actions.GET_ONGOING_COMPETITION_FAILURE;
  error: string;
}

export default function* getOngoingCompetitionSaga(action: GetOngoingCompetitionAction): SagaIterator {
  try {
    const api = constants.getUpcomingCompetition;
    console.log(action.payload);
    const response: OngoingCompetitionResponse = yield call(
      callFetchApi,
      api,
      { status: 'PRESENT', userId: action.payload.userId },
      'GET',
    );

    yield put<GetOngoingCompetitionSuccessAction>({
      type: actions.GET_ONGOING_COMPETITION_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetOngoingCompetitionFailureAction>({
      type: actions.GET_ONGOING_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching ongoing competitions.',
    });
  }
}
