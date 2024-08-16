import { combineReducers } from 'redux';
import authLoginReducer from './authLoginReducer';
import getPastCompetitionReducer from './getPastCompetitionReducer';
import getOngoingCompetitionReducer from './getOngoingCompetitionReducer';
import getUpcomingCompetitionReducer from './getUpcomingCompetitionReducer';
import getClosedCompetitionReducer from './getClosedCompetitionReducer';
import getStudentCompetitionMasterDetailsReducer from './getStudentCompetitionMasterDetailsReducer';
import getStudentCompetitionDetailsReducer from './getStudentCompetitionDetailsReducer';

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
  pastCompetition: getPastCompetitionReducer,
  ongoingCompetition: getOngoingCompetitionReducer,
  upcomingCompetition: getUpcomingCompetitionReducer,
  closedCompetition: getClosedCompetitionReducer,
  studentCompetitionMasterDetails: getStudentCompetitionMasterDetailsReducer,
  studentCompetitionDetails: getStudentCompetitionDetailsReducer,
});

export default rootReducer;
