import { takeLatest } from 'redux-saga/effects';
import actions from '../utils/actionTypes';
import authLoginSaga from './authLoginSaga';
import getPastCompetitionSaga from './getPastCompetitionSaga';
import getOngoingCompetitionSaga from './getOngoingCompetitionSaga';
import getUpcomingCompetitionSaga from './getUpcomingCompetitionSaga';
import getClosedCompetitionSaga from './getClosedCompetitionSaga';
import addStudentCompetitionSaga from './addStudentCompetitionSaga';
import updateStudentCompetitionDetailsSaga from './updateStudentCompetitionDetailsSaga';
import getStudentCompetitionMasterDetailsSaga from './getStudentCompetitionMasterDetailsSaga';
import getStudentCompetitionDetailsSaga from './getStudentCompetitionDetailsSaga';
import createCompetitionSaga from './createCompetitionSaga';
import endCompetitionSaga from './endCompetitionSaga';
import getAllStudentsSaga from './getAllStudentsSaga';
import createStudentSaga from './createStudentSaga';
import getUserProfileSaga from './getUserProfileSaga';
import updatePasswordSaga from './updatePasswordSaga';

export default function* rootSaga() {
  yield takeLatest(actions.AUTH_LOGIN, authLoginSaga);
  yield takeLatest(actions.GET_PAST_COMPETITION, getPastCompetitionSaga);
  yield takeLatest(actions.GET_ONGOING_COMPETITION, getOngoingCompetitionSaga);
  yield takeLatest(actions.GET_UPCOMING_COMPETITION, getUpcomingCompetitionSaga);
  yield takeLatest(actions.GET_CLOSED_COMPETITION, getClosedCompetitionSaga);
  yield takeLatest(actions.ADD_STUDENT_COMPETITION, addStudentCompetitionSaga);
  yield takeLatest(actions.UPDATE_STUDENT_COMPETITION, updateStudentCompetitionDetailsSaga);
  yield takeLatest(actions.GET_STUDENT_COMPETITION_MASTER_DETAILS, getStudentCompetitionMasterDetailsSaga);
  yield takeLatest(actions.GET_STUDENT_COMPETITION_DETAILS, getStudentCompetitionDetailsSaga);
  yield takeLatest(actions.CREATE_COMPETITION, createCompetitionSaga);
  yield takeLatest(actions.END_COMPETITION, endCompetitionSaga);
  yield takeLatest(actions.GET_ALL_STUDENTS, getAllStudentsSaga);
  yield takeLatest(actions.ADD_STUDENT, createStudentSaga);
  yield takeLatest(actions.GET_USER_PROFILE, getUserProfileSaga);
  yield takeLatest(actions.UPDATE_PASSWORD, updatePasswordSaga);
}
