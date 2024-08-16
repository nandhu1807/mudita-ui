import React from 'react';
import { Outlet } from 'react-router-dom';
import VerticalTabs from './VerticalTabs';
import '../styles/authenticatedLayout.css';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="authenticated-layout">
      <VerticalTabs />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
