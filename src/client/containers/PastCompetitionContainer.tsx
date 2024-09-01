import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';
import { Competition } from '../reducers/competition';
import MyLoadingComponent from '../components/MyLoadingComponent';
import PastCompetition from '../components/PastCompetition';
import actionTypes from '../utils/actionTypes';

interface PastCompetitionState {
  pastCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

const PastCompetitionContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState<'ADMIN' | 'STUDENT' | 'TEACHER' | ''>('');

  const { pastCompetition, isLoading, error }: PastCompetitionState = useSelector(
    (state: RootState) => state.pastCompetition,
  );

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as 'ADMIN' | 'STUDENT' | 'TEACHER' | '';
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (role) {
      dispatch({ type: actionTypes.GET_PAST_COMPETITION });
    }
  }, [dispatch, role]);

  if (isLoading) {
    return <MyLoadingComponent isLoading={isLoading} error={error} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <PastCompetition competitions={pastCompetition} role={role} />;
};

export default PastCompetitionContainer;
