import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import actionTypes from '../utils/actionTypes';

interface CreateCompetitionProps {
  open: boolean;
  onClose: () => void;
}

const DatePickerField: React.FC<{
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}> = ({ label, selectedDate, onChange, minDate, maxDate }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      {label}
    </Typography>
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="MM/dd/yyyy"
      placeholderText={`Select ${label.toLowerCase()}`}
      minDate={minDate}
      maxDate={maxDate}
      wrapperClassName="datepicker-wrapper"
      className="datepicker-input"
    />
  </Box>
);

const CheckboxGroup: React.FC<{
  selectedCourses: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ selectedCourses, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <FormControl component="fieldset">
      <Typography variant="subtitle1" gutterBottom>
        Courses Applicable To
      </Typography>
      <Grid container spacing={2}>
        {['Light Music', 'Carnatic Music', 'Devotional Music'].map((course) => (
          <Grid item key={course}>
            <FormControlLabel
              control={<Checkbox value={course} checked={selectedCourses.includes(course)} onChange={onChange} />}
              label={course}
            />
          </Grid>
        ))}
      </Grid>
    </FormControl>
  </Box>
);

const CreateCompetition: React.FC<CreateCompetitionProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [explanationFile, setExplanationFile] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [courses, setCourses] = useState<string[]>([]);

  const handleSave = () => {
    dispatch({
      type: actionTypes.CREATE_COMPETITION,
      payload: {
        createCompetition: {
          title: name,
          startDate,
          endDate,
          videoFiles: explanationFile,
          shortDescription: shortDescription,
          descriptionText: longDescription,
          courseList: courses,
        },
      },
    });
    onClose();
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && endDate < date) {
      setEndDate(null);
    }
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setCourses((prevCourses) => (checked ? [...prevCourses, value] : prevCourses.filter((course) => course !== value)));
  };

  const isValid = () => {
    return (
      name && shortDescription && longDescription && explanationFile && startDate && endDate && endDate >= startDate && courses.length > 0
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Create New Competition
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
        <Box component="form" noValidate autoComplete="off" sx={{ width: '100%', padding: 2 }}>
          <TextField
            fullWidth
            label={
              <span>
                Competition Name<span className="required-marker">*</span>
              </span>
            }
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { fontSize: '1rem' } }}
          />
          <TextField
            fullWidth
            label={
              <span>
                Competition Short Description<span className="required-marker">*</span>
              </span>
            }
            variant="outlined"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { fontSize: '1rem' } }}
          />
          <TextField
            fullWidth
            label={
              <span>
                Competition Long Description<span className="required-marker">*</span>
              </span>
            }
            variant="outlined"
            multiline
            rows={4}
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { fontSize: '1rem' } }}
          />
          <TextField
            fullWidth
            label={
              <span>
                Explanation File<span className="required-marker">*</span>
              </span>
            }
            variant="outlined"
            value={explanationFile}
            onChange={(e) => setExplanationFile(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { fontSize: '1rem' } }}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                label="Start Date"
                selectedDate={startDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                label="End Date"
                selectedDate={endDate}
                onChange={setEndDate}
                minDate={startDate || new Date()}
              />
            </Grid>
          </Grid>
          <CheckboxGroup selectedCourses={courses} onChange={handleCourseChange} />
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              padding: 2,
              width: '100%',
              backgroundColor: 'background.paper',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ width: '200px' }}
              disabled={!isValid()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompetition;
