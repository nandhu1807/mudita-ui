import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface EndCompetitionResponse {
  data: any;
}

interface EndCompetitionPayload {
  competitionId: string;
  competition: {
    name?: string;
    date?: string;
  };
}

interface EndCompetitionAction {
  type: typeof actions.END_COMPETITION;
  payload: EndCompetitionPayload;
}

const putEndCompetition = (api: string, payload: EndCompetitionPayload['competition']) =>
  call(callFetchApi, api, {}, 'PUT', payload);

export default function* endCompetitionSaga(action: EndCompetitionAction): SagaIterator {
  try {
    let api = constants.endCompetition;
    api = api.replace(':competitionId', action.payload.competitionId);

    const response: EndCompetitionResponse = yield putEndCompetition(api, action.payload.competition);

    yield put({
      type: actions.END_COMPETITION_SUCCESS,
      response: response.data,
    });

    yield put({
      type: actions.GET_CLOSED_COMPETITION,
      payload: {
        role: '',
      },
    });
  } catch (error) {
    yield put({
      type: actions.END_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while ending the competition.',
    });
  }
}
