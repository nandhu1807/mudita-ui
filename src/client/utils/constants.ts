export type ApiEndpoints = {
  authLogin: string;
  getUpcomingCompetition: string;
  addStudentCompetition: string;
  getStudentCompetitionMasterDetails: string;
  getStudentCompetitionDetailsByStudentId: string;
  createCompetition: string;
  endCompetition: string;
  getAllStudents: string;
  createStudent: string;
  getUserProfile: string;
  updatePassword: string;
};

const apiConstants: ApiEndpoints = {
  authLogin: '/api/v1/users/login',
  getUpcomingCompetition: '/api/v1/competition',
  addStudentCompetition: '/api/v1/competition/details',
  getStudentCompetitionMasterDetails: '/api/v1/competition/details/:competitionId',
  getStudentCompetitionDetailsByStudentId: '/api/v1/competition/:competitionId/student/:studentId',
  createCompetition: '/api/v1/competition',
  endCompetition: '/api/v1/competition/:competitionId',
  getAllStudents: '/api/v1/users',
  createStudent: '/api/v1/users/create',
  getUserProfile: '/api/v1/users/:userId/:type',
  updatePassword: '/api/v1/users/reset/password',
};

export default apiConstants;
