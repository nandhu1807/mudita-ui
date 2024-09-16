import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import actionTypes from '../utils/actionTypes';
import Snackbar from "./Snackbar";

interface Competition {
  competitionId: number;
  title: string;
  status: string;
}

interface Student {
  competitionDetailsId: string;
  id: string;
  batchId: string;
  studentName: string;
  studentFile: string;
  studentComments: string;
  studentGrade: string;
  teacherComments: string;
  evaluatorComments: string;
  evaluatedBy?: string;
  prizeName: string;
  prizeAssigned: string;
  rating?: string;
}

interface Prize {
  name: string;
}

interface GradingCompetitionDialogProps {
  type: 'active' | 'past' | 'other';
  open: boolean;
  onClose: () => void;
  competition: Competition;
  students: Student[];
  prizes: Prize[];
  onCancel: () => void;
}

const tableCellStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
};

const tableCellValueStyle = {
  textAlign: 'center',
};

const CompetitionGradingDialog: React.FC<GradingCompetitionDialogProps> = ({
  type,
  open,
  onClose,
  competition,
  students,
  prizes,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [gradingData, setGradingData] = useState<Student[]>(students);
  const [role, setRole] = useState<'ADMIN' | 'STUDENT' | 'TEACHER' | ''>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as 'ADMIN' | 'STUDENT' | 'TEACHER' | null;
    setRole(storedRole ?? 'STUDENT');
  }, [dispatch, role]);

  useEffect(() => {
    setGradingData(
      students.map((student) => ({
        ...student,
        rating: student.studentGrade,
        evaluatorComments: student.teacherComments,
        prizeAssigned: student.prizeName,
      })),
    );
  }, [students]);

  const handleRatingChange = (studentId: string, newRating: string) => {
    setGradingData((prevData) =>
      prevData.map((item) => (item.competitionDetailsId === studentId ? { ...item, rating: newRating } : item)),
    );
  };

  const handleCommentsChange = (studentId: string, newComments: string) => {
    setGradingData((prevData) =>
      prevData.map((item) =>
        item.competitionDetailsId === studentId ? { ...item, evaluatorComments: newComments } : item,
      ),
    );
  };

  const handlePrizeChange = (studentId: string, event: SelectChangeEvent<string>) => {
    const selectedPrize = event.target.value;
    setGradingData((prevData) =>
      prevData.map((item) =>
        item.competitionDetailsId === studentId ? { ...item, prizeAssigned: selectedPrize } : item,
      ),
    );
  };

  const handleSaveForRow = (studentId: string) => {
    const studentData = gradingData.find((data) => data.competitionDetailsId === studentId);
    if (studentData) {
      let teacherId = null;
      if (role === 'TEACHER')
        teacherId = localStorage.getItem('teacherId')
      dispatch({
        type: actionTypes.UPDATE_STUDENT_COMPETITION,
        payload: {
          updateStudentCompetitionRecord: {
            competitionId: competition.competitionId,
            competitionDetailsId: studentId,
            teacherId: teacherId,
            studentGrade: studentData.rating,
            teacherComments: studentData.evaluatorComments,
            prizeName: studentData.prizeAssigned,
          },
        },
      });
      setSnackbarMessage('Student ratings saved successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleEndCompetition = () => {
    dispatch({
      type: actionTypes.END_COMPETITION,
      payload: {
        competitionId: competition.competitionId,
        competition: { ...competition, status: 'PAST' },
      },
    });
    onClose();
  };

  const isSaveDisabled = (student: Student) => {
    if (role === 'TEACHER')
      return !(student.evaluatorComments && student.rating);
    if (role === 'ADMIN')
      return !(student.evaluatorComments && student.rating && student.prizeAssigned);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
        {competition.title}
      </DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
        sx={{ position: 'absolute', right: 24, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellStyle}>Batch Name</TableCell>
                <TableCell sx={tableCellStyle}>Student Name</TableCell>
                <TableCell sx={tableCellStyle} style={{ width: '10%' }}>
                  File
                </TableCell>
                <TableCell sx={tableCellStyle}>Student Comments</TableCell>
                {type !== 'active' && <TableCell sx={tableCellStyle}>Evaluator Comments</TableCell>}
                {type !== 'active' && <TableCell sx={tableCellStyle}>Rating</TableCell>}
                {type !== 'active' && role === 'ADMIN' && <TableCell sx={tableCellStyle}>Evaluated By</TableCell>}
                {type !== 'active' && role === 'ADMIN' && <TableCell sx={tableCellStyle}>Prize Assigned</TableCell>}
                {type !== 'past' && type !== 'active' && <TableCell sx={tableCellStyle}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {gradingData.map((student) => (
                <TableRow key={student.competitionDetailsId}>
                  <TableCell sx={tableCellValueStyle}>{student.batchId}</TableCell>
                  <TableCell sx={tableCellValueStyle}>{student.studentName}</TableCell>
                  <TableCell sx={tableCellValueStyle} style={{ width: '10%' }}>
                    {student.studentFile ? (
                      <a href={student.studentFile} target="_blank" rel="noopener noreferrer">
                        {student.studentFile}
                      </a>
                    ) : (
                      'No File'
                    )}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>{student.studentComments}</TableCell>
                  {type !== 'active' && (
                    <TableCell sx={tableCellValueStyle}>
                      <TextField
                        fullWidth
                        multiline
                        value={student.evaluatorComments || ''}
                        onChange={(e) => handleCommentsChange(student.competitionDetailsId, e.target.value)}
                        disabled={type === 'past'}
                      />
                    </TableCell>
                  )}
                  {type !== 'active' && (
                    <TableCell sx={tableCellValueStyle}>
                      <TextField
                        type="number"
                        inputProps={{ min: 1, max: 10 }}
                        value={student.rating || ''}
                        onChange={(e) => handleRatingChange(student.competitionDetailsId, e.target.value)}
                        disabled={type === 'past'}
                      />
                    </TableCell>
                  )}
                  {type !== 'active' && role === 'ADMIN' && (
                      <TableCell sx={tableCellValueStyle}>
                        <TextField
                            fullWidth
                            multiline
                            value={student.evaluatedBy || ''}
                            disabled
                        />
                      </TableCell>
                  )}
                  {type !== 'active' && role === 'ADMIN' && (
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>Prize Assigned</InputLabel>
                        <Select
                          value={student.prizeAssigned || ''}
                          disabled={type === 'past'}
                          onChange={(event) => handlePrizeChange(student.competitionDetailsId, event)}
                          label="Prize Assigned"
                        >
                          {prizes.map((prize) => (
                            <MenuItem key={prize.name} value={prize.name}>
                              {prize.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  )}
                  {type !== 'past' && type !== 'active' && (
                    <TableCell sx={tableCellValueStyle}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isSaveDisabled(student)}
                        onClick={() => handleSaveForRow(student.competitionDetailsId)}
                      >
                        Save
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {gradingData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ textAlign: 'center', mt: 3, fontWeight: 'bold' }}
                    >
                      No records found !!!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            padding: 2,
            position: 'relative',
            bottom: 0,
            width: '100%',
            backgroundColor: 'background.paper',
          }}
        >
          {type !== 'past' && type !== 'active' && role === 'ADMIN' && (
            <Button variant="contained" color="error" onClick={handleEndCompetition} sx={{ width: '200px' }}>
              End Competition
            </Button>
          )}
        </Box>
      </DialogContent>
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </Dialog>
  );
};

export default CompetitionGradingDialog;
