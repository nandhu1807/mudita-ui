import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface UpdatePasswordResponse {
  status?: any;
  data: any;
  response?: any;
}

interface UpdatePasswordPayload {
  updatePassword: {
    name: string;
    date: string;
  };
}

interface AddStudentAction {
  type: typeof actions.ADD_STUDENT;
  payload: UpdatePasswordPayload;
}

const updatePassword = (api: string, payload: UpdatePasswordPayload['updatePassword']) =>
  call(callFetchApi, api, {}, 'POST', payload);

export default function* updatePasswordSaga(action: AddStudentAction): SagaIterator {
  try {
    const apiEndpoint = constants.updatePassword;

    const response: UpdatePasswordResponse = yield updatePassword(
      apiEndpoint,
      action.payload.updatePassword,
    );

    if (response.status === 202) {
      yield put({
        type: actions.UPDATE_PASSWORD_SUCCESS,
        response: response.data,
      });
    } else {
      yield put({
        type: actions.UPDATE_PASSWORD_FAILURE,
        response: response.response.data.message,
      });
    }
  } catch (error) {
    yield put({
      type: actions.UPDATE_PASSWORD_FAILURE,
      error: (error as Error).message || 'An error occurred while updating password',
    });
  }
}
