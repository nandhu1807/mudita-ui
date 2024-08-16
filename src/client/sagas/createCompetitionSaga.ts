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

interface CreateCompetitionAction {
  type: typeof actions.CREATE_COMPETITION;
  payload: CreateCompetitionPayload;
}

const postCreateCompetition = (api: string, payload: CreateCompetitionPayload['createCompetition']) =>
  call(callFetchApi, api, {}, 'POST', payload);

export default function* createCompetitionSaga(action: CreateCompetitionAction): SagaIterator {
  try {
    const apiEndpoint = constants.createCompetition;

    const response: CreateCompetitionResponse = yield postCreateCompetition(
      apiEndpoint,
      action.payload.createCompetition,
    );

    yield put({
      type: actions.CREATE_COMPETITION_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.CREATE_COMPETITION_FAILURE,
      error: (error as Error).message || 'An error occurred while creating the competition.',
    });
  }
}
