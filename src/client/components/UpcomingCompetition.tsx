import React, { useState } from 'react';
import Competitions from './Competitions';
import { Competition } from '../../types';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateCompetition from './CreateCompetition';

interface UpcomingCompetitionProps {
  competitions: Competition[];
  role: 'STUDENT' | 'ADMIN' | 'TEACHER' | '';
}

const UpcomingCompetition: React.FC<UpcomingCompetitionProps> = ({ competitions, role }) => {
  const [isCreateCompetitionDialogOpen, setIsCreateCompetitionDialogOpen] = useState<boolean>(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const handleOpenCompetition = (competition: Competition) => setSelectedCompetition(competition);

  const handleOpenCreateCompetitionDialog = () => setIsCreateCompetitionDialogOpen(true);
  const handleCloseCreateCompetitionDialog = () => setIsCreateCompetitionDialogOpen(false);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Upcoming Competitions
        </Typography>
        {role === 'ADMIN' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateCompetitionDialog}
            startIcon={<AddIcon />}
            sx={{ whiteSpace: 'nowrap', width: '250px' }}
          >
            Create Competition
          </Button>
        )}
      </Box>
      <CreateCompetition open={isCreateCompetitionDialogOpen} onClose={handleCloseCreateCompetitionDialog} />
      <Competitions competitions={competitions} type="upcoming" role={role} onCompetitionSelect={handleOpenCompetition} userProfile={null} />
    </div>
  );
};

export default UpcomingCompetition;
