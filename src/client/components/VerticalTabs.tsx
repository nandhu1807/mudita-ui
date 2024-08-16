import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../styles/verticalTabs.css';

const roleBasedTabs = {
  ADMIN: [
    { label: 'Login Credentials', path: '/login-credentials', disabled: true },
    { label: 'Competition Grading', path: '/competition', disabled: false },
    { label: 'Active Competitions', path: '/active-competition', disabled: false },
    { label: 'Upcoming Competitions', path: '/upcoming-competition', disabled: false },
    { label: 'Past Competitions', path: '/past-competition', disabled: false },
    { label: 'Announcements', path: '/announcements', disabled: true },
    { label: 'Repository', path: '/repository', disabled: true },
  ],
  STUDENT: [
    { label: 'Marquee of What’s New', path: '/whats-new', disabled: true },
    { label: 'Student Profile', path: '/student-profile', disabled: true },
    { label: 'Discussion Forum', path: '/discussion', disabled: true },
    { label: 'Active Competitions', path: '/active-competition', disabled: false },
    { label: 'Upcoming Competitions', path: '/upcoming-competition', disabled: false },
    { label: 'Past Competitions', path: '/past-competition', disabled: false },
    { label: 'Learning Repository', path: '/learning', disabled: true },
  ],
};

const VerticalTabs: React.FC = () => {
  const location = useLocation();
  const [role, setRole] = useState<'ADMIN' | 'STUDENT'>('STUDENT');
  const [userName, setUserName] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as 'ADMIN' | 'STUDENT' | null;
    setRole(storedRole ?? 'STUDENT');
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') as string;
    setUserName(storedUserName);
  }, []);

  useEffect(() => {
    const getTabIndex = (path: string) => {
      const tabs = roleBasedTabs[role];
      return tabs.findIndex((tab) => path.includes(tab.path));
    };

    setSelectedTab(getTabIndex(location.pathname));
  }, [role, location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const tabs = roleBasedTabs[role];

  return (
    <Box
      sx={{
        display: 'inline-block',
        height: '100vh',
        backgroundColor: 'rgba(28,44,90)',
        color: '#fff',
        width: '250px',
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box className={'sidebarHeader'}>
          <Typography variant="h6" className={'title'}>
            Mudita
          </Typography>
          <Typography variant="subtitle1" className={'subtitle'}>
            School of Music
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            p: 3,
            paddingTop: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
            {userName}
          </Typography>
          <Typography variant="subtitle1" mt={1} sx={{ textTransform: 'capitalize' }}>
            {role}
          </Typography>
        </Box>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            color: '#fff',
            '& .MuiTabs-indicator': {
              backgroundColor: '#ff6b6b',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className="tab-title"
              label={tab.label}
              component={Link}
              to={tab.path}
              disabled={tab.disabled}
              sx={{ alignItems: 'flex-start' }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default VerticalTabs;
