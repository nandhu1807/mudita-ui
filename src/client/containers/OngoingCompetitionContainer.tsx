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
  const [role, setRole] = useState<'ADMIN' | 'STUDENT' | 'TEACHER' | ''>('');

  const { ongoingCompetition, isLoading, error }: OngoingCompetitionState = useSelector(
    (state: RootState) => state.ongoingCompetition,
  );
  const { userProfile }: any = useSelector((state: RootState) => state.getUserProfile);

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as 'ADMIN' | 'STUDENT' | 'TEACHER' | '';
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (role === 'TEACHER') {
      const teacherId = localStorage.getItem('teacherId');
      dispatch({
        type: actionTypes.GET_ONGOING_COMPETITION,
        payload: { userId: teacherId },
      });
    } else if (role !== '') {
      const studentId = localStorage.getItem('studentId') || '';
      dispatch({
        type: actionTypes.GET_ONGOING_COMPETITION,
        payload: { userId: studentId },
      });
    }
  }, [dispatch, role]);

  useEffect(() => {
      dispatch({
        type: actionTypes.GET_USER_PROFILE,
        payload: {
          userId: localStorage.getItem('userId'),
          type: localStorage.getItem('role'),
        },
      });
  }, [dispatch]);

  if (isLoading) {
    return <MyLoadingComponent isLoading={isLoading} error={error} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <OngoingCompetition competitions={ongoingCompetition} role={role} userProfile={userProfile} />;
};

export default OngoingCompetitionContainer;
