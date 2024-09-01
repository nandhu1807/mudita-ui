import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '../utils/shared/store';
import moment from 'moment';
import actionTypes from '../utils/actionTypes';
import thumbnail from '../images/thumbnail-image.png';
import Snackbar from './Snackbar';

interface CompetitionDetails {
  competitionId?: number;
  title: string;
  startDate: string;
  endDate: string;
  courseList?: any;
  descriptionText: string;
  image?: string;
  videoFiles?: string;
  isUserEnrolled?: boolean;
}

interface SubmitDialogProps {
  type: 'active' | 'past';
  open: boolean;
  onClose: () => void;
  competition: CompetitionDetails | null;
}

const StudentSubmitDialog: React.FC<SubmitDialogProps> = ({ type, open, onClose, competition }) => {
  const dispatch = useDispatch();
  const { studentCompetitionDetails } = useSelector((state: RootState) => state.studentCompetitionDetails);
  const [link, setLink] = useState('');
  const [comments, setComments] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch({
        type: actionTypes.CLEAR_STUDENT_COMPETITION_DETAILS,
      });
    };
  }, [dispatch]);

  useEffect(() => {
    if (type === 'active' && competition?.isUserEnrolled) {
      dispatch({
        type: actionTypes.GET_STUDENT_COMPETITION_DETAILS,
        payload: {
          competitionId: competition.competitionId,
          studentId: localStorage.getItem('studentId'),
        },
      });
    }
  }, [type, competition, dispatch]);

  useEffect(() => {
    if (studentCompetitionDetails) {
      setLink(studentCompetitionDetails.studentFile || '');
      setComments(studentCompetitionDetails.studentComments || '');
    }
  }, [studentCompetitionDetails]);

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
  };

  const handleSubmit = () => {
    if (competition) {
      dispatch({
        type: actionTypes.ADD_STUDENT_COMPETITION,
        payload: {
          createStudentCompetitionRecord: {
            competitionId: competition.competitionId,
            studentId: localStorage.getItem('studentId'),
            studentFile: link,
            studentComments: comments,
          },
        },
      });
      setLink('');
      setComments('');
      resetForm();
      onClose();
      setSnackbarOpen(true);
    }
  };

  const isValid = () => {
    return link && comments;
  };

  const resetForm = () => {
    setLink('');
    setComments('');
  };

  if (!competition) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>{competition.title}</DialogTitle>
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
        <Box sx={{ mb: 3 }}>
          <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={competition.image || thumbnail}
              alt="Competition Thumbnail"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                mt={2}
              >
                <span>Start Date: {moment(competition.startDate).format('MM/DD/YYYY')}</span>
                <span>End Date: {moment(competition.endDate).format('MM/DD/YYYY')}</span>
              </Typography>
              {competition.courseList && (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                  mt={2}
                >
                  <span>Course Id: {competition.courseList}</span>
                </Typography>
              )}
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                mt={2}
              >
                <span>Description: {competition.descriptionText}</span>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: '100%',
                  mt: 3,
                }}
              >
                <Typography
                  component="a"
                  href={competition.videoFiles}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#1a0dab', cursor: 'pointer', textAlign: 'center', display: 'inline-block' }}
                >
                  Click to View Instructions
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <TextField
          fullWidth
          label="Enter your submission link"
          variant="outlined"
          value={link}
          onChange={handleLinkChange}
          sx={{ mb: 2 }}
          autoComplete={'off'}
        />
        <TextField
          fullWidth
          label="Student Comments"
          variant="outlined"
          value={comments}
          onChange={handleCommentsChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isValid()}
            sx={{ width: '200px' }}
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={'Entry Submitted Successfully'} />
    </Dialog>
  );
};

export default StudentSubmitDialog;
