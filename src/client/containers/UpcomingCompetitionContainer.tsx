import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';
import { Competition } from '../reducers/competition';
import MyLoadingComponent from '../components/MyLoadingComponent';
import UpcomingCompetition from '../components/UpcomingCompetition';
import actionTypes from '../utils/actionTypes';

interface UpcomingCompetitionState {
  upcomingCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

const UpcomingCompetitionContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState<'ADMIN' | 'STUDENT' | 'TEACHER' | ''>('');

  const { upcomingCompetition, isLoading, error }: UpcomingCompetitionState = useSelector(
    (state: RootState) => state.upcomingCompetition,
  );

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as 'ADMIN' | 'STUDENT' | 'TEACHER' | '';
    setRole(storedRole);
  }, []);

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_UPCOMING_COMPETITION,
    });
  }, [dispatch]);

  if (isLoading) {
    return <MyLoadingComponent isLoading={isLoading} error={error} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <UpcomingCompetition competitions={upcomingCompetition} role={role} />;
};

export default UpcomingCompetitionContainer;
