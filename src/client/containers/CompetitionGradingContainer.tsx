import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/shared/store';
import { Box, Divider, Typography } from '@mui/material';
import { Competition } from '../reducers/competition';
import CompetitionGradingCard from '../components/CompetitionGradingCard';
import CompetitionGradingDialog from '../components/CompetitionGradingDialog';
import actionTypes from '../utils/actionTypes';

interface ClosedCompetitionState {
  closedCompetition: Competition[];
  isLoading: boolean;
  error: string;
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

const CompetitionGradingContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { closedCompetition }: ClosedCompetitionState = useSelector((state: RootState) => state.closedCompetition);
  const { studentCompetitionMasterDetails }: StudentCompetitionMasterDetailsState = useSelector(
    (state: RootState) => state.studentCompetitionMasterDetails,
  );

  useEffect(() => {
    dispatch({ type: actionTypes.GET_CLOSED_COMPETITION });
  }, [dispatch]);

  const handleCompetitionClick = (competition: Competition) => {
    setSelectedCompetition(competition);
    setOpenDialog(true);
    dispatch({
      type: actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS,
      payload: { competitionId: competition.competitionId },
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Competition Grading Screen
        </Typography>
      </Box>
      <Divider sx={{ mt: 3, mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <CompetitionGradingCard competitions={closedCompetition} onClick={handleCompetitionClick} />
      </Box>
      {closedCompetition.length === 0 && (
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }} mt={3}>
          No Competitions available at the moment
        </Typography>
      )}
      {selectedCompetition && (
        <CompetitionGradingDialog
          type="other"
          open={openDialog}
          onClose={handleDialogClose}
          competition={selectedCompetition}
          students={studentCompetitionMasterDetails}
          prizes={prizeList}
          onCancel={handleDialogClose}
        />
      )}
    </Box>
  );
};

export default CompetitionGradingContainer;
