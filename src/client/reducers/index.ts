import { combineReducers } from 'redux';
import authLoginReducer from './authLoginReducer';
import getPastCompetitionReducer from './getPastCompetitionReducer';
import getOngoingCompetitionReducer from './getOngoingCompetitionReducer';
import getUpcomingCompetitionReducer from './getUpcomingCompetitionReducer';
import getClosedCompetitionReducer from './getClosedCompetitionReducer';
import getStudentCompetitionMasterDetailsReducer from './getStudentCompetitionMasterDetailsReducer';
import getStudentCompetitionDetailsReducer from './getStudentCompetitionDetailsReducer';
import getAllStudentReducer from './getAllStudentReducer';
import getUserProfileReducer from './getUserProfileReducer';

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
  pastCompetition: getPastCompetitionReducer,
  ongoingCompetition: getOngoingCompetitionReducer,
  upcomingCompetition: getUpcomingCompetitionReducer,
  closedCompetition: getClosedCompetitionReducer,
  studentCompetitionMasterDetails: getStudentCompetitionMasterDetailsReducer,
  studentCompetitionDetails: getStudentCompetitionDetailsReducer,
  getAllStudents: getAllStudentReducer,
  getUserProfile: getUserProfileReducer,
});

export default rootReducer;
