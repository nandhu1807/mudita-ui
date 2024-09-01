import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Competition } from '../../types';
import { RootState } from '../utils/shared/store';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CompetitionGradingDialog from './CompetitionGradingDialog';
import Competitions from './Competitions';
import actionTypes from '../utils/actionTypes';
import CloseIcon from '@mui/icons-material/Close';

interface PastCompetitionListProps {
  competitions: Competition[];
  role: 'ADMIN' | 'STUDENT' | 'TEACHER' | '';
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

const tableCellStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
};

const tableCellValueStyle = {
  textAlign: 'center',
};

const PastCompetition: React.FC<PastCompetitionListProps> = ({ competitions, role }) => {
  const dispatch = useDispatch();
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const { studentCompetitionMasterDetails }: StudentCompetitionMasterDetailsState = useSelector(
    (state: RootState) => state.studentCompetitionMasterDetails,
  );

  useEffect(() => {
    if ((role === 'ADMIN' || role === 'TEACHER') && selectedCompetition) {
      dispatch({
        type: actionTypes.GET_STUDENT_COMPETITION_MASTER_DETAILS,
        payload: {
          competitionId: selectedCompetition.competitionId,
        },
      });
    }
  }, [dispatch, role, selectedCompetition]);

  const handleOpen = (competition: Competition) => setSelectedCompetition(competition);
  const handleClose = () => setSelectedCompetition(null);

  const renderResultsTable = (handleClose: any) => (
    <TableContainer component={Paper}>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{ position: 'absolute', right: 24, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyle}>Batch Id</TableCell>
            <TableCell sx={tableCellStyle}>Student Name</TableCell>
            <TableCell sx={tableCellStyle}>Position</TableCell>
            <TableCell sx={tableCellStyle}>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedCompetition?.prize.length ? (
            selectedCompetition.prize.map((result, index) => (
              <TableRow key={index}>
                <TableCell sx={tableCellValueStyle}>{result.batchId}</TableCell>
                <TableCell sx={tableCellValueStyle}>{result.studentName}</TableCell>
                <TableCell sx={tableCellValueStyle}>{result.prizeName}</TableCell>
                <TableCell sx={tableCellValueStyle}>{result.teacherComments}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={tableCellStyle}>
                No results available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1, width: '100%' }}>
          Past Competitions
        </Typography>
      </Box>
      <Competitions competitions={competitions} type="past" role={role} onCompetitionSelect={handleOpen} userProfile={null} />
      {role === 'STUDENT' && selectedCompetition && (
        <Dialog open={true} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {selectedCompetition.title} - Results
          </DialogTitle>
          <DialogContent>{renderResultsTable(handleClose)}</DialogContent>
        </Dialog>
      )}
      {(role === 'ADMIN' || role === 'TEACHER') && selectedCompetition && (
        <CompetitionGradingDialog
          type="past"
          open={true}
          onClose={handleClose}
          competition={selectedCompetition}
          students={studentCompetitionMasterDetails}
          prizes={prizeList}
          onCancel={handleClose}
        />
      )}
    </div>
  );
};

export default PastCompetition;
