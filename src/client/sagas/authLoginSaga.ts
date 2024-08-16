import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { callFetchApi } from '../services/api';
import actions from '../utils/actionTypes';
import constants from '../utils/constants';

interface AuthLoginResponse {
  data: any;
}

interface LoginDetails {
  userName: string;
  password: string;
}

interface AuthLoginPayload {
  loginDetails: LoginDetails;
}

interface AuthLoginAction {
  type: typeof actions.AUTH_LOGIN;
  payload: AuthLoginPayload;
}

const postLogin = (api: string, payload: LoginDetails) => call(callFetchApi, api, {}, 'POST', payload);

export default function* authLoginSaga(action: AuthLoginAction): SagaIterator {
  try {
    const apiEndpoint = constants.authLogin;

    const response: AuthLoginResponse = yield postLogin(apiEndpoint, action.payload.loginDetails);
    yield put({
      type: actions.AUTH_LOGIN_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.AUTH_LOGIN_FAILURE,
      error: (error as Error).message || 'An error occurred during login.',
    });
  }
}
