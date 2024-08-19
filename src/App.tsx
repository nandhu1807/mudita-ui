import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginContainer from './client/containers/Login/LoginContainer';
import WhatsNew from './client/components/WhatsNew';
import AuthenticatedLayout from './client/components/AuthenticatedLayout';
import ProtectedRoute from './client/components/ProtectedRoute';
import CompetitionGradingContainer from './client/containers/CompetitionGradingContainer';
import OngoingCompetitionContainer from './client/containers/OngoingCompetitionContainer';
import UpcomingCompetitionContainer from './client/containers/UpcomingCompetitionContainer';
import PastCompetitionContainer from './client/containers/PastCompetitionContainer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginContainer />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/login-credentials" element={<ProtectedRoute element={<WhatsNew />} redirectTo="/" />} />
          <Route path="/student-profile" element={<ProtectedRoute element={<WhatsNew />} redirectTo="/" />} />
          <Route
            path="/competition"
            element={<ProtectedRoute element={<CompetitionGradingContainer />} redirectTo="/" />}
          />
          <Route
            path="/active-competition"
            element={<ProtectedRoute element={<OngoingCompetitionContainer />} redirectTo="/" />}
          />
          <Route
            path="/upcoming-competition"
            element={<ProtectedRoute element={<UpcomingCompetitionContainer />} redirectTo="/" />}
          />
          <Route
            path="/past-competition"
            element={<ProtectedRoute element={<PastCompetitionContainer />} redirectTo="/" />}
          />
          <Route path="/learning" element={<ProtectedRoute element={<WhatsNew />} redirectTo="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
