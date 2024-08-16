import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';
import { Competition } from '../reducers/competition';
import actionTypes from '../utils/actionTypes';
import MyLoadingComponent from '../components/MyLoadingComponent';
import OngoingCompetition from '../components/OngoingCompetition';

interface OngoingCompetitionState {
  ongoingCompetition: Competition[];
  isLoading: boolean;
  error: string;
}

const OngoingCompetitionContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState<'ADMIN' | 'STUDENT' | ''>('');

  const { ongoingCompetition, isLoading, error }: OngoingCompetitionState = useSelector(
    (state: RootState) => state.ongoingCompetition,
  );

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as 'ADMIN' | 'STUDENT' | '';
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('studentId') || '';
    dispatch({
      type: actionTypes.GET_ONGOING_COMPETITION,
      payload: { userId },
    });
  }, [dispatch]);

  if (isLoading) {
    return <MyLoadingComponent isLoading={isLoading} error={error} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <OngoingCompetition competitions={ongoingCompetition} role={role} />;
};

export default OngoingCompetitionContainer;
