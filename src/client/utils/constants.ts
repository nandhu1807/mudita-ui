export type ApiEndpoints = {
  authLogin: string;
  getUpcomingCompetition: string;
  addStudentCompetition: string;
  getStudentCompetitionMasterDetails: string;
  getStudentCompetitionDetailsByStudentId: string;
  createCompetition: string;
  endCompetition: string;
};

const apiConstants: ApiEndpoints = {
  authLogin: '/api/v1/users/login',
  getUpcomingCompetition: '/api/v1/competition',
  addStudentCompetition: '/api/v1/competition/details',
  getStudentCompetitionMasterDetails: '/api/v1/competition/details/:competitionId',
  getStudentCompetitionDetailsByStudentId: '/api/v1/competition/:competitionId/student/:studentId',
  createCompetition: '/api/v1/competition',
  endCompetition: '/api/v1/competition/:competitionId',
};

export default apiConstants;
