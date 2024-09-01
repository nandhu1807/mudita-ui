import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface GetUserProfileResponse {
  data: any;
}

interface GetUserProfileAction {
  type: typeof actions.GET_USER_PROFILE;
  payload: {
    userId: string;
    type: string;
  };
}

interface GetUserProfileSuccessAction {
  type: typeof actions.GET_ONGOING_COMPETITION_SUCCESS;
  response: GetUserProfileResponse['data'];
}

interface GetUserProfileFailureAction {
  type: typeof actions.GET_ONGOING_COMPETITION_FAILURE;
  error: string;
}

export default function* getUserProfileSaga(action: GetUserProfileAction): SagaIterator {
  try {
    let api = constants.getUserProfile;
    api = api.replace(':userId', action.payload.userId);
    api = api.replace(':type', action.payload.type);
    const response: GetUserProfileResponse = yield call(callFetchApi, api, {}, 'GET');

    yield put<GetUserProfileSuccessAction>({
      type: actions.GET_USER_PROFILE_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put<GetUserProfileFailureAction>({
      type: actions.GET_USER_PROFILE_FAILURE,
      error: (error as Error).message || 'An error occurred while fetching ongoing competitions.',
    });
  }
}
