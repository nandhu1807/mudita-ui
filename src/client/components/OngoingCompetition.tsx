import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';
import actionTypes from '../utils/actionTypes';
import Competitions from './Competitions';
import StudentSubmitDialog from './StudentSubmitDialog';
import CompetitionGradingDialog from './CompetitionGradingDialog';
import CreateCompetition from './CreateCompetition';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Competition } from '../../types';
import Snackbar from './Snackbar';

interface OngoingCompetitionListProps {
  competitions: Competition[];
  role: 'ADMIN' | 'STUDENT' | 'TEACHER' | '';
  userProfile: any;
}

interface StudentCompetitionMasterDetailsState {
  studentCompetitionMasterDetails: any[];
  isLoadingDetails: boolean;
  studentError: string;
}

interface Prize {
  name: string;
}

const prizeList: Prize[] = [
  { name: '1st Prize' },
  { name: '2nd Prize' },
  { name: '3rd Prize' },
  { name: 'Special Mention' },
];

const OngoingCompetition: React.FC<OngoingCompetitionListProps> = ({ competitions, role, userProfile }) => {
  const dispatch = useDispatch();
  const [openCreateCompetitionDialog, setOpenCreateCompetitionDialog] = useState<boolean>(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const { studentCompetitionMasterDetails }: StudentCompetitionMasterDetailsState = useSelector(
    (state: RootState) => state.studentCompetitionMasterDetails,
  );

  useEffect(() => {
    if (role === 'ADMIN' && selectedCompetition) {
      dispatch({
        type: actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS,
        payload: {
          competitionId: selectedCompetition.competitionId,
        },
      });
    }
    if (role === 'TEACHER' && selectedCompetition) {
      dispatch({
        type: actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS,
        payload: {
          competitionId: selectedCompetition.competitionId,
          teacherId: localStorage.getItem('teacherId'),
          type: 'TEACHER',
        },
      });
    }
  }, [dispatch, role, selectedCompetition]);

  const handleOpen = (competition: Competition) => {
    setSelectedCompetition(competition);
  };

  const handleClose = () => {
    setSelectedCompetition(null);
  };

  const handleCreateCompetitionOpenDialog = () => setOpenCreateCompetitionDialog(true);

  const handleCreateCompetitionCloseDialog = (isSave: boolean) => {
    setOpenCreateCompetitionDialog(false);
    if (isSave) {
      setSnackbarOpen(true);
      setSnackbarMessage('Competition created successfully');
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1, width: '100%' }}>
          Active Competitions
        </Typography>
        {role === 'ADMIN' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCompetitionOpenDialog}
            startIcon={<AddIcon />}
            sx={{ whiteSpace: 'nowrap', width: '250px' }}
          >
            Create Competition
          </Button>
        )}
      </Box>
      <CreateCompetition open={openCreateCompetitionDialog} onClose={handleCreateCompetitionCloseDialog} />
      <Competitions competitions={competitions} role={role} type="active" onCompetitionSelect={handleOpen} userProfile={userProfile} />
      {role === 'STUDENT' && selectedCompetition && (
        <StudentSubmitDialog
          type="active"
          open={Boolean(selectedCompetition)}
          onClose={handleClose}
          competition={selectedCompetition}
        />
      )}
      {(role === 'ADMIN' || role === 'TEACHER') && selectedCompetition && (
        <CompetitionGradingDialog
          type="active"
          open={Boolean(selectedCompetition)}
          onClose={handleClose}
          competition={selectedCompetition}
          students={studentCompetitionMasterDetails}
          prizes={prizeList}
          onCancel={handleClose}
        />
      )}
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </div>
  );
};

export default OngoingCompetition;
